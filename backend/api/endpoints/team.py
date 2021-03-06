from fastapi import Response, Cookie

from api.endpoints.user import register_temp_post

from db_funcs import *
from routes.team import EditTeam, Team
from api.logic import user_management

from logger import *
from word_generator import *
from base_converter import *


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
    team_info.members = [x.strip_with_email() for x in get_team_members(team_info.team_id)]
    return team_info


@router.delete('/api/team/leave/{team_id}')
def leave_team(team_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    if not is_in_team(team_id, user.person_id):
        response.status_code = 404
        return None

    teamFuncs.leave_team(team_id, user.person_id)
    return None

@router.put('/api/team/{team_id}')
def edit_team(team_id: int, edits: EditTeam, response: Response, session_cookie: Optional[str] = Cookie(None)) -> Optional[Team]:
    """
        Edit team information according to edit
        :param edits show data to edit
        :param team_id id of team to edit
        :return 200 Everything OK
                401 No permission
                404 Not found team
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    if not user.is_root and not is_in_team(team_id, user.person_id):
        response.status_code = 401
        return None

    if not is_team(team_id):
        response.status_code = 404
        return None

    edited_team = teamFuncs.edit_team(team_id, edits)
    return edited_team


@router.delete('/api/team/{team_id}')
def delete_team(team_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
        Delete existing team by root
        :param team_id team to delete
        :return 200 Everything OK
                401 No permission
                404 Not existing team
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    if not user.is_root:
        response.status_code = 401
        return None

    if not is_team(team_id):
        response.status_code = 404
        return None

    deleteTeam(team_id)
    
@router.post('/api/team/create')
def create_team(cipher_game_id: int, team_name: str, response: Response, session_cookie: Optional[str] = Cookie(None)) -> Optional[int]:

    """
        Creates team for given cipher game

        Info can be seen by admin of game, root or player of the team

        :param cipher_game_id: Id of the team to use
        :param team_name: name of a team, that should be created

        :return 200 OK if user could create team for given cipher game
                404 NOT FOUND cipher game does not exists
                401 UNAUTHORIZED user has no permissions to see information about team
                409 CONFLICT team is already joined to ciphergame
    """

    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        logger.info(create_team.__name__ + " /api/createteam " + str(response.status_code) + ": user does not exist")
        return None

    given_ciphergame = cipherGameFuncs.get_cipher_game(cipher_game_id)

    if given_ciphergame is None:
        response.status_code = 404
        logger.info(create_team.__name__ + " /api/createteam " + str(response.status_code) + ": cipher game " + str(cipher_game_id) + " does not exist")
        return None

    wg = word_generator()
    invite_code = wg.get_word() + " " + wg.get_word() + " " + wg.get_word()
    team = Team(team_id=-1, name=team_name, approved=given_ciphergame.autoapprove, cipher_game_id=cipher_game_id, invite_code = invite_code)

    try:
        team_id = teamFuncs.insertTeam(team, user.person_id)
    except:
        response.status_code = 409
        return None

    response.status_code = 200
    return team_id

@router.post('/api/team/join')
def join_team(inv_code: str, response: Response, username_cred: Optional[register_temp_post] = None, session_cookie: Optional[str] = Cookie(None)) -> Optional[int]:

    """
        Assigns user to a team, if user is not logged in, then creates temporary register account. Fails, if team is full

        :param inv_code: invite code of wanted team
        :param username_cred: name of a user in a body

        :return 200 OK if user could create team for given cipher game
        :return 404 NOT FOUND if team does not exist
        :return 409 CONFLICT if user with given username already exists
    """
    team_id = teamFuncs.get_id_by_inv_code(inv_code)
    
    if team_id is None:
        response.status_code = 404
        logger.info(join_team.__name__ + " /api/team/join " + str(response.status_code) + ": team does not exist")
        return None
    if teamFuncs.is_full(team_id):
        response.status_code = 409
        logger.info(join_team.__name__ + " /api/team/join - full team " + str(team_id))
        return None

    user = user_management.get_user_by_token(session_cookie)

    if user is None:
        new_user = user_management.create_temporary_user(username_cred.username)
        if new_user is None:
            response.status_code = 409
            logger.info(join_team.__name__ + " /api/team/join " + str(response.status_code) + ": user already exists - " + username_cred.username)
            return None
        response.status_code = 200
        joinTeam(team_id, new_user.person_id)
        return team_id

    response.status_code = 200
    joinTeam(team_id, user.person_id)
    return team_id

