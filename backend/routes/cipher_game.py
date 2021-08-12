from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CipherGame(BaseModel):
    cipher_game_id: Optional[int] = None
    cipher_id_to_start_timer: Optional[int] = None
    name: str
    description: str
    visible_from: datetime
    deadline_signup: datetime
    deadline_event: datetime
    capacity: Optional[int] = None
    teammax: Optional[int] = None
    password: Optional[str] = None
    autoapprove: bool

    def strip(self):
        self.cipher_game_id = None
        self.cipher_id_to_start_timer = None
        password = None
        autoapprove = False


def cipher_game_from_db_row(row) -> CipherGame:
    return CipherGame(cipher_game_id=row[0], cipher_id_to_start_timer=row[1], name=row[2], description=row[3],
                      visible_from=row[4], deadline_signup=row[5], deadline_event=row[6], capacity=row[7],
                      teammax=row[8], password=row[9], autoapprove=row[10])
