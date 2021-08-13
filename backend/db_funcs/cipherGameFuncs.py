from . import DBConn
from .DBConn import *
from fastapi import APIRouter
from routes import Cipher_game, Team


router = APIRouter()
connection: DBConn = None

def insertCipherGame(newCipherGame: Cipher_game):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("INSERT INTO cipher_game (cipher_id, name, description, visible_from, deadline_signup, deadline_event, capacity, teammax, password, autoapprove) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING cipher_game_id;",
                            (newCipherGame.cipher_id, newCipherGame.name, newCipherGame.description, newCipherGame.visible_from, newCipherGame.deadline_signup, newCipherGame.deadline_event, newCipherGame.capacity, newCipherGame.teammax,
                             newCipherGame.password, newCipherGame.autoapprove))
                cipher_game_id = cur.fetchone()[0]
    except:
        return {"result": "error"}
    return {"result": cipher_game_id}


def updateCipherGame(cipher_game_id: int, updated_cipher_game: Cipher_game):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute(
                    "UPDATE cipher_game SET cipher_id = %s, name = %s, description = %s, visible_from = %s, deadline_signup = %s, deadline_event = %s, capacity = %s, teammax = %s, password = %s, autoapprove = %s WHERE cipher_game_id = %s;",
                    (updated_cipher_game.cipher_id, updated_cipher_game.name, updated_cipher_game.description, updated_cipher_game.visible_from, updated_cipher_game.deadline_signup,
                     updated_cipher_game.deadline_event, updated_cipher_game.capacity, updated_cipher_game.teammax, updated_cipher_game.password, updated_cipher_game.autoapprove,
                     cipher_game_id))
    except:
        return {"result": "error"}
    return {"result": "updated"}


def deleteCipherGame(cipher_game_id: int):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                success = cur.execute("DELETE FROM cipher_game WHERE cipher_game_id = %s;", (cipher_game_id,))
    except:
        return {"result": "error"}
    return {"result": success}


def getCipherGames():
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("SELECT * FROM cipher_game;")
                result = cur.fetchall()
    except:
        return {"result": "error"}
    return result


def getCipherGame(cipher_game_id: int):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("SELECT * FROM cipher_game WHERE cipher_game_id = %s;", (cipher_game_id,))
                result = cur.fetchall()
    except:
        return {"result": "error"}
    return result

def is_game_organizer(cipher_game_id: int, user_id: int):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("SELECT cipher_game_person.person_id FROM cipher_game_person WHERE cipher_game_person.cipher_game_id = %s;", cipher_game_id)
                result = cur.fetchall()[0]
    except:
        return False
    return result == user_id


def get_visible_ciphers(cipher_game_id: int, user_id: int) -> [Cipher]:
    with DB_conn.getConn(connection):
     	with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT cipher.cipher_id FROM cipher WHERE cipher_game_id = %s MINUS SELECT cipher.cipher_id FROM cipher WHERE cipher_game_id = %s AND req_cipher_id NOT IN (SELECT * FROM cipher JOIN attempt ON cipher.cipher_game_id = %s AND attempt.cipher_id = cipher.cipher_id AND attempt.is_successful = TRUE JOIN team ON team.team_id = attempt.team_id JOIN team_member ON team_member.team_id = team.team_id AND team_member.person_id = %s));", (cipher_game_id, cipher_game_id, cipher_game_id , cipher_game_id, user_id))
            result = cur.fetchall()
            return [cipher_from_db_row(x) for x in result]

def get_all_ciphers(cipher_game_id: int) -> [Cipher]:
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT cipher.cipher_id FROM cipher WHERE cipher.cipher_game_id = %s;", cipher_game_id)
            result = cur.fetchall()
            return [cipher_from_db_row(x) for x in result]

