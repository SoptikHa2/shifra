from fastapi import APIRouter, Response, Cookie
from typing import Optional

from db_funcs import teamFuncs
from api.logic import user_management
from routes import Person

router = APIRouter()

@router.get('/api/team/{team_id}')
def get_team_by_id(team_id: int, session_cookie: Optional[str] = Cookie(None), response: Response):
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return {"result": "user is not authorized"}
    team_info = teamFuncs.get_team_info(team_id, user.person_id, user.is_root)
    if team_info is None:
        response.status_code = 400
        return {"result": "team not found"}
    response.status_code = 200
    return team_info

