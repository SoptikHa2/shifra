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
                                  , (newCipher.name, cipherGame_id, newCipher.req_cipher_id, newCipher.description, newCipher.solution, newCipher.judge, newCipher.cipher_file, newCipher.img, newCipher.succes_msg, newCipher.cooldown, newCipher.attempts, newCipher.score, newCipher.reference_solution))
            return {"result": success}


# UPDATE cipher
# TODO discuss update -> what should be updated, how, how to change the query
# Note: Damian will work on the query after the discussion
@router.put("/api/cipher/{cipherGame_id}/ciphers/{cipher_id}")
def updateCipher(cipherGame_id: int, cipher_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            success = cur.execute("....................")   # what should be updated?
            return {"result": success}


# DELETE cipher
# TODO add return of the id of the deleted item
# Also, delete is not showing in the /docs, why tho ?
@router.delete("/api/cipher/{cipherGame_id}")
def deleteCipher(cipherGame_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("DELETE FROM cipher WHERE cipher_id=%s;", (cipherGame_id,))
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
