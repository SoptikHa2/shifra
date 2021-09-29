from fastapi import Response, Cookie

from api.logic import user_management, cipher_management
from api.logic.file_management import upload_file
from db_funcs import *
from routes.cipher import Cipher, EditCipher

router = APIRouter()

class CipherAttempt(BaseModel):
    answer: str


@router.get("/api/cipher/{cipher_id}")
def open_cipher(cipher_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
    401 -> user is not authenticated at all
    403 -> invalid team or user does not have access to cipher
    404 -> invalid cipher id, none found
    """
    user = user_management.get_user_by_token(session_cookie)

    if user is None:
        response.status_code = 401
        return None

    cipher = cipherFuncs.get_cipher(cipher_id)

    if cipher is None:
        response.status_code = 404
        return None

    permission_override = (user.is_root or is_staff(cipher.cipher_game_id, user.person_id))

    team = get_team_by_game_and_user(cipher.cipher_game_id, user.person_id)

    if not permission_override and team is None:
        response.status_code = 403
        return None

    if not permission_override and not is_cipher_visible_to_team(cipher, team.team_id, cipher.cipher_game_id):
        response.status_code = 403
        return None

    # Cipher will be sent back.
    # Log view
    if team is not None:
        # Don't log if user is not in any team here (staff, root)
        log_cipher_view_into_attempt(cipher_id, team.team_id)
        cipher.solved = is_cipher_solved(cipher_id, team.team_id)

    # Add hints
    cipher.hints = [h.strip() for h in get_hints_for_cipher(cipher_id)]

    # TODO: Optimize, gather hint usage information during initial load
    if team is not None:
        for h in cipher.hints:
            h.is_used = is_hint_used(h.hint_id, team.team_id)

    if permission_override:
        return cipher
    else:
        return cipher.strip()


@router.post("/api/cipher/{cipher_id}/attempt")
def send_attempt(cipher_id: int, solution_post: CipherAttempt, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
    200 -> it was already solved
    202 -> correct answer
    401 -> user is not logged in or user team does not exist
    403 -> user does not have access to this cipher
    404 -> cipher with given ID does not exist
    417 -> bad answer
    420 -> cooldown was hit, wait a bit before trying again
    423 -> maximum number of attempts exceeded. Do not attempt again
    """
    user = user_management.get_user_by_token(session_cookie)

    if user is None:
        response.status_code = 401
        return None

    cipher = get_cipher(cipher_id)

    if cipher is None:
        response.status_code = 404
        return None

    team = get_team_by_game_and_user(cipher.cipher_game_id, user.person_id)

    if team is None:
        response.status_code = 401
        return None

    if not is_cipher_visible_to_team(cipher, team.team_id, cipher.cipher_game_id):
        response.status_code = 403
        return None

    if attemptFuncs.getAttempt(cipher_id, team.team_id) is not None:
        if is_cipher_solved(cipher_id, team.team_id):
            response.status_code = 200
            return None

        if is_team_out_of_attempts(cipher_id, team.team_id):
            response.status_code = 423
            return None

        if is_team_cooldown_limited(cipher_id, team.team_id):
            response.status_code = 420
            return None

    # Judge answer
    if cipher_management.is_cipher_solution_correct(cipher, solution_post.answer):
        record_attempt(cipher.cipher_id, team.team_id, True)
        response.status_code = 202
    else:
        record_attempt(cipher.cipher_id, team.team_id, False)
        response.status_code = 417

    return None


@router.post('/api/cipher')
def create_cipher(cipher: Cipher, response: Response, session_cookie: Optional[str] = Cookie(None)) -> Optional[Cipher]:
    """
        create new cipher
        :param cipher new cipher to add
        :return 200 Everything OK
                401 No permission
                404 Not existing game
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    if not is_game(cipher.cipher_game_id):
        response.status_code = 404
        return None

    if not user.is_root and not is_staff(cipher.cipher_game_id, user.person_id):
        response.status_code = 401
        return None

    if cipher.img:
        cipher.img = upload_file(cipher.img)

    if cipher.cipher_file:
        cipher.cipher_file = upload_file(cipher.cipher_file)

    cipher.cipher_id = insert_cipher(cipher.cipher_game_id, cipher)
    return cipher


@router.put('/api/cipher/{cipher_id}')
def edit_cipher(cipher_id: int, edits: EditCipher, response: Response, session_cookie: Optional[str] = Cookie(None)) -> Optional[Cipher]:
    """
        Edit existing cipher by staff or root
        :param cipher_id cipher to edit
        :param edits changes to be done
        :return 200 Everything OK
                401 No permission
                404 No existing cipher
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    cipher = get_cipher(cipher_id)
    if cipher is None:
        response.status_code = 404
        return None

    if not user.is_root and not is_staff(cipher.cipher_game_id, user.person_id):
        response.status_code = 401
        return None

    cipher.edit(edits)
    update_cipher(cipher_id, cipher)
    return cipher


@router.delete('/api/cipher/{cipher_id}')
def delete_cipher(cipher_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
        Delete of existing cipher by root or staff
        :param cipher_id to delete
        :return 200 Everything OK
                401 No permission
                404 Not found
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    cipher = get_cipher(cipher_id)
    if cipher is None:
        response.status_code = 404
        return None

    if not user.is_root and not is_staff(cipher.cipher_game_id, user.person_id):
        response.status_code = 401
        return None

    cipherFuncs.delete_cipher(cipher_id)
