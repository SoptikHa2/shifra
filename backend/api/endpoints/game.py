from fastapi import APIRouter, Response, Cookie
from typing import Optional

from db_funcs import cipherGameFuncs
from api.logic import user_management
from routes import Person

router = APIRouter()

@router.get('/api/ciphers/{cipher_game_id}')
def get_visible_ciphers(cipher_game_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
    Show all visible ciphers from specified game
    :param cipher_game_id: Game id
    :return: 200 if everything was ok, 400 if no visible ciphers, 401 for not authenticated user
             list of visible ciphers with striped informations
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None
    
    if cipherGameFuncs.is_staff(cipher_game_id, user.person_id) or user.is_root:
        visible_ciphers = cipherGameFuncs.get_all_ciphers(cipher_game_id)
    else:
        visible_ciphers = cipherGameFuncs.get_visible_ciphers(cipher_game_id, user.person_id)
    
    if visible_ciphers is None:
        response.status_code = 400
        return None
    response.status_code = 200
    result = [x.stip() for x in visible_ciphers]
    return result

