from pydantic import BaseModel
from typing import Optional
from enum import Enum


class Hint(BaseModel):
    hint_id: Optional[int] = None
    cipher_id: int
    msg: Optional[str]
    img: Optional[str] = None
    hint_file: Optional[str] = None
    score_cost: float
    time_cost: int

    def strip(self):
        self.msg = None
        self.img = None
        self.hint_file = None
        return self


def hint_from_db_row(row) -> Hint:
    return Hint(hint_id=row[0], cipher_id=row[1], msg=row[2], img=row[3], hint_file=row[4], score_cost=row[5],
                time_cost=row[6])


class HintStatus(Enum):
    Locked = 1,
    Unlocked = 2,
    Invisible = 3
