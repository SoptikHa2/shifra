from db_funcs.DBConn import *
from datetime import datetime
from typing import Optional
from db_funcs import *
from db_funcs.teamFuncs import *


class Stat:
    team_id: int
    team_name: str
    score: int
    time: float
    final_score: int
    final_time: float

    def __self__(self):
        self.team_id = 0
        self.team_name = ""
        self.score = 0
        self.time = 0
        self.final_score = 0
        self.final_time = 0

    def update_info(self, team_id: int, name: str, cipher_game_id: int):
        self.team_id = team_id
        self.team_name = name
        self.score = get_score(cipher_game_id, team_id)
        self.final_score = self.score - get_score_penalization(cipher_game_id, team_id)
        self.time = get_time(cipher_game_id, team_id)
        self.final_time = self.time + get_time_penalization(cipher_game_id, team_id)
        return self

    def __lt__(self, other):
        if self.final_score == other.final_score:
            return self.final_time < other.final_time
        return self.final_score < other.final_score


def get_score(cipher_game_id: int, team_id: int) -> int:
    score = 0
    try:
        with Curr_with_conn() as cur:
            cur.execute(
                "SELECT SUM(cipher.score) FROM cipher WHERE cipher.cipher_game_id = %s JOIN attempt a ON a.cipher_id = cipher.cipher_id AND a.team_id = %s AND a.is_successful = TRUE GROUP BY cipher.score;",
                (cipher_game_id, team_id))
            score += cur.fetchall()[0]
    except:
        return 0
    return score


def get_time(cipher_game_id: int, team_id: int) -> float:
    start_time = get_start_time(cipher_game_id, team_id)
    if start_time is None:
        return 0
    if completed_game(cipher_game_id, team_id):
        finish_time = get_finish_time(cipher_game_id, team_id)
        duration_in_s = (finish_time - start_time).total_seconds()
    else:
        actual_time = datetime.now()
        duration_in_s = (actual_time - start_time).total_seconds()
    return duration_in_s


def get_start_time(cipher_game_id: int, team_id: int) -> datetime:
    start_cipher = get_start_cipher(cipher_game_id)
    if start_cipher is not None:
        with Curr_with_conn() as cur:
            cur.execute(
                "SELECT a.start_time FROM attempt a WHERE a.team_id = %s AND a.cipher_id = %s;",
                (team_id, start_cipher))
            start_time = cur.fetchone()
            return start_time
    else:
        with Curr_with_conn() as cur:
            cur.execute(
                "SELECT a.start_time FROM attempt a WHERE a.team_id = %s ORDER BY a.start_time ASC;", (team_id, ))
            start_time = cur.fetchone()
            return start_time


def get_finish_time(cipher_game_id: int, team_id: int) -> datetime:
    with Curr_with_conn() as cur:
        cur.execute(
            "SELECT a.last_attempt_time FROM attempt a WHERE a.team_id = %s JOIN cipher ON cipher.cipher_id = a.cipher_id AND cipher_game_id = %s ORDER BY a.last_attempt_time DESC;",
            (team_id, cipher_game_id))
        start_time = cur.fetchall()[0]
        return start_time


def get_score_penalization(cipher_game_id: int, team_id: int) -> int:
    try:
        with Curr_with_conn() as cur:
            cur.execute(
                "SELECT SUM(h.score_cost) FROM hint h JOIN cipher ON cipher.cipher_id = h.cipher_id JOIN cipher_game ON cipher_game.cipher_game_id = %s JOIN hint_used hu ON hu.hint_id = h.hint_id AND hu.team_id = %s GROUP BY h.score_cost;",
                (cipher_game_id, team_id))
            penalization = cur.fetchone()[0]
    except:
        return 0
    return penalization


def completed_game(cipher_game_id: int, team_id: int) -> bool:
    original_count = get_cipher_count(cipher_game_id)
    with Curr_with_conn() as cur:
        cur.execute(
            "SELECT COUNT(cipher.cipher_id) FROM cipher JOIN attempt a ON a.cipher_id = cipher.cipher_id AND a.was_success = TRUE AND a.team_id = %s WHERE cipher.cipher_game_id = %s GROUP BY cipher.cipher_id;",
            (cipher_game_id, team_id))
        completed_count = cur.fetchall()[0]
        return completed_count == original_count


def get_time_penalization(cipher_game_id: int, team_id: int) -> float:
    try:
        with Curr_with_conn() as cur:
            cur.execute(
                "SELECT SUM(h.time_cost) FROM hint h JOIN cipher ON cipher.cipher_id = h.cipher_id JOIN cipher_game ON cipher_game.cipher_game_id = %s JOIN hint_used hu ON hu.hint_id = h.hint_id AND hu.team_id = %s GROUP BY h.score_cost;",
                (cipher_game_id, team_id))
            penalization = cur.fetchone()[0]
    except:
        return 0
    return penalization


def get_cipher_count(cipher_game_id: int) -> int:
    with Curr_with_conn() as cur:
        cur.execute(
            "SELECT COUNT(1) FROM cipher_game cg JOIN cipher ON cipher.cipher_game_id = cg.cipher_game_id WHERE cg.cipher_game_id = %s;",
            (cipher_game_id, ))
        count = cur.fetchall()[0]
        return count


def get_start_cipher(cipher_game_id: int) -> Optional[int]:
    with Curr_with_conn() as cur:
        cur.execute(
            "SELECT cg.time_starting_cipher_id FROM cipher_game cg WHERE cg.cipher_game_id = %s;", (cipher_game_id, ))
        start_cipher_id = cur.fetchone()
        return start_cipher_id
