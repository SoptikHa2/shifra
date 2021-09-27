from fastapi import FastAPI, Response, Cookie

from api.logic import user_management
from db_funcs import *

router = APIRouter()


@router.post("/api/hint/{hint_id}")
def get_hint(hint_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)) -> Optional[Hint]:
    """
        Check possibility to get hint and give hint if it is possible
        :param hint_id: Hint id to us
        :return 200 Everything was OK
                204 Fault while recording hint use
                401 Not authorized
                404 Not existing hint/game
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    game_id = get_hints_game(hint_id)
    if game_id is None:
        response.status_code = 404
        return None

    team_id = players_team(user.person_id, game_id)
    if team_id is None:
        response.status_code = 401
        return None

    cipher = get_cipher_by_hint(hint_id)
    if cipher is None:
        response.status_code = 404
        return None
    elif not is_cipher_visible_to_team(cipher, team_id, game_id) and not user.is_root and not is_staff(game_id, user.person_id):
        response.status_code = 401
        return None

    game_hint = hintFuncs.get_hint(hint_id)
    if game_hint is None:
        response.status_code = 404
        return None

    if not is_hint_used(hint_id, team_id):
        use_hint(hint_id, team_id)

    return game_hint


@router.put('/api/hint/{hint_id}')
def edit_hint(hint_id: int, edits: EditHint, response: Response, session_cookie: Optional[str] = Cookie(None)) -> Optional[Hint]:
    """
        Edit existing hint
        :param hint_id hint to edits
        :param edits to be done
        :return 200 Everything OK
                401 No permission
                404 Not existing hint
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    cipher = get_cipher_by_hint(hint_id)
    if not user.is_root and not is_staff(cipher.cipher_game_id, user.person_id):
        response.status_code = 401
        return None

    hint = hintFuncs.get_hint(hint_id)
    if hint is None:
        response.status_code = 404
        return None

    hint.edit(edits)
    updateHint(hint_id, hint)
    return hint

@router.post('/api/hint')
def create_hint(hint: Hint, response: Response, session_cookie: Optional[str] = Cookie(None)) -> Optional[Hint]:
    """
        create hint for existing cipher
        :param hint new created hint
        :param response 200 Everything OK
                        401 Not authorized
                        404 Not existing cipher
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    cipher = get_cipher(hint.cipher_id)
    if cipher is None:
        response.status_code = 404
        return None

    if not is_staff(cipher.cipher_game_id, user.person_id) and not user.is_root:
        response.status_code = 401
        return None

    insertHint(hint)
    return hint


@router.delete('/api/hint/{hint_id}')
def delete_hint(hint_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
        delete existing hint if authorized
        :param hint_id hint to be deleted
        :param response -> 200 Everything OK
                        -> 401 Not Authorized
                        -> 404 Not existing hint
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    cipher = get_cipher_by_hint(hint_id)
    if not is_staff(cipher.cipher_game_id, user.person_id) and not user.is_root:
        response.status_code = 401
        return None

    if getHint(hint_id) is None:
        response.status_code = 404
        return None

    deleteHint(hint_id)

