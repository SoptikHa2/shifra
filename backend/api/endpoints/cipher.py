from fastapi import APIRouter
from typing import Optional

from db_funcs import cipherFuncs 

router = APIRouter()

@router.get('/api/ciphers/{cipher_game_id}/show/{cipher_id}')
def get_cipher_info(cipher_game_id: int, cipher_id: int):
    #TODO: add user authentication

    """
    Get information from database about given cipher from game.
    :param cipher_game_id: id of given game
    :param cipher_id: id of given cipher in game
    """
    result = cipherFuncs.get_cipher_info(cipher_game_id, cipher_id)
    if result is None:
        return {"result": "error"}
    return result

