from fastapi import FastAPI, Response, Cookie

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

    if is_hint_used(hint_id, team_id) or use_hint(hint_id, team_id) is False:
        response.status_code = 204
        return None

    response.status_code = 200
    return game_hint
