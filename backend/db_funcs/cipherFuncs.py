from .config import *
from fastapi import APIRouter
from routes import Cipher

router = APIRouter()

connection = DB_conn

# INSERT cipher
# TODO add return of the id of the inserted item
@router.post("/api/cipher/{cipherGame_id}/ciphers")
def insertCipher(cipherGame_id: int, newCipher: Cipher):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("INSERT INTO cipher(name, cipher_game_id, req_cipher_id, description, solution, judge, cipher_file, img, success_msg, cooldown, attempts, score, reference_solution) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
                                  , (newCipher.name, cipherGame_id, newCipher.req_cipher_id, newCipher.description, newCipher.solution, newCipher.judge, newCipher.cipher_file, newCipher.img, newCipher.success_msg, newCipher.cooldown, newCipher.attempts, newCipher.score, newCipher.reference_solution))
            cur.execute("SELECT * FROM cipher_cipher_id_seq")
            cipher_id = cur.fetchone()[0]
    return {"result": cipher_id}


# UPDATE cipher
# TODO discuss update -> what should be updated, how, how to change the query
# Note: Damian will work on the query after the discussion
@router.put("/api/cipher/{cipherGame_id}/ciphers/{cipher_id}")
def updateCipher(cipher_id: int, updatedCipher: Cipher):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("UPDATE cipher SET cipher_game_id=%s, req_cipher_id=%s, name=%s, description=%s, solution=%s, judge=%s, cipher_file=%s, img=%s, success_msg=%s, cooldown=%s, attempts=%s, score=%s, reference_solution=%s WHERE cipher_id=%s;",
                        (updatedCipher.cipher_game_id, updatedCipher.req_cipher_id, updatedCipher.name, updatedCipher.description, updatedCipher.solution, updatedCipher.judge, updatedCipher.cipher_file,
                         updatedCipher.img, updatedCipher.success_msg, updatedCipher.cooldown, updatedCipher.attempts, updatedCipher.score, updatedCipher.reference_solution, cipher_id))
    return {"result": "updated"}


# DELETE cipher
# TODO add return of the id of the deleted item
@router.delete("/api/cipher/{cipherGame_id}/cipher/{cipher_id}")
def deleteCipher(cipherGame_id: int, cipher_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("DELETE FROM cipher WHERE cipher_id=%s;", (cipher_id,))
    return {"result": "removed"}


# GET ALL ciphers of one cipher game
@router.get("/api/cipher/{cipherGame_id}/ciphers")
def getCiphers(cipherGame_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            #cur.execute("SELECT * FROM cipher join cipher_game using(cipher_id) where cipher_id = %s;", (cipherGame_id,))
            cur.execute("SELECT * FROM cipher where cipher_game_id = %s;", (cipherGame_id,))
            result = cur.fetchall()
    return result


# GET ONE cipher
@router.get("/api/cipher/{cipherGame_id}/ciphers/{cipher_id}")
def getCipher(cipherGame_id: int, cipher_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM cipher WHERE cipher_game_id = %s AND cipher_id = %s;", (cipherGame_id, cipher_id,))
            result = cur.fetchall()
    return result
