from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Cipher_game(BaseModel):
    cipher_game_id: Optional[int] = None
    cipher_id: Optional[int] = None
    name: str
    description: str
    visible_from: datetime
    deadline_signup: datetime
    deadline_event: datetime
    capacity: Optional[int] = None
    teammax: Optional[int] = None
    password: Optional[str] = None
    autoapprove: bool

