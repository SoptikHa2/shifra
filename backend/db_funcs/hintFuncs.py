from . import DBConn
from .DBConn import *
from fastapi import APIRouter
from routes import Hint

router = APIRouter()

connection: DBConn = None

def insertHint(newHint: Hint):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("INSERT INTO hint(cipher_id, msg, img, hint_file, score_cost, time_cost) VALUES(%s, %s, %s, %s, %s, %s) RETURNING hint_id;",
                                      (newHint.cipher_id, newHint.msg, newHint.img, newHint.hint_file, newHint.score_cost, newHint.time_cost))
                hint_id = cur.fetchone()[0]
    except:
        return {"result": "error"}
    return {"result": hint_id}


def updateHint(hint_id: int, updated_hint: Hint):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute(
                    "UPDATE hint SET cipher_id = %s, msg = %s, img = %s, hint_file = %s, score_cost = %s, time_cost = %s WHERE hint_id = %s;",
                    (updated_hint.cipher_id, updated_hint.msg, updated_hint.img, updated_hint.hint_file, updated_hint.score_cost, updated_hint.time_cost, hint_id))
    except:
        return {"result": "error"}
    return {"result": "updated"}


def deleteHint(hint_id: int):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("DELETE FROM hint WHERE hint_id=%s;", (hint_id,))
    except:
        return {"result": "error"}
    return {"result": "removed"}


def get_hint(hint_id: int):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("SELECT * FROM hint WHERE hint_id = %s;", (hint_id,))
                result = cur.fetchall()[0]
    except:
        return None
    return result


def getHints():
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("SELECT * FROM hint;")
                result = cur.fetchall()
    except:
        return {"result": "error"}
    return result
