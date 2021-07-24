from pydantic import BaseModel
from typing import Optional
from enum import Enum

class Hint(BaseModel):
    hint_id: Optional[int] = None
    cipher_id: int
    msg: str
    img: Optional[str] = None
    hint_file: Optional[str] = None
    score_cost: float
    time_cost: int

class HintStatus(Enum):
    Locked = 1,
    Unlocked = 2,
    Invisible = 3
