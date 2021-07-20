from pydantic import BaseModel
from typing import Optional

class Hint(BaseModel):
    hint_id: int
    cipher_id: int
    msg: str
    img: Optional[str] = None
    hint_file: Optional[str] = None
    score_cost: float
    time_cost: int

