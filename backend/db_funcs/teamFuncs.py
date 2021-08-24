import sys
from typing import Optional

sys.path.append('../')
from .DBConn import *
from fastapi import APIRouter
from routes import Team, team_from_db_row
from logger import *

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
            (updated_team.name, updated_team.invite_code, updated_team.approved, team_id))


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


def is_in_team(team_id: int, user_id: int) -> bool:
    with Curr_with_conn() as cur:
        cur.execute("SELECT COUNT(*) FROM team_member WHERE team_member.team_id = %s AND team_member.person_id = %s;",
                    (team_id, user_id))
        result = cur.fetchone()
        return result[0] > 0


def get_team_info(team_id: int) -> Optional[Team]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM team WHERE team.team_id = %s;", team_id)
        result = cur.fetchone()
        if result is None:
            return result
        return team_from_db_row(result)


def get_game_id(team_id: int) -> int:
    with Curr_with_conn() as cur:
        cur.execute("SELECT cgt.cipher_game_id FROM cipher_game_team cgt WHERE cgt.team_id = %s;", team_id)
        result = cur.fetchone()[0]
        return int(result)


def is_full(team_id: int) -> bool:
    with Curr_with_conn() as cur:
        cur.execute("select teammax from team_member join cipher_game_team using(team_id) join cipher_game using(cipher_game_id) WHERE team_id = %s", (team_id, ))
        array_tmp = cur.fetchall()
        number_of_members = len(array_tmp)
        capacity = array_tmp[0][0]  # first record and first column (only teammax)
        if number_of_members == capacity:
            return True
        return False