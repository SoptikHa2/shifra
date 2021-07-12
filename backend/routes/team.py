from pydantic import BaseModel

class Team(BaseModel):
    team_id: int
    name: str
    invite_code: str
    approved: bool

