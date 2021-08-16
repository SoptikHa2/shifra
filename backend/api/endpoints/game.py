from fastapi import Response, Cookie

from .user import user_management
from db_funcs import *
from routes import *


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
        return None

    if is_visible(cipher_game_id) or (user is not None and is_staff(cipher_game_id, user.person_id)) or (user is not None and user.is_root):
        response.status_code = 200
        return game.strip()
    else:
        response.status_code = 401
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
        return None
    else:
        response.status_code = 200
        result = [x.strip() for x in games]
    return result


@router.get('/api/game/{cipher_game_id}/ciphers')
def get_visible_ciphers(cipher_game_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)) -> [Cipher]:
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    team_id = get_users_team(cipher_game_id, user.person_id)
    if user.is_root or is_staff(cipher_game_id, user.person_id):
        ciphers = get_all_ciphers(cipher_game_id)
    elif is_in_game(cipher_game_id, team_id):
        ciphers = cipherGameFuncs.get_visible_ciphers(cipher_game_id, team_id)
    else:
        response.status_code = 401
        return None
    return [x.strip() for x in ciphers]
