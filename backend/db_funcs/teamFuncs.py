from .DBConn import *
from fastapi import APIRouter
from routes import Team

router = APIRouter()


def insertTeam(newTeam: Team):
    with Curr_with_conn() as cur:
        cur.execute("INSERT INTO team (name, invite_code, approved) VALUES(%s, %s, %s) RETURNING team_id;",
                    (newTeam.name, newTeam.invite_code, newTeam.approved))
        team_id = cur.fetchone()[0]
    return team_id


def updateTeam(team_id: int, updated_team: Team):
    with Curr_with_conn() as cur:
        cur.execute(
            "UPDATE team SET name = %s, invite_code = %s, approved = %s WHERE team_id = %s;",
            (updated_team.name, updated_team.invite_code, updated_team.approved, team_id ))


def deleteTeam(team_id: int):
    with Curr_with_conn() as cur:
        cur.execute("DELETE FROM team WHERE team_id = %s;", (team_id,))


def getTeam(team_id: int):
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM team WHERE team_id = %s;", (team_id,))
        result = cur.fetchall()
    return result


def getTeams():
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM team;")
        result = cur.fetchall()
    return result
