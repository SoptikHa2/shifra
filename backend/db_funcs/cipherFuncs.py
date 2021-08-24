from fastapi import APIRouter

from routes import Cipher
from .DBConn import *

router = APIRouter()


def insertCipher(cipher_game_id: int, newCipher: Cipher):
    with Curr_with_conn() as cur:
        cur.execute("INSERT INTO cipher(name, cipher_game_id, req_cipher_id, description, solution, judge, cipher_file, img, success_msg, cooldown, attempts, score, reference_solution) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING cipher_id;",
                    (newCipher.name, cipher_game_id, newCipher.req_cipher_id, newCipher.description, newCipher.solution, newCipher.judge, newCipher.cipher_file, newCipher.img, newCipher.success_msg, newCipher.cooldown, newCipher.attempts, newCipher.score, newCipher.reference_solution))
        cipher_id = cur.fetchone()[0]
    return cipher_id


def updateCipher(cipher_id: int, updatedCipher: Cipher):
    with Curr_with_conn() as cur:
        cur.execute("UPDATE cipher SET cipher_game_id = %s, req_cipher_id = %s, name = %s, description = %s, solution = %s, judge = %s, cipher_file = %s, img = %s, success_msg = %s, cooldown = %s, attempts = %s, score = %s, reference_solution = %s WHERE cipher_id = %s;",
                    (updatedCipher.cipher_game_id, updatedCipher.req_cipher_id, updatedCipher.name, updatedCipher.description, updatedCipher.solution, updatedCipher.judge, updatedCipher.cipher_file,
                     updatedCipher.img, updatedCipher.success_msg, updatedCipher.cooldown, updatedCipher.attempts, updatedCipher.score, updatedCipher.reference_solution, cipher_id))


def deleteCipher(cipher_id: int):
    with Curr_with_conn() as cur:
        cur.execute("DELETE FROM cipher WHERE cipher_id = %s;", (cipher_id,))


def getCiphers(cipherGame_id: int):
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM cipher where cipher_game_id = %s;", (cipherGame_id,))
        result = cur.fetchall()
    return result


def getCipher(cipher_id: int):
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM cipher WHERE cipher_id = %s;", (cipher_id,))
        result = cur.fetchone()
    return result
