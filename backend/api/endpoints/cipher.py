from fastapi import Response, Cookie

from .user import user_management
from db_funcs import *
from routes import *

router = APIRouter()


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

    cipher = get_cipher(cipher_id)

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

    return cipher.strip()


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