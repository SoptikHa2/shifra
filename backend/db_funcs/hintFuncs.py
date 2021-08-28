from typing import Optional

from .DBConn import *
from fastapi import APIRouter
from routes.hint import *

router = APIRouter()


def insertHint(newHint: Hint):
    with Curr_with_conn() as cur:
        cur.execute("INSERT INTO hint(cipher_id, msg, img, hint_file, score_cost, time_cost) VALUES(%s, %s, %s, %s, %s, %s) RETURNING hint_id;",
                              (newHint.cipher_id, newHint.msg, newHint.img, newHint.hint_file, newHint.score_cost, newHint.time_cost))
        hint_id = cur.fetchone()[0]
    return hint_id

def updateHint(hint_id: int, updated_hint: Hint):
    with Curr_with_conn() as cur:
        cur.execute(
            "UPDATE hint SET cipher_id = %s, msg = %s, img = %s, hint_file = %s, score_cost = %s, time_cost = %s WHERE hint_id = %s;",
            (updated_hint.cipher_id, updated_hint.msg, updated_hint.img, updated_hint.hint_file, updated_hint.score_cost, updated_hint.time_cost, hint_id))


def deleteHint(hint_id: int):
    with Curr_with_conn() as cur:
        cur.execute("DELETE FROM hint WHERE hint_id=%s;", (hint_id,))


def getHint(hint_id: int):
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM hint WHERE hint_id = %s;", (hint_id,))
        result = cur.fetchall()
    return result


def getHints():
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM hint;")
        result = cur.fetchall()
    return result


def get_hints_game(hint_id: int) -> Optional[int]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT cipher.cipher_game_id FROM cipher JOIN hint ON hint.cipher_id = cipher.cipher_id AND hint.hint_id = %s;", (hint_id,))
        result = cur.fetchall()[0]
    return result


def get_hint(hint_id: int) -> Optional[Hint]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM hint WHERE hint_id = %s;", (hint_id,))
        result = cur.fetchall()[0]
    return hint_from_db_row(result)


def use_hint(hint_id: int, team_id: int) -> bool:
    try:
        with Curr_with_conn() as cur:
            cur.execute("INSERT INTO hint_used(hint_id, team_id) VALUES(%s, %s);",
                        (hint_id, team_id,))
    except:
        return False
    return True


def is_hint_used(hint_id: int, team_id: int) -> bool:
    try:
        with Curr_with_conn() as cur:
            cur.execute("SELECT * FROM used_hint uh WHERE uh.hint_id = %s AND uh.team_id = %s;",
                        (hint_id, team_id,))
            result = cur.fetchall()
    except:
        return False
    return bool(result)

