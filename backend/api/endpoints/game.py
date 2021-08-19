import sys

from fastapi import Response, Cookie

sys.path.append("../../")
from .user import user_management
from db_funcs import *
from routes import *
from logger import *
router = APIRouter()


@router.get("/api/game/{cipher_game_id}")
def get_game_by_id(cipher_game_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
        Try show information about given game

        :param cipher_game_id: Game id to use
        :return 200 Everything was OK
                401 No permissions
                404 Game doesn't exists
    """

    user = user_management.get_user_by_token(session_cookie)
    game = cipherGameFuncs.get_cipher_game(cipher_game_id)
    if game is None:
        response.status_code = 404
        logger.info(get_game_by_id.__name__ + " /api/game/" + str(cipher_game_id) + " (GET) / ERROR CODE " + str(response.status_code) + ": cipher game " + str(cipher_game_id) + " does not exist")
        return None

    if is_visible(cipher_game_id) or (user is not None and is_staff(cipher_game_id, user.person_id)) or (user is not None and user.is_root):
        response.status_code = 200
        return game.strip()
    else:
        response.status_code = 401
        logger.warning(get_game_by_id.__name__ + " /api/game/" + str(cipher_game_id) + " (GET) / ERROR CODE " + str(response.status_code))
        return None


@router.get("/api/games")
def get_all_games(response: Response, session_cookie: Optional[str] = Cookie(None)) -> [CipherGame]:
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        games = get_visible_games(-1)
    elif user.is_root:
        games = get_all_cipher_games()
    else:
        # Get all games, that are visible to public at the moment,
        # or user is admin of the given game.
        games = get_visible_games(user.person_id)

    if games is None:
        response.status_code = 400
        logger.warning(get_all_games.__name__ + " /api/games (GET) / ERROR CODE " + str(response.status_code))
        return None
    else:
        response.status_code = 200
        result = [x.strip() for x in games]
    return result
