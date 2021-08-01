from fastapi import APIRouter
from typing import Optional

from db_funcs import cipherGameFuncs

router = APIRouter()

@router.get('/api/leaderboard/{cipher_game_id}')
def get_leaderboard(cipher_game_id: int):
    leaderboard = cipherGameFuncs.get_leaderboard(cipher_game_id)
    if leaderboard is None:
        return {"result": "error occured"}
    return leaderboard


@router.get('/api/ciphers/{cipher_game_id}')
def get_ciphers(cipher_game_id: int):
    ciphers = cipherGameFuncs.get_ciphers(cipher_game_id)
    if ciphers is None:
        return {"error": "occured"}
    return ciphers


@router.get("/api/game/{cipher_game_id}")
def get_cipher_game(cipher_game_id: int):
    if cipherGameFuncs.get_cipher_game(cipher_game_id)
        return {"result": "error"}
    return result

