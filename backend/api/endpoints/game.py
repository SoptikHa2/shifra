from fastapi import APIRouter
from typing import Optional

from db_funcs import cipherGameFuncs

router = APIRouter()

@router.get("/api/game/{cipher_game_id}")
def get_game_by_id(cipher_game_id: int):
    game = cipherGameFuncs.get_ciphergame(cipher_game_id)
    if game is None:
        return {"result": "error occured"}
    return game



