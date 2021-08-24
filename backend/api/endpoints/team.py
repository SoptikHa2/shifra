import sys

from fastapi import APIRouter, Response, Cookie
from typing import Optional

from backend.db_funcs import teamFuncs, cipherGameFuncs
from backend.routes import Team

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


@router.post('/api/team/create')
def create_team(cipher_game_id: int, team_name: str, response: Response, session_cookie: Optional[str] = Cookie(None)) -> Optional[int]:

    """
        Creates team for given cipher game

        Info can be seen by admin of game, root or player of the team

        :param cipher_game_id: Id of the team to use
        :param team_name: name of a team, that should be created

        :return 200 OK if user could create team for given cipher game
                404 cipher game does not exists
                401 user has no permissions to see information about team
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        logger.info(create_team.__name__ + " /api/createteam " + str(response.status_code) + ": user does not exist")
        return None

    given_cipher = cipherGameFuncs.get_cipher_game(cipher_game_id)

    if given_cipher is None:
        response.status_code = 404
        logger.info(create_team.__name__ + " /api/createteam " + str(response.status_code) + ": cipher game " + str(cipher_game_id) + " does not exist")
        return None

    random_string = "here will be some random generated string 2"
    approved = True

    # auto increment seems to not work, there is try to create id 1 in DB
    team = Team
    # team.team_id = 3
    team.name = team_name
    team.invite_code = random_string
    team.approved = approved

    team_id = teamFuncs.insertTeam(team)

    if team_id is None:
        # response.status_code = ???
        logger.critical(create_team.__name__ + " /api/createteam " + str(response.status_code)
                        + "something bad happened")
        return None

    try:
        cipherGameFuncs.add_team(team_id, cipher_game_id)

    except:
        # response.status_code = ???
        logger.info(create_team.__name__ + " /api/createteam " + str(response.status_code)
                   + ": combination (team_id, cipher_game_id) (" + str(team_id) + ", " + str(cipher_game_id) + ") already exists")
        return None

    response.status_code = 200
    return team_id


# what to return?
@router.post('/api/team/join')
def join_team(username: Optional[str], team: Team, response: Response, session_cookie: Optional[str] = Cookie(None)):

    """
        Assigns user to a team, if user is not logged in, then creates temporary register account. Fails, if team is full

        :param username: name of a user
        :param team: team, that user wants to join

        :return 200 OK if user could create team for given cipher game
    """

    try:

        if cipherGameFuncs.is_full(team.team_id):
            # response.status_code = ???
            logger.info(join_team.__name__ + " /api/team/join - full team")
            return False

        user = user_management.get_user_by_token(session_cookie)

        if user is None:
            new_user = user_management.create_temporary_user(username)
            if new_user is None:
                logger.info(join_team.__name__ + " /api/team/join " + str(response.status_code) + ": user already exists")
                return None
            response.status_code = 200
            joinTeam(team.team_id, new_user.person_id)
            return True

    except:
        logger.critical(join_team.__name__ + " /api/team/join - something went wrong")
        # response.status_code = ???
        return False
    response.status_code = 200
    joinTeam(team.team_id, user.person_id)
    return True
