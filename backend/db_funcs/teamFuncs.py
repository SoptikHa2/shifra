import sys
from typing import Optional

sys.path.append('../')
from .DBConn import *
from fastapi import APIRouter
from datetime import datetime
from typing import Optional
from routes import Team, team_from_db_row, Person, person_from_db_row, EditTeam
from typing import Optional, List

from db_funcs import *
from routes import *4


router = APIRouter()


def insertTeam(newTeam: Team):
    with Curr_with_conn() as cur:

        cur.execute("INSERT INTO team (name, approved) VALUES(%s, %s) RETURNING team_id;",
                    (newTeam.name, newTeam.approved))

        team_id = cur.fetchone()[0]
    return team_id


def updateTeam(team_id: int, updated_team: Team):
    with Curr_with_conn() as cur:
        cur.execute(
            "UPDATE team SET name = %s, invite_code = %s, approved = %s WHERE team_id = %s;",
            (updated_team.name, updated_team.invite_code, updated_team.approved, team_id,))


def deleteTeam(team_id: int):
    with Curr_with_conn() as cur:
        cur.execute("DELETE FROM team WHERE team_id = %s;", (team_id,))
    return team_id


def getTeam(team_id: int):
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM team WHERE team_id = %s;", (team_id,))
        result = cur.fetchall()
    return result


def getTeams():
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM team;")
        result = cur.fetchall()
    return result


def get_score(cipher_game_id: int, team_id: int) -> int:
    score = 0
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute(
                    "SELECT SUM(cipher.score) FROM cipher WHERE cipher.cipher_game_id = %s JOIN attempt a ON a.cipher_id = cipher.cipher_id AND a.team_id = %s AND a.is_successful = TRUE GROUP BY cipher.score;",
                    (cipher_game_id, team_id))
                score += cur.fetchall()[0]
    except:
        return 0
    return score


def get_start_time(cipher_game_id: int, team_id: int) -> datetime:
    start_cipher = get_start_cipher(cipher_game_id)
    if start_cipher != -1:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute(
                    "SELECT a.time FROM attempt a WHERE a.team_id = %s AND a.cipher_id = %s ORDER BY a.time ASC;", (team_id, start_cipher))
                start_time = cur.fetchall()[0]
                return start_time
    else:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute(
                    "SELECT a.time FROM attempt a WHERE a.team_id = %s ORDER BY a.time ASC;", team_id)
                start_time = cur.fetchall()[0]
                return start_time


def get_finish_time(cipher_game_id: int, team_id: int) -> datetime:
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute(
                "SELECT a.time FROM attempt a WHERE a.team_id = %s JOIN cipher ON cipher.cipher_id = a.cipher_id AND cipher_game_id = %s ORDER BY a.time DESC;",
                (team_id, cipher_game_id))
            start_time = cur.fetchall()[0]
            return start_time


def get_score_penalization(cipher_game_id: int, team_id: int) -> int:
    penalization = 0
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute(
                    "SELECT SUM(h.score_cost) FROM hint h JOIN cipher ON cipher.cipher_id = h.cipher_id JOIN cipher_game ON cipher_game.cipher_game_id = %s JOIN hint_used hu ON hu.hint_id = h.hint_id AND hu.team_id = %s GROUP BY h.score_cost;",
                    (cipher_game_id, team_id))
                penalization += cur.fetchall()[0]
    except:
        return 0
    return penalization


def completed_game(cipher_game_id: int, team_id: int) -> bool:
    original_count = get_cipher_count(cipher_game_id)
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute(
                "SELECT COUNT(cipher.cipher_id) FROM cipher WHERE cipher.cipher_game_id = %s JOIN attempt a ON a.cipher_id = cipher.cipher_id AND a.is_successful = TRUE AND a.team_id = %s GROUP BY cipher.cipher_id;",
                (cipher_game_id,team_id))
            completed_count = cur.fetchall()[0]
            return completed_count == original_count


def get_time(cipher_game_id: int, team_id: int) -> float:
    start_time = get_start_time(cipher_game_id, team_id)
    if completed_game(cipher_game_id, team_id):
        finish_time = get_finish_time(cipher_game_id, team_id)
        duration_in_s = (finish_time - start_time).total_seconds()
    else:
        actual_time = datetime.now()
        duration_in_s = (actual_time - start_time).total_seconds()
    return duration_in_s


def get_time_penalization(cipher_game_id: int, team_id: int) -> float:
    penalization = 0
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute(
                    "SELECT SUM(h.time_cost) FROM hint h JOIN cipher ON cipher.cipher_id = h.cipher_id JOIN cipher_game ON cipher_game.cipher_game_id = %s JOIN hint_used hu ON hu.hint_id = h.hint_id AND hu.team_id = %s GROUP BY h.score_cost;",
                    (cipher_game_id, team_id))
                penalization += cur.fetchall()[0]
    except:
        return 0
    return penalization

  
def is_in_team(team_id: int, user_id: int) -> bool:
    with Curr_with_conn() as cur:
        cur.execute("SELECT COUNT(*) FROM team_member WHERE team_member.team_id = %s AND team_member.person_id = %s;",
                    (team_id, user_id,))
        result = cur.fetchone()
        return result[0] > 0


def get_team_by_game_and_user(game_id: int, user_id: int) -> Optional[Team]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT t.* FROM team t "
                    "JOIN team_member tm ON t.team_id = tm.team_id "
                    "JOIN cipher_game_team cgt ON t.team_id = cgt.team_id "
                    "WHERE tm.person_id = %s AND cgt.cipher_game_id = %s;",
                    (user_id, game_id,))
        result = cur.fetchone()
        if result is None:
            return None
        return team_from_db_row(result)


def get_team_info(team_id: int) -> Optional[Team]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM team WHERE team.team_id = %s;", (team_id,))
        result = cur.fetchone()
        if result is None:
            return result
        return team_from_db_row(result)


def get_game_id(team_id: int) -> int:
    with Curr_with_conn() as cur:
        cur.execute("SELECT cgt.cipher_game_id FROM cipher_game_team cgt WHERE cgt.team_id = %s;", (team_id,))
        result = cur.fetchone()[0]

    return int(result)


def is_full(team_id: int) -> bool:
    with Curr_with_conn() as cur:
        cur.execute("SELECT teammax FROM team_member JOIN cipher_game_team USING(team_id) JOIN cipher_game USING(cipher_game_id) WHERE team_id = %s", (team_id, ))
        array_tmp = cur.fetchall()
        number_of_members = len(array_tmp)

        if number_of_members == 0:
            return False

        capacity = array_tmp[0][0]  # first record and first column (only teammax)
        if number_of_members == capacity:
            return True
        return False


def get_id_by_inv_code(inv_code: str) -> Optional[int]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT team_id FROM team WHERE invite_code = %s", (inv_code,))
        team_id = cur.fetchone()[0]
    return team_id


def add_invite_code(team_id: int, invite_code: str):
    with Curr_with_conn() as cur:
        cur.execute("UPDATE team SET invite_code = %s WHERE team_id = %s;", (invite_code, team_id,))


def get_cipher_game_id_from_team(team_id: int) -> Optional[int]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT cgt.cipher_game_id FROM cipher_game_team cgt "
                    "WHERE cgt.team_id = %s;", (team_id,))
        result = cur.fetchone()
        if result is None:
            return None
        return result[0]


def get_team_members(team_id: int) -> List[Person]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT p.* FROM person p "
                    "JOIN team_member tm on tm.person_id = p.person_id "
                    "WHERE tm.team_id = %s;", (team_id,))
        people = cur.fetchall()
        return [person_from_db_row(x) for x in people]

def is_team(team_id: int) -> bool:
    with Curr_with_conn() as cur:
        cur.execute("SELECT t.* FROM team t;", (team_id,))
        team = cur.fetchall()
        return bool(team)


def edit_team(team_id: int, edits: EditTeam) -> Optional[Team]:
    team = get_team_info(team_id)
    if team is None:
        return None

    team.edit(edits)
    return team
