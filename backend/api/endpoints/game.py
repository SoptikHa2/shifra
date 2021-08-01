from fastapi import APIRouter
from typing import Optional

from db_funcs import cipherGameFuncs

router = APIRouter()


@router.get('/api/ciphers/{cipher_game_id}')
def get_ciphers(cipher_game_id: int):
    ciphers = cipherGameFuncs.get_ciphers(cipher_game_id)
    if ciphers is None:
        return {"error": "occured"}
    return ciphers
