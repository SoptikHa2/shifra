from pydantic import BaseModel
from typing import Optional, List


class EditTeam(BaseModel):
    name: Optional[str] = None
    invite_code: Optional[str] = None
    approved: Optional[bool] = None


class Team(BaseModel):
    team_id: int
    name: str
    invite_code: Optional[str]
    members: List = []
    approved: bool

    def strip(self):
        self.invite_code = None
        return self

    def edit(self, edits: EditTeam):
        self.name = self.name if edits.name is None else edits.name
        self.invite_code = self.invite_code if edits.invite_code is None else edits.invite_code
        self.approved = self.approved if edits.approved is None else edits.approved


def team_from_db_row(row) -> Team:
    return Team(team_id=row[0], name=row[1], invite_code=row[2], approved=row[3])
