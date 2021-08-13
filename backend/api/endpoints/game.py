from fastapi import APIRouter, Response, Cookie
from typing import Optional

from db_funcs import *
from user import user_management

router = APIRouter()


@router.get('/api/leaderboard/{cipher_game_id}')
def get_leaderboard(cipher_game_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
        Shows leaderboard of specified game

        :param cipher_game_id: Game id to use
        :return 200 everything is OK
                401 no permissions to see leaderboard
    """

    user = user_management.get_user_by_token(session_cookie)
    if not is_visible(cipher_game_id) or not is_staff(cipher_game_id, user.person_id) or not user.is_root:
        response.status_code = 401
        return None

    return cipherGameFuncs.get_leaderboard(cipher_game_id)

