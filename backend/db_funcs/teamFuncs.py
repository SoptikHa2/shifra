from . import DBConn
from .DBConn import *
from fastapi import APIRouter
from routes import Team, team_from_db_row
from typing import Optional

router = APIRouter()


def insertTeam(newTeam: Team):
    """

    :param newTeam: team, that should be inserted into database
    :return: team_id - id of inserted team in database
    """
    try:
        with Curr_with_conn() as cur:
            cur.execute("INSERT INTO team (name, invite_code, approved) VALUES(%s, %s, %s) RETURNING team_id;",
                        (newTeam.name, newTeam.invite_code, newTeam.approved))
            team_id = cur.fetchone()[0]
    except:
        return {"result": "error"}

    return {"result": team_id}


def updateTeam(team_id: int, updated_team: Team):
    """

    :param team_id: id of team, which should be updated
    :param updated_team: updated object
    :return: --What to return? consult with Pavel--
    """
    try:
        with Curr_with_conn() as cur:
            cur.execute(
                "UPDATE team SET name = %s, invite_code = %s, approved = %s WHERE team_id = %s;",
                (updated_team.name, updated_team.invite_code, updated_team.approved, team_id ))
    except:
        return {"result": "error"}

    return {"result": "updated"}


def deleteTeam(team_id: int):
    """

    :param team_id: id of team, which should be deleted
    :return: --What to return? consult with Pavel--
    """
    try:

        with Curr_with_conn() as cur:
            cur.execute("DELETE FROM team WHERE team_id = %s;", (team_id,))
    except:
        return {"result": "error"}
    return {"result": "removed"}


def getTeam(team_id: int):
    """

    :param team_id: id of wanted team
    :return: team returned by select
    """
    try:
        with Curr_with_conn() as cur:
            cur.execute("SELECT * FROM team WHERE team_id = %s;", (team_id,))
            result = cur.fetchall()
    except:
        return {"result": "error"}
    return result


def getTeams():
    """

    :return: teams returned by select
    """
    try:
        with Curr_with_conn() as cur:
            cur.execute("SELECT * FROM team;")
            result = cur.fetchall()
    except:
        return {"result": "error"}
    return result


def is_in_team(team_id: int, user_id: int) -> bool:
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM team_member WHERE team_member.team_id = %s AND team_member.person_id = %s;",(team_id, user_id))
            result = cur.fetchall()
            return bool(result)


def get_team_info(team_id: int) -> Optional[Team]:
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM team WHERE team.team_id = %s;", team_id)
            result = cur.fetchall()
            return [team_from_db_row(x) for x in result]


def get_game_id(team_id: int) -> int:
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT cgt.cipher_game_id FROM cipher_game_team cgt WHERE cgt.team_id = %s;", team_id)
            result = cur.fetchone()[0]
            return int(result)
