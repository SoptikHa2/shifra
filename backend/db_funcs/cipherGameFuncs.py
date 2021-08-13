from . import DBConn
from .DBConn import *
from fastapi import APIRouter
from routes import Cipher_game
from routes.stats import Stat


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


def is_visible(cipher_game_id: int):
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("SELECT * FROM cipher_game WHERE visible_from <=  NOW() AND cipher_game_id = %s;", cipher_game_id)
                result = cur.fetchall()
    except:
        return False
    return bool(result)


def is_staff(cipher_game_id: int, user_id: int) -> bool:
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM cipher_game_admin ca WHERE ca.cipher_game_id < %s AND ca.person_id = %s;", (cipher_game_id, user_id))
            result = cur.fetchall()
            return bool(result)


# TODO: Add stats to list, sort function...
def get_leaderboard(cipher_game_id: int) -> [Stat]:
    teams = get_all_teams(cipher_game_id)
    result = [Stat(x.team_id, x.name, cipher_game_id) for x in teams]
    result.sort()
    return result


def get_cipher_count(cipher_game_id: int) -> int:
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute(
                "SELECT COUNT(1) FROM cipher_game cg WHERE cg.cipher_game_id = %s JOIN cipher ON cipher.cipher_game_id = cg.cipher_game_id;",
                cipher_game_id)
            count = cur.fetchall()[0]
            return count


def get_start_cipher(cipher_game_id: int) -> int:
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute(
                "SELECT cg.time_starting_cipher_id FROM cipher_game cg WHERE cg.cipher_game_id = %s;", cipher_game_id)
            id = cur.fetchall()[0]
            return id


def get_all_teams(cipher_game_id: int) -> [int]:
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute(
                "SELECT cgt.team_id FROM cipher_game_team cgt WHERE cgt.cipher_game_id = %s;", cipher_game_id)
            teams = cur.fetchall()
            return teams
