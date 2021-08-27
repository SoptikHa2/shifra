from fastapi import APIRouter

from routes import Attempt
from .DBConn import *

# All hints are under ciphers under cipherGames
router = APIRouter()


# This file needs to be updated after talkie about database entity keys


def insertAttempt(newAttempt: Attempt):
    with Curr_with_conn() as cur:
        cur.execute(
            "INSERT INTO attempt(cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (%s, %s, %s, %s, %s, %s) RETURNING cipher_id;",
            (newAttempt.cipher_id, newAttempt.team_id, newAttempt.start_time, newAttempt.last_attempt_time, newAttempt.attempt_count, newAttempt.was_success))
        result = cur.fetchone()
    return result[0]


def updateAttempt(cipher_id: int, team_id: int, updatedAttempt: Attempt):
    with Curr_with_conn() as cur:
        cur.execute("UPDATE attempt SET start_time=%s, last_attempt_time=%s, attempt_count=%s, was_success=%s WHERE cipher_id=%s AND team_id=%s;",
                    (updatedAttempt.start_time, updatedAttempt.last_attempt_time, updatedAttempt.attempt_count, updatedAttempt.was_success, cipher_id, team_id))


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
