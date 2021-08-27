from pydantic import BaseModel
from typing import Optional


class Team(BaseModel):
    team_id: int
    name: str
    invite_code: Optional[str]
    approved: bool

    def strip(self):
        self.invite_code = None
        return self


def team_from_db_row(row) -> Team:
    return Team(team_id=row[0], name=row[1], invite_code=row[2], approved=row[3])
