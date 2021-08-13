from . import DBConn
from .DBConn import *
from fastapi import APIRouter
from routes import Cipher

router = APIRouter()

connection: DBConn = None


def insertCipher(cipher_game_id: int, newCipher: Cipher):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("INSERT INTO cipher(name, cipher_game_id, req_cipher_id, description, solution, judge, cipher_file, img, success_msg, cooldown, attempts, score, reference_solution) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING cipher_id;",
                            (newCipher.name, cipher_game_id, newCipher.req_cipher_id, newCipher.description, newCipher.solution, newCipher.judge, newCipher.cipher_file, newCipher.img, newCipher.success_msg, newCipher.cooldown, newCipher.attempts, newCipher.score, newCipher.reference_solution))
                cipher_id = cur.fetchone()[0]
    except:
        return {"result": "error"}
    return {"result": cipher_id}


def updateCipher(cipher_id: int, updatedCipher: Cipher):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("UPDATE cipher SET cipher_game_id = %s, req_cipher_id = %s, name = %s, description = %s, solution = %s, judge = %s, cipher_file = %s, img = %s, success_msg = %s, cooldown = %s, attempts = %s, score = %s, reference_solution = %s WHERE cipher_id = %s;",
                            (updatedCipher.cipher_game_id, updatedCipher.req_cipher_id, updatedCipher.name, updatedCipher.description, updatedCipher.solution, updatedCipher.judge, updatedCipher.cipher_file,
                             updatedCipher.img, updatedCipher.success_msg, updatedCipher.cooldown, updatedCipher.attempts, updatedCipher.score, updatedCipher.reference_solution, cipher_id))
    except:
        return {"result": "error"}
    return {"result": "updated"}


def deleteCipher(cipher_id: int):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("DELETE FROM cipher WHERE cipher_id = %s;", (cipher_id,))
    except:
        return {"result": "error"}
    return {"result": "removed"}


def getCiphers(cipherGame_id: int):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("SELECT * FROM cipher where cipher_game_id = %s;", (cipherGame_id,))
                result = cur.fetchall()
    except:
        return {"result": "error"}
    return result


def getCipher(cipher_id: int):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("SELECT * FROM cipher WHERE cipher_id = %s;", (cipher_id,))
                result = cur.fetchall()
    except:
        return {"result": "error"}
    return result
