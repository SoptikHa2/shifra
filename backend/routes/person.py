from pydantic import BaseModel
from typing import Optional


class Person(BaseModel):
    person_id: Optional[int] = None
    is_root: bool
    nickname: str
    session_cookie: Optional[str] = None
    mail: Optional[str] = None
    password: Optional[str] = None


