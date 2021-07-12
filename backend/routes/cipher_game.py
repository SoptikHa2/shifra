from pydantic import BaseModel
from datetime import datetime

class Cipher_game(BaseModel):
    cipher_game_id: int
    cipher_id: int
    name: str
    description: str
    visible_from: datetime
    deadline_signup: datetime
    deadline_event: datetime
    capacity: Optional[int]
    teammax: Optional[int]
    password: Optional[str]
    autoapprove: bool

