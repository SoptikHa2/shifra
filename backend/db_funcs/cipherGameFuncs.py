from .config import *
from fastapi import APIRouter
from routes import Cipher_game


router = APIRouter()
connection = DB_conn()

@router.post("/api/cipher/{cipherGame_id}/ciphers/{cipher_id}")  # return id of inserted item
def insertCipherGame(newCipherGame: Cipher_game):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("INSERT INTO cipher_game (cipher_id, name, description, visible_from, deadline_signup, deadline_event, capacity, teammax, password, autoapprove) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", (newCipherGame.cipher_id, newCipherGame.name, newCipherGame.description, newCipherGame.visible_from, newCipherGame.deadline_signup, newCipherGame.deadline_event, newCipherGame.capacity, newCipherGame.teammax, newCipherGame.password, newCipherGame.autoapprove))
            cur.execute("SELECT * FROM cipher_game_cipher_game_id_seq;")
            cipher_game_id = cur.fetchone()[0]
    return {"result": cipher_game_id}


@router.put("/api/cipher/{cipherGame_id}")
def updateCipherGame(cipherGame_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            success = cur.execute("....................")   # what should be updated?
    return {"result": success}


# TODO WHY THIS FUCKER DOES NOT WORK ?????
@router.delete("/api/cipher/{cipherGame_id}")  # return id of inserted ite
def deleteCipherGame(cipherGame_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            success = cur.execute("DELETE FROM cipher_game WHERE cipher_game_id = %s;", (cipherGame_id,))
    return {"result": success}


@router.get("/api/cipher")
def getCipherGames():
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM cipher_game;")
            result = cur.fetchall()
    return result


@router.get("/api/cipher/{cipherGame_id}")
def getCipherGame(cipherGame_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM cipher_game WHERE cipher_game_id = %s;", (cipherGame_id,))
            result = cur.fetchall()
    return result
