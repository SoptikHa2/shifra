from .config import *
from fastapi import APIRouter
from routes import Hint

                                        # All hints are under ciphers under cipherGames
router = APIRouter()

connection = DB_conn
DB_conn.chooseDB(connection)


@router.post("/api/cipher/{cipherGame_id}/ciphers/{cipher_id}/hint")
def insertHint(newHint: Hint):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            success = cur.execute("INSERT INTO hint(cipher_id, msg, img, hint_file, score_cost, time_cost) VALUES(%s, %s, %s, %s, %s, %s);",
                                  (newHint.cipher_id, newHint.msg, newHint.img, newHint.hint_file, newHint.score_cost, newHint.time_cost))
            return {"result": success}


@router.put("/api/cipher/{cipherGame_id}/ciphers/{cipher_id}/hint/{hint_id}")
def updateHint(cipherGame_id: int, cipher_id: int, hint_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            success = cur.execute("....................")   # what should be updated?
            return {"result": success}


@router.delete("/api/cipher/{cipherGame_id}/ciphers/{cipher_id}/hint/{hint_id}")  # return id of inserted item
def deleteHint(cipherGame_id: int, cipher_id: int, hint_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("DELETE FROM hint WHERE hint_id=%s;", (hint_id,))
            return {"result": "removed"}

# Confused as for what cipherGame_id serves for tbh
@router.get("/api/cipher/{cipherGame_id}/ciphers/{cipher_id}/hint/{hint_id}")
def getHint(cipherGame_id: int, cipher_id: int, hint_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM hint WHERE hint_id = %s;", (hint_id,))
            result = cur.fetchall()
            return result


# Changed so that it return hints only, not the whole table ( it was confusing )
@router.get("/api/cipher/{cipherGame_id}/ciphers/{cipher_id}/hint")
def getHints():
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM hint;")
            result = cur.fetchall()
            return result
