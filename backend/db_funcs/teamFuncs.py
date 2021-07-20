from fastapi import APIRouter
from .config import *
from routes import Team

router = APIRouter()

connection = DB_conn
DB_conn.chooseDB(connection)


@router.post("/api/team")  # return id of inserted item
def insertTeam(newTeam: Team):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            success = cur.execute("INSERT INTO team (name, invite_code, approved) VALUES(%s, %s, %s);", (newTeam.name, newTeam.invite_code, newTeam.approved))
            return {"result": success}


@router.put("api/team/{team_id}")
def updateTeam(team_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            success = cur.execute("....................")   # what should be updated?
            return {"result": success}


@router.delete("/api/team/{team_id}")  # return id of inserted item
def deleteTeam(team_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("DELETE FROM team WHERE team_id=%s;", (team_id,))
            return {"result": "removed"}


@router.get("/api/team/{team_id}")
def getTeam(team_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM team WHERE team_id = %s;", (team_id,))
            result = cur.fetchall()
            return result


@router.get("/api/team")
def getTeams():
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM team;")
            result = cur.fetchall()
            return result
