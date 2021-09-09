from typing import Optional

from pydantic import BaseModel
from datetime import datetime


class Attempt(BaseModel):
    cipher_id: int
    team_id: int
    start_time: datetime
    last_attempt_time: Optional[datetime]
    attempt_count: int
    was_success: bool


def attempt_from_db_row(row) -> Attempt:
    return Attempt(cipher_id=row[0], team_id=row[1], start_time=row[2], last_attempt_time=row[3], attempt_count=row[4],
                   was_success=row[5])
