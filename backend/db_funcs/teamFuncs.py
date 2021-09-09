from typing import Optional

from .DBConn import *
from fastapi import APIRouter
from routes import Team, team_from_db_row, Person, person_from_db_row, EditTeam
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
                    "WHERE tm.person_id = %s AND t.cipher_game_id = %s;",
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
        cur.execute("SELECT t.cipher_game_id FROM team t WHERE t.team_id = %s;", (team_id,))
        result = cur.fetchone()[0]

    return int(result)


def is_full(team_id: int) -> bool:
    with Curr_with_conn() as cur:
        cur.execute("select t.team_id, (cg.teammax - COUNT(tm)) as remaining_capacity "
                    "from team t "
                    "join team_member tm using (team_id) "
                    "join cipher_game cg using (cipher_game_id) "
                    "where t.team_id = %s "
                    "group by t.team_id, cg.teammax ", (team_id, ))
        result = cur.fetchone()
        return result[1] == 0


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
        cur.execute("SELECT t.cipher_game_id FROM team t "
                    "WHERE t.team_id = %s;", (team_id,))
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
