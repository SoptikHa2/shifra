from fastapi import APIRouter

from routes import Attempt
from .DBConn import *

# All hints are under ciphers under cipherGames
router = APIRouter()


# This file needs to be updated after talkie about database entity keys


def insertAttempt(newAttempt: Attempt):
    with Curr_with_conn() as cur:
        cur.execute(
            "INSERT INTO attempt(cipher_id, team_id, time, is_successful) VALUES (%s, %s, %s, %s) RETURNING cipher_id, team_id;",
            (newAttempt.cipher_id, newAttempt.team_id, newAttempt.time, newAttempt.is_successful))
        result = cur.fetchone()
    return {"cipher_id": result[0], "team_id": result[1]}


def updateAttempt(cipher_id: int, team_id: int, updatedAttempt: Attempt):
    with Curr_with_conn() as cur:
        cur.execute("UPDATE attempt SET time=%s, is_successful=%s WHERE cipher_id=%s AND team_id=%s;",
                    (updatedAttempt.time, updatedAttempt.is_successful, cipher_id, team_id))


def deleteAttempt(cipher_id: int, team_id: int):
    with Curr_with_conn() as cur:
        cur.execute("DELETE FROM attempt WHERE cipher_id=%s AND team_id=%s;", (cipher_id, team_id,))


def getAttempt(cipher_id: int, team_id):
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM attempt WHERE cipher_id=%s AND team_id=%s;", (cipher_id, team_id,))
        result = cur.fetchall()
    return result


def getAttempts():
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM attempt")
        result = cur.fetchall()
    return result
