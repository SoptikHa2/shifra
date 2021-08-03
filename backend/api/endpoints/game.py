from fastapi import APIRouter
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

