from fastapi import Response, Cookie

from .user import user_management
from db_funcs import *
from routes import *

router = APIRouter()


@router.get("/api/hint/{hint_id}")
def get_hint_by_id(hint_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
        Try show information about given hint FOR ADMIN ONLY

        :param hint_id: Hint id to use
        :return 200 Everything was OK
                401 No permissions
                404 Hint doesn't exists
    """

    user = user_management.get_user_by_token(session_cookie)
    hint = hintFuncs.getHint(hint_id)
    if hint is None:
        response.status_code = 404
        return None

    if user is None:
        response.status_code = 401
        return None
    else:
        response.status_code = 200
        return hint


@router.get("/api/hint/cipher/{cipher_id}")
def get_hint_for_cipher(cipher_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)) -> Hint:
    """
        Get hint for given cipher
        USER -> will return available hint and mark as used hint in hint_used table
        ADMIN -> will return all hints for given cipher, not only available ones

        :param cipher_id: For which cipher id to get the hint
        :return 200 Everything was OK
                401 No permissions
                404 Hint doesn't exists
                406 All hints were used
                412 User's team is not participating in this game
    """

    user = user_management.get_user_by_token(session_cookie)

    if user is None:
        response.status_code = 404
        return None

    hints = hintFuncs.get_hints_for_cipher(cipher_id)
    if not user.is_root:
        team = teamFuncs.get_team_by_member_and_cipher(user.person_id, cipher_id)

        if team is None:
            response.status_code = 412
            return None

        for hint in hints:
            if not is_hint_used(hint.hint_id, team.team_id):
                response.status_code = 200
                hintFuncs.use_hint(hint.hint_id, team.team_id)
                return hint

        response.status_code = 406
        return None
    else:
        response.status_code = 200
        return hints
