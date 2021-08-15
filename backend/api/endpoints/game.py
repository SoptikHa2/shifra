from typing import Optional

from fastapi import APIRouter, Response, Cookie

from api.logic import user_management
from db_funcs.cipherGameFuncs import *

router = APIRouter()


@router.get("/api/games")
def get_all_games(response: Response, session_cookie: Optional[str] = Cookie(None)):
    user = user_management.get_user_by_token(session_cookie)
    if user is not None and user.is_root:
        games = get_all_cipher_games()
    else:
        # Get all games, that are visible to public at the moment,
        # or user is admin of the given game.
        games = get_visible_games(user.person_id)
    response.status_code = 200
    return games