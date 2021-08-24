from typing import Optional

from .DBConn import *
from fastapi import APIRouter
from routes import CipherGame, cipher_game_from_db_row

router = APIRouter()


def insert_cipher_game(newCipherGame: CipherGame) -> int:
    with Curr_with_conn() as cur:
        cur.execute(
            "INSERT INTO cipher_game (time_starting_cipher_id, name, description, visible_from, deadline_signup, "
            "deadline_event, capacity, teammax, password, autoapprove) VALUES (%s, %s, %s, %s, %s, %s, "
            "%s, %s, %s, %s) RETURNING cipher_game_id;",
            (newCipherGame.cipher_id_to_start_timer, newCipherGame.name, newCipherGame.description, newCipherGame.visible_from,
             newCipherGame.deadline_signup, newCipherGame.deadline_event, newCipherGame.capacity, newCipherGame.teammax,
             newCipherGame.password, newCipherGame.autoapprove))
        cipher_game_id = cur.fetchone()[0]
    return cipher_game_id


def update_cipher_game(cipher_game_id: int, updated_cipher_game: CipherGame):
    with Curr_with_conn() as cur:
        cur.execute(
            "UPDATE cipher_game SET time_starting_cipher_id = %s, name = %s, description = %s, visible_from = %s, "
            "deadline_signup = %s, deadline_event = %s, capacity = %s, teammax = %s, password = %s, autoapprove = "
            "%s WHERE cipher_game_id = %s;",
            (updated_cipher_game.cipher_id_to_start_timer, updated_cipher_game.name, updated_cipher_game.description,
             updated_cipher_game.visible_from, updated_cipher_game.deadline_signup,
             updated_cipher_game.deadline_event, updated_cipher_game.capacity, updated_cipher_game.teammax,
             updated_cipher_game.password, updated_cipher_game.autoapprove,
             cipher_game_id))


def delete_cipher_game(cipher_game_id: int):
    with Curr_with_conn() as cur:
        cur.execute("DELETE FROM cipher_game WHERE cipher_game_id = %s;", (cipher_game_id,))


def get_cipher_games() -> list[CipherGame]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM cipher_game;")
        result = cur.fetchall()
    return [cipher_game_from_db_row(x) for x in result]


def get_cipher_game(cipher_game_id: int) -> Optional[CipherGame]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM cipher_game WHERE cipher_game_id = %s;", (cipher_game_id,))
        result = cur.fetchone()
        if result is None:
            return None
    return cipher_game_from_db_row(result)


def is_visible(cipher_game_id: int) -> bool:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM cipher_game WHERE visible_from <=  NOW() AND cipher_game_id = %s;", cipher_game_id)
        result = cur.fetchall()
    return bool(result)


def get_visible_games(user_id: Optional[int]) -> [CipherGame]:
    with Curr_with_conn() as cur:
        # Everything visible to normal users
        cur.execute("SELECT * FROM cipher_game cg WHERE cg.visible_from < now() UNION SELECT cg.* FROM "
                    "cipher_game cg JOIN cipher_game_admin cgp ON cgp.cipher_game_id = cg.cipher_game_id AND "
                    "cgp.person_id = %s;", (user_id if user_id is not None else -1,))
        result = cur.fetchall()
    return [cipher_game_from_db_row(x) for x in result]


def is_staff(cipher_game_id: int, user_id: int) -> bool:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM cipher_game_admin ca WHERE ca.cipher_game_id = %s AND ca.person_id = %s;",
                    (cipher_game_id, user_id))
        result = cur.fetchall()
        return bool(result)


def get_all_cipher_games() -> [CipherGame]:
    with Curr_with_conn() as cur:
        # Everything visible to normal users
        cur.execute("SELECT * FROM cipher_game cg;")
        result = cur.fetchall()
        return [cipher_game_from_db_row(x) for x in result]


# what to return???
def add_team(team_id: int, cipher_game_id: int):
    with Curr_with_conn() as cur:
        cur.execute("INSERT INTO cipher_game_team (cipher_game_id, team_id) VALUES (%s, %s)", (cipher_game_id, team_id))


def is_full(team_id: int) -> bool:
    with Curr_with_conn() as cur:
        cur.execute("select teammax from team_member join cipher_game_team using(team_id) join cipher_game using(cipher_game_id) WHERE team_id = %s", (team_id, ))
        array_tmp = cur.fetchall()
        number_of_members = len(array_tmp)
        capacity = array_tmp[0][0]  # first record and first column (only teammax)
        if number_of_members == capacity:
            return True
        return False
