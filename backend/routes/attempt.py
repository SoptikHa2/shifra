from pydantic import BaseModel
from datetime import datetime


class Attempt(BaseModel):
    cipher_id: int
    team_id: int
    time: datetime
    is_successful: bool
