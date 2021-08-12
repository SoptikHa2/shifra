from fastapi import APIRouter, Response, Cookie
from typing import Optional

from db_funcs import cipherGameFuncs

router = APIRouter()

@router.get("/api/game/{cipher_game_id}")
def get_game_by_id(cipher_game_id: int, response: Response):
    game = cipherGameFuncs.get_ciphergame(cipher_game_id)
    if game is None:
        response.status_code = 400
        return {"result": "error occured"}
    else:
        response.status_code = 200
    return game


@router.get("/api/games")
def get_all_games(response: Response, session_cookie: Optional[str] = Cookie(None)):
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None
    if user.is_root:
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
    return games

