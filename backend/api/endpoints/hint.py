from fastapi import APIRouter, Response, Cookie
from typing import Optional

from api.logic import user_management
from routes import Person
from db_funcs import hintFuncs

router = APIRouter()

@router.post("/api/hint/{hint_id}")
def get_hint(hint_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return {"result": "user is not authorized"}

    hint = hintFuncs.get_hint(hint_id)
    if hint is None:
        response.status_code = 204
        return {"result": "missing hint"}
    # use time cost || score cost
    return hint.msg

