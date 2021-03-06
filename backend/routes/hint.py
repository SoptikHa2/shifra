from pydantic import BaseModel
from typing import Optional
from enum import Enum


class EditHint(BaseModel):
    cipher_id: Optional[int] = None
    msg: Optional[str] = None
    img: Optional[str] = None
    hint_file: Optional[str] = None
    score_cost: Optional[float] = None
    time_cost: Optional[int] = None


class Hint(BaseModel):
    hint_id: Optional[int] = None
    cipher_id: int
    msg: Optional[str]
    img: Optional[str] = None
    hint_file: Optional[str] = None
    score_cost: float
    time_cost: int
    is_used: Optional[bool] = None

    def strip(self):
        self.msg = None
        self.img = None
        self.hint_file = None
        return self

    def edit(self, edits: EditHint):
        self.cipher_id = self.cipher_id if edits.cipher_id is None else edits.cipher_id
        self.msg = self.msg if edits.msg is None else edits.msg
        self.img = self.img if edits.img is None else edits.img
        self.hint_file = self.hint_file if edits.hint_file is None else edits.hint_file
        self.score_cost = self.score_cost if edits.score_cost is None else edits.score_cost
        self.time_cost = self.time_cost if edits.time_cost is None else edits.time_cost


def hint_from_db_row(row) -> Hint:
    return Hint(hint_id=row[0], cipher_id=row[1], msg=row[2], img=row[3], hint_file=row[4], score_cost=row[5],
                time_cost=row[6])


class HintStatus(Enum):
    Locked = 1,
    Unlocked = 2,
    Invisible = 3
