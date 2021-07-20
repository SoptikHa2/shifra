from pydantic import BaseModel
from typing import Optional


class Cipher(BaseModel):
    cipher_id: Optional[int] = None
    cipher_game_id: int
    req_cipher_id: Optional[int] = None
    name: str
    description: str
    solution: Optional[str] = None
    judge: Optional[str] = None
    cipher_file: Optional[str] = None
    img: Optional[str] = None
    success_msg: str
    cooldown: int
    attempts: Optional[int] = None
    score: float
    reference_solution: Optional[str] = None
