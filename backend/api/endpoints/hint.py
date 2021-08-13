from fastapi import APIRouter, Response, Cookie
from typing import Optional

from api.logic import user_management
from routes import Hint
from db_funcs import *

router = APIRouter()

@router.post("/api/hint/{hint_id}")
def get_hint(hint_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)) -> Optional[Hint]:
    """
        Check possibility to get hint and give hint if it is possible

        :param hint_id: Hint id to us
        :return 200 Everything was OK
                204 Not existing hint
                401 Not authorized
    """

    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    game_id = get_game_id_by_hint(hint_id)
    cipher_id = get_cipher_id(hint_id)
    team_id = get_users_team(user.person_id)
    if is_in_game(hint_id, user.person_id) is not None and is_cipher_visible(user.person_id, game_id, cipher_id):
        received_hint = hintFuncs.get_hint(hint_id)
        if received_hint is None:
            response.status_code = 204
            return None

        # TODO: use time cost || score cost
        insert_used_hint(hint_id, team_id)
        response.status_code = 200
        return received_hint.msg
    return None
