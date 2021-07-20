from .config import *
from fastapi import APIRouter
from routes import Hint

                                        # All hints are under ciphers under cipherGames
router = APIRouter()

connection = ""

@router.post("/api/cipher/{cipherGame_id}/ciphers/{cipher_id}/hint")
def insertHint(newHint: Hint):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("INSERT INTO hint(cipher_id, msg, img, hint_file, score_cost, time_cost) VALUES(%s, %s, %s, %s, %s, %s);",
                                  (newHint.cipher_id, newHint.msg, newHint.img, newHint.hint_file, newHint.score_cost, newHint.time_cost))
            cur.execute("SELECT * FROM hint_hint_id_seq")
            hint_id = cur.fetchone()[0]
    return {"result": hint_id}


@router.put("/api/cipher/{cipherGame_id}/ciphers/{cipher_id}/hint/{hint_id}")
def updateHint(hint_id: int, updated_hint: Hint):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute(
                "UPDATE hint SET cipher_id=%s, msg=%s, img=%s, hint_file=%s, score_cost=%s, time_cost=%s WHERE hint_id=%s;",
                (updated_hint.cipher_id, updated_hint.msg, updated_hint.img, updated_hint.hint_file, updated_hint.score_cost, updated_hint.time_cost, hint_id))
    return {"result": "updated"}


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
