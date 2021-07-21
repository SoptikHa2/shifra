from .config import *
from fastapi import APIRouter
from routes import Attempt

                                        # All hints are under ciphers under cipherGames
router = APIRouter()

connection = ""
                            # This file needs to be updated after talkie about database entity keys

@router.post("/api/cipher/{cipher_id}/team/{team_id}/attempt")
def insertAttempt(newAttempt: Attempt):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("INSERT INTO attempt(cipher_id, team_id, time, is_success) VALUES (newAttempt.cipher_id, newAttempt.team_id, newAttempt.time, newAttempt.is_successful);")
                cur.execute("SELECT * FROM team_team_id_seq;")
                team_id = cur.fetchone()[0]
    except:
        return {"result": "error"}
    return {"result": team_id}


# works
@router.put("/api/cipher/{cipher_id}/team/{team_id}/attempt")
def updateAttempt(cipher_id: int, team_id: int, updatedAttempt: Attempt):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("UPDATE attempt SET time=%s, is_successful=%s WHERE cipher_id=%s AND team_id=%s;", (updatedAttempt.time, updatedAttempt.is_successful, cipher_id, team_id))
    except:
        return {"result": "error"}
    return {"result": "updated"}


@router.delete("/api/cipher/{cipher_id}/team/{team_id}/attempt")  # return id of inserted item
def deleteAttempt(cipher_id: int, team_id: int):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("DELETE FROM attempt WHERE cipher_id=%s AND team_id=%s;", (cipher_id, team_id, ))
    except:
        return {"result": "error"}
    return {"result": "removed"}


@router.get("/api/cipher/{cipher_id}/team/{team_id}/attempt")
def getAttempt(cipher_id: int, team_id):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("SELECT * FROM attempt WHERE cipher_id=%s AND team_id=%s;", (cipher_id, team_id,))
                result = cur.fetchall()
    except:
        return {"result": "error"}
    return result


@router.get("/api/attempt")
def getAttempts():
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("SELECT * FROM attempt")
                result = cur.fetchall()
    except:
        return {"result": "error"}
    return result
