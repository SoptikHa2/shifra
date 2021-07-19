import config
from fastapi import APIRouter
from attempt import Attempt

                                        # All hints are under ciphers under cipherGames
router = APIRouter()

connection = config.DB_conn
config.DB_conn.chooseDB(connection)


@router.post("/api/cipher/{cipher_id}/team/{team_id}/attempt")
def insertAttempt(newAttempt: Attempt):
    with config.DB_conn.getConn(connection):
        with config.DB_conn.getCursor(connection) as cur:
            success = cur.execute("INSERT INTO attempt(cipher_id, team_id, time, is_successful) VALUES(%s, %s, %s, %s);",
                                  (newAttempt.cipher_id, newAttempt.team_id, newAttempt.time, newAttempt.is_successful))
            return {"result": success}


@router.put("/api/cipher/{cipher_id}/team/{team_id}/attempt")
def updateAttempt(cipher_id: int, team_id: int):
    with config.DB_conn.getConn(connection):
        with config.DB_conn.getCursor(connection) as cur:
            success = cur.execute("....................")   # what should be updated?
            return {"result": success}


@router.delete("/api/cipher/{cipher_id}/team/{team_id}/attempt")  # return id of inserted item
def deleteAttempt(cipher_id: int, team_id: int):
    with config.DB_conn.getConn(connection):
        with config.DB_conn.getCursor(connection) as cur:
            cur.execute("DELETE FROM attempt WHERE cipher_id=%s AND team_id=%s;", (cipher_id, team_id, ))
            return {"result": "removed"}


@router.get("/api/cipher/{cipher_id}/team/{team_id}/attempt")
def getAttempt(cipher_id: int, team_id):
    with config.DB_conn.getConn(connection):
        with config.DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM attempt WHERE cipher_id=%s AND team_id=%s;", (cipher_id, team_id,))
            result = cur.fetchall()
            return result


@router.get("/api/attempt")
def getAttempts():
    with config.DB_conn.getConn(connection):
        with config.DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM attempt")
            result = cur.fetchall()
            return result
