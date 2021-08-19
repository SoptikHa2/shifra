import sys

from fastapi import APIRouter, Response, Cookie
from typing import Optional
sys.path.append("../../")
from db_funcs import *
from api.logic import user_management
from routes import Person
from logger import *

router = APIRouter()


@router.get('/api/team/{team_id}')
def get_team_by_id(team_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)) -> Optional[Team]:
    """
        Get information about specified team

        Info can be seen by admin of game, root or player of the team

        :param team_id: Id of the team to use
        :return 200 OK if user could get information about team
                400 team does not exists
                401 user has no permissions to see information about team
    """

    user = user_management.get_user_by_token(session_cookie)

    if user is None:
        response.status_code = 401
        logger.info(get_team_by_id.__name__ + " /api/team/" + str(team_id) + str(response.status_code) + ": user does not exist")
        return None

    team_info = teamFuncs.get_team_info(team_id)
    if team_info is None:
        response.status_code = 400
        logger.info(get_team_by_id.__name__ + " /api/team/" + str(team_id) + str(response.status_code) + ": team_info does not exist")
        return None

    cipher_game_id = get_game_id(team_id)
    if not is_in_team(team_id, user.person_id) and not user.is_root and not is_staff(cipher_game_id, user.person_id):
        response.status_code = 401
        logger.info(get_team_by_id.__name__ + " /api/team/" + str(team_id) + str(response.status_code) + ": user is not in team")
        return None

    response.status_code = 200
    team_info.strip()
    return team_info
