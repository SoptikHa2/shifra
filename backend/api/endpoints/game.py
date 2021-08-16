from fastapi import APIRouter, Response, Cookie
from typing import Optional

from db_funcs import *
from api.logic import user_management

@router.get('/api/ciphers/{cipher_game_id}/show/{cipher_id}')
def get_cipher_info(cipher_game_id: int, cipher_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)) -> Optional[Cipher]:
    """
        Getting informations about specified cipher

        :param cipher_game_id: Game id to use
        :param cipher_id: Cipher id to use
        :return 200 everything is OK
                400 cipher wasn't found
                401 no permission for getting information about cipher
    """

    user = user_management.get_user_by_token(session_cookie)

    if user is None:
        response.status_code = 401
        return None

    team_id = get_users_team(user.person_id,cipher_game_id)
    cipher_info = cipherGameFuncs.get_cipher_info(cipher_game_id, cipher_id, team_id)
    if cipher_info is None:
        response.status_code = 400
        return None

    if not is_visible(cipher_id) and not user.is_root and not is_staff(cipher_game_id, user.person_id):
        response.status_code = 401
        return None

    response.status_code = 200
    cipher_info.strip()
    return cipher_info
