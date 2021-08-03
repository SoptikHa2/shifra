from fastapi import APIRouter
from typing import Optional

from db_funcs import cipherGameFuncs

router = APIRouter()

@router.get('/api/leaderboard/{cipher_game_id}')
def get_leaderboard(cipher_game_id: int, response: Response):
    leaderboard = cipherGameFuncs.get_leaderboard(cipher_game_id)
    if leaderboard is None:
        response.status_code = 400
        return {"result": "error occured"}
    else:
        response.status_code = 200
    return leaderboard

