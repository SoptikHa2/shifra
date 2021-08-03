from fastapi import APIRouter, Response, Cookie
from typing import Optional

from db_funcs import cipherGameFuncs
from api.logic import user_management
from routes import Person

router = APIRouter()

@router.get('/api/ciphers/{cipher_game_id}/show/{cipher_id}')
def get_cipher_info(cipher_game_id: int, cipher_id: int, session_cookie: Optional[str] = Cookie(None)):
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return {"result": "error occured"}
    cipher_info = cipherGameFuncs.get_cipher_info(cipher_game_id, cipher_id)
    if cipher_info is None:
        response.status_code = 400
        return {"result": "not existing cipher"}
    response.status_code = 200
    return cipher_info


