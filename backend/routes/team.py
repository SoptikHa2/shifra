from pydantic import BaseModel
from typing import Optional

class Team(BaseModel):
    team_id: Optional[int] = None
    name: str
    invite_code: str
    approved: bool

    #def __init__(self, team_id: int, name: str, invite_code: str, approved: bool):
    #    self.team_id = team_id
    #    self.name = name
    #    self.invite_code = invite_code
    #    self.approved = approved
