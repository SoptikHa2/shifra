from pydantic import BaseModel
from typing import Optional


class Cipher(BaseModel):
    cipher_id: Optional[int] = None
    cipher_game_id: int
    req_cipher_id: Optional[int] = None
    name: str
    description: Optional[str]
    solution: Optional[str] = None
    judge: Optional[str] = None
    cipher_file: Optional[str] = None
    img: Optional[str] = None
    success_msg: str
    cooldown: int
    attempts: Optional[int] = None
    score: float
    reference_solution: Optional[str] = None

    def strip_assignment(self):
        self.description = None
        self.cipher_file = None
        self.img = None
        return self.strip()

    def strip(self):
        self.solution = None
        self.judge = None
        self.success_msg = ""
        self.reference_solution = None
        return self


def cipher_from_db_row(row) -> Cipher:
    return Cipher(cipher_id=row[0], cipher_game_id=row[1], req_cipher_id=row[2], name=row[3], description=row[4],
                  solution=row[5], judge=row[6], cipher_file=row[7], img=row[8], success_msg=row[9], cooldown=row[10],
                  attempts=row[11], score=row[12], reference_solution=row[13])
