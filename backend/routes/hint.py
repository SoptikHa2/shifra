from pydantic import BaseModel

class Hint(BaseModel):
    hint_id: int
    cipher_id: int
    msg: str
    img: Optional[str]
    hint_file: Optional[str]
    score_cost: float
    time_cost: int

