from typing import Optional

from fastapi import APIRouter

from routes import Cipher, cipher_from_db_row
from . import get_cipher_game_id_from_team
from .DBConn import *

router = APIRouter()


def insert_cipher(cipher_game_id: int, newCipher: Cipher):
    with Curr_with_conn() as cur:
        cur.execute("INSERT INTO cipher(name, cipher_game_id, req_cipher_id, description, solution, judge, "
                    "cipher_file, img, success_msg, cooldown, attempts, score, reference_solution) VALUES (%s, %s, "
                    "%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING cipher_id;",
                    (newCipher.name, cipher_game_id, newCipher.req_cipher_id, newCipher.description, newCipher.solution,
                     newCipher.judge, newCipher.cipher_file, newCipher.img, newCipher.success_msg, newCipher.cooldown,
                     newCipher.attempts, newCipher.score, newCipher.reference_solution))
        cipher_id = cur.fetchone()[0]
    return cipher_id


def update_cipher(cipher_id: int, updatedCipher: Cipher):
    with Curr_with_conn() as cur:
        cur.execute("UPDATE cipher SET cipher_game_id = %s, req_cipher_id = %s, name = %s, description = %s, "
                    "solution = %s, judge = %s, cipher_file = %s, img = %s, success_msg = %s, cooldown = %s, "
                    "attempts = %s, score = %s, reference_solution = %s WHERE cipher_id = %s;",
                    (updatedCipher.cipher_game_id, updatedCipher.req_cipher_id, updatedCipher.name,
                     updatedCipher.description, updatedCipher.solution, updatedCipher.judge, updatedCipher.cipher_file,
                     updatedCipher.img, updatedCipher.success_msg, updatedCipher.cooldown, updatedCipher.attempts,
                     updatedCipher.score, updatedCipher.reference_solution, cipher_id))


def delete_cipher(cipher_id: int):
    with Curr_with_conn() as cur:
        cur.execute("DELETE FROM cipher WHERE cipher_id = %s;", (cipher_id,))


def get_ciphers(cipherGame_id: int) -> [Cipher]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM cipher where cipher_game_id = %s;", (cipherGame_id,))
        result = cur.fetchall()
    return [cipher_from_db_row(x) for x in result]


def get_cipher(cipher_id: int) -> Optional[Cipher]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM cipher WHERE cipher_id = %s;", (cipher_id,))
        result = cur.fetchone()
    if result is None:
        return None
    return cipher_from_db_row(result)


def is_cipher_solved(cipher_id: int, team_id: int) -> bool:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM attempt a "
                    "WHERE a.cipher_id = %s AND a.team_id = %s AND a.was_success;",
                    (cipher_id, team_id,))
        result = cur.fetchone()
    return result is not None


def is_cipher_visible_to_team(cipher: Cipher, team_id: int, team_cipher_game_id: int) -> bool:
    # If team is not signed up into this, cipher is not visible.
    if cipher.cipher_game_id != team_cipher_game_id:
        return False

    # Check for requirements
    if cipher.req_cipher_id is None:
        return True

    return is_cipher_solved(cipher.req_cipher_id, team_id)


def get_cipher_by_hint(hint_id: int) -> Optional[Cipher]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT cipher.* FROM cipher JOIN hint ON hint.hint_id = %s;", (hint_id,))
        result = cur.fetchone()
    if result is None:
        return None
    return cipher_from_db_row(result)


def is_team_out_of_attempts(cipher_id: int, team_id: int) -> bool:
    with Curr_with_conn() as cur:
        cur.execute("SELECT COUNT(*) FROM attempt a "
                    "JOIN cipher c ON c.cipher_id = a.cipher_id "
                    "WHERE a.cipher_id = %s AND a.team_id = %s AND"
                    "(c.attempts <= 0 OR"
                    " c.attempts > a.attempt_count"
                    ");", (cipher_id, team_id))
        return cur.fetchone()[0] > 0


def is_team_cooldown_limited(cipher_id: int, team_id: int) -> bool:
    with Curr_with_conn() as cur:
        cur.execute("SELECT COUNT(*) FROM attempt a "
                    "JOIN cipher c ON c.cipher_id = a.cipher_id "
                    "WHERE a.cipher_id = %s AND a.team_id = %s AND "
                    "(a.last_attempt_time IS NULL OR "
                    "(a.last_attempt_time + (c.cooldown * interval '1 second') < now())"
                    ")", (cipher_id, team_id))
        return cur.fetchone()[0] > 0
