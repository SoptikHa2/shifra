from pydantic import BaseModel
from typing import Optional


class Person(BaseModel):
    person_id: int
    is_root: bool
    nickname: str
    session_cookie: Optional[str]
    mail: Optional[str]
    password: Optional[str]


