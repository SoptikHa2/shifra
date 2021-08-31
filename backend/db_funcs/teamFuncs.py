import sys
from typing import Optional

sys.path.append('../')
from .DBConn import *
from fastapi import APIRouter

from routes import Team, team_from_db_row, Person, person_from_db_row
from typing import Optional, List


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
    return team_id


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


def get_teams_by_member(member_id: int) -> Team:
    with Curr_with_conn() as cur:
        cur.execute("SELECT tm.team_id FROM team_member tm WHERE person_id = %s;", (member_id,))
        result = cur.fetchall()
    return [team_from_db_row(x) for x in result]


def get_team_by_member_and_cipher(member_id: int, cipher_id: int) -> Team:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM team WHERE team_id = "
                    "( SELECT team_id FROM team_member NATURAL JOIN cipher_game_team JOIN cipher USING ( cipher_game_id) "
                    "WHERE person_id = %s AND cipher_id = %s);", (member_id, cipher_id,))
        result = cur.fetchone()
    if result is None:
        return result
    return team_from_db_row(result)
