from pydantic import BaseModel
from typing import Optional


class Person(BaseModel):
    person_id: Optional[int] = None
    is_root: bool = False
    nickname: str
    session_cookie: Optional[str] = None
    mail: Optional[str] = None
    password: Optional[str] = None

    def strip(self):
        self.session_cookie = None
        self.password = None
        return self


def person_from_db_row(row) -> Person:
    return Person(person_id=row[0], is_root=row[1], nickname=row[2], session_cookie=row[3], mail=row[4], password=row[5])
