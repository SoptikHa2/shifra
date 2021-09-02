from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class EditCipherGame(BaseModel):
    cipher_id_to_start_timer: Optional[int] = None
    name: Optional[str] = None
    description: Optional[str] = None
    visible_from: Optional[datetime] = None
    deadline_signup: Optional[datetime] = None
    deadline_event: Optional[datetime] = None
    capacity: Optional[int] = None
    teammax: Optional[int] = None
    password: Optional[str] = None
    autoapprove: Optional[bool] = None
        

class CipherGame(BaseModel):
    cipher_game_id: Optional[int] = None
    cipher_id_to_start_timer: Optional[int] = None
    name: str
    description: str
    image: Optional[str] = None
    visible_from: datetime
    deadline_signup: datetime
    deadline_event: datetime
    capacity: Optional[int] = None
    teammax: Optional[int] = None
    password: Optional[str] = None
    autoapprove: bool

    def strip(self):
        self.password = None
        self.autoapprove = False
        return self

    def edit(self, edits: EditCipherGame):
        self.cipher_id_to_start_timer = edits.cipher_id_to_start_timer if edits.cipher_id_to_start_timer is not None else self.cipher_id_to_start_timer
        self.name = edits.name if edits.name is not None else self.name
        self.description = edits.description if edits.description is not None else self.description
        self.visible_from = edits.visible_from if edits.visible_from is not None else self.visible_from
        self.deadline_signup = edits.deadline_signup if edits.deadline_signup is not None else self.deadline_signup
        self.deadline_event = edits.deadline_event if edits.deadline_event is not None else self.deadline_event
        self.capacity = edits.capacity if edits.capacity is not None else self.capacity
        self.teammax = edits.teammax if edits.teammax is not None else self.teammax
        self.password = edits.password if edits.password is not None else self.password
        self.autoapprove = edits.autoapprove if edits.autoapprove is not None else self.autoapprove


def cipher_game_from_db_row(row) -> CipherGame:
    return CipherGame(cipher_game_id=row[0], cipher_id_to_start_timer=row[1], name=row[2], description=row[3], image=row[4],
                      visible_from=row[4], deadline_signup=row[5], deadline_event=row[6], capacity=row[7],
                      teammax=row[8], password=row[9], autoapprove=row[10])