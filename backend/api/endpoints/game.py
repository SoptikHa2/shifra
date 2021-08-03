from fastapi import APIRouter
from typing import Optional

from db_funcs import cipherGameFuncs
from api.logic import user_management
from routes import Person

router = APIRouter()

@router.get("/api/games")
def get_all_games(session_cookie: Optional[str] = Cookie(None), response: Response):
    user = user_management.get_user_by_token(session_cookie)
    if user.is_root:
        games = get_games()
    else:
        games = get_all_games(user.person_id)
    if games is None:
        response.status_code = 400
    else:
        response.status_code = 200
    return games

