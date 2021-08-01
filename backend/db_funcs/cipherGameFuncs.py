from . import DBConn
from .DBConn import *
from fastapi import APIRouter
from routes import Cipher_game


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


def get_leaderboard(cipher_game_id: int):
    if not is_visible(cipher_game_id):
        return {"result": "game is not visible"}
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("SELECT t.team_id, t.name, SUM(c.score) FROM team t JOIN attempt a ON a.team_id = t.team_id AND a.is_successful = TRUE JOIN cipher c ON c.cipher_id = a.cipher_id AND c.cipher_game_id = %s GROUP BY t.team_id, t.name, c.score;", cipher_game_id)
                result = cur.fetchall()
    except:
        return None
    return result


def is_visible(cipher_game_id: int):
    timestamp = datetime.now()
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("SELECT * FROM cipher_game WHERE visible_from >=  %s AND cipher_game_id = %s;", (timestamp,cipher_game_id))
    except:
        return False
    return True


def get_ciphers(cipher_game_id: int):
    if # TODO: is root condition
        try:
            with DB_conn.getConn(connection):
                with DB_conn.getCursor(connection) as cur:
                    cur.execute("SELECT * FROM cipher_game WHERE visible_from >=  %s AND cipher_game_id = %s;", (timestamp,cipher_game_id))
                    result = cur.fetchall()
        except:
            return {"error": "error occured"}
        return result
    else:
        team_id = # TODO: id of the team!!!
        try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("SELECT * FROM cipher_game WHERE req_cipher_id IS NULL OR WHERE EXISTS ( SELECT * FROM attempt WHERE team_id = %s AND is_successful = TRUE AND cipher_id = req_cipher_id);", team_id)
                result = cur.fetchall()
        except:
            return None
        return result


