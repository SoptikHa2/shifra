from pydantic import BaseModel
from typing import Optional

class Cipher(BaseModel):
    cipher_id: int
    cipher_game_id: int
    req_cipher_id: int
    name: str
    description: str
    solution: Optional[str]
    judge: Optional[str]
    cipher_file: Optional[str]
    img: Optional[str]
    succes_msg: str
    cooldown: int
    attempts: Optional[int]
    score: float
    reference_solution: Optional[str]

