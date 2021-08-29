from fastapi import Response, Cookie

from db_funcs import *
from routes.team import EditTeam, Team
from api.logic import user_management

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
        return None

    team_info = teamFuncs.get_team_info(team_id)
    if team_info is None:
        response.status_code = 400
        return None

    cipher_game_id = get_game_id(team_id)
    if not is_in_team(team_id, user.person_id) and not user.is_root and not is_staff(cipher_game_id, user.person_id):
        response.status_code = 401
        return None

    response.status_code = 200
    team_info.strip()
    team_info.members = [x.strip_with_email() for x in get_team_members(team_info.team_id)]
    return team_info


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
