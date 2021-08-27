from pydantic import BaseModel
from datetime import datetime


class Attempt(BaseModel):
    cipher_id: int
    team_id: int
    start_time: datetime
    last_attempt_time: datetime
    attempt_count: int
    was_success: bool
