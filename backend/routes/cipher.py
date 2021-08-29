from pydantic import BaseModel
from typing import Optional, List

from routes import Hint


class EditCipher(BaseModel):
    cipher_game_id: Optional[int] = None
    req_cipher_id: Optional[int] = None
    name: Optional[str] = None
    description: Optional[str] = None
    solution: Optional[str] = None
    judge: Optional[str] = None
    cipher_file: Optional[str] = None
    img: Optional[str] = None
    success_msg: Optional[str] = None
    cooldown: Optional[int] = None
    attempts: Optional[int] = None
    score: Optional[float] = None
    reference_solution: Optional[str] = None
    solved: Optional[bool] = None
    hints: Optional[List[Hint]] = None


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
    solved: bool = False
    hints: List[Hint] = []

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

    def edit(self, edits: EditCipher):
        self.cipher_game_id = edits.cipher_game_id if edits.cipher_game_id is not None else self.cipher_game_id
        self.req_cipher_id = edits.req_cipher_id if edits.req_cipher_id is not None else self.req_cipher_id
        self.name = edits.name if edits.name is not None else self.name
        self.description = edits.description if edits.description is not None else self.description
        self.solution = edits.solution if edits.solution is not None else self.solution
        self.judge = edits.judge if edits.judge is not None else self.judge
        self.cipher_file = edits.cipher_file if edits.cipher_file is not None else self.cipher_file
        self.img = edits.img if edits.img is not None else self.img
        self.success_msg = edits.success_msg if edits.success_msg is not None else self.success_msg
        self.cooldown = edits.cooldown if edits.cooldown is not None else self.cooldown
        self.attempts = edits.attempts if edits.attempts is not None else self.attempts
        self.score = edits.score if edits.score is not None else self.score
        self.reference_solution = edits.reference_solution if edits.reference_solution is not None else self.reference_solution
        self.solved = edits.solved if edits.solved is not None else self.solved
        self.hints = edits.hints if edits.hints is not None else self.hints


def cipher_from_db_row(row) -> Cipher:
    return Cipher(cipher_id=row[0], cipher_game_id=row[1], req_cipher_id=row[2], name=row[3], description=row[4],
                  solution=row[5], judge=row[6], cipher_file=row[7], img=row[8], success_msg=row[9], cooldown=row[10],
                  attempts=row[11], score=row[12], reference_solution=row[13])
