from .DBConn import *
from fastapi import APIRouter
from routes import Person, person_from_db_row
from typing import Optional

router = APIRouter()


def insertPerson(newPerson: Person) -> Optional[int]:
    """
    :param newPerson: person, that should be inserted into database
    :return: person_id - id of inserted person in database, or None if
    username already exists in database
    """
    with Curr_with_conn() as cur:
        # Check if there already is the same username
        cur.execute("SELECT * FROM person where nickname = %s;", (newPerson.nickname,))
        result = cur.fetchone()
        if result is not None:
            return None
        # If not, create new user
        cur.execute("INSERT INTO person(is_root, nickname, session_cookie, mail, password) VALUES(%s, %s, %s, %s, %s) RETURNING person_id;",
                    (newPerson.is_root, newPerson.nickname, newPerson.session_cookie, newPerson.mail, newPerson.password))
        person_id = cur.fetchone()[0]
        return person_id


def updatePerson(person_id: int, updated_person: Person):
    with Curr_with_conn() as cur:
        cur.execute("UPDATE person SET is_root = %s, nickname = %s, session_cookie = %s, mail = %s, password = %s WHERE person_id = %s;",
                    (updated_person.is_root, updated_person.nickname, updated_person.session_cookie, updated_person.mail, updated_person.password, person_id))


def deletePerson(person_id: int):
    with Curr_with_conn() as cur:
        cur.execute("DELETE FROM person WHERE person_id = %s;", (person_id,))

def getPerson(person_id: int):
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM person WHERE person_id = %s;", (person_id,))
        result = cur.fetchall()
    return result


def getPersons():
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM person;")
        result = cur.fetchall()
    return result


def getPersonByAccessToken(access_token: str) -> Optional[Person]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM person WHERE session_cookie = %s;", (access_token,))
        result = cur.fetchone()
        if result is None:
            return None
        return person_from_db_row(result)


def getPersonByCredentials(username: str, password_hash: str) -> Optional[Person]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM person WHERE nickname = %s AND password = %s;", (username, password_hash,))
        result = cur.fetchone()
        if result is None:
            return None
        return person_from_db_row(result)


def getPersonByUsername(username: str) -> Optional[Person]:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM person where nickname = %s;", (username,))
        result = cur.fetchone()
        if result is None:
            return None
        return person_from_db_row(result)


def is_in_game(cipher_game_id: int, team_id: int) -> bool:
    with Curr_with_conn() as cur:
        cur.execute("SELECT * FROM cipher_game_team cgt WHERE cgt.cipher_game_id = %s AND cgt.team_id;", (cipher_game_id, team_id))
        result = cur.fetchone()
        return bool(result)


def get_users_team(cipher_game_id: int, user_id: int) -> Optional[int]:
    with Curr_with_conn() as cur:
        cur.execute(
            "SELECT t.* FROM team t JOIN cipher_game_team cgt ON cgt.team_id = t.team_id AND cgt.cipher_game_id = %s JOIN team_member tm ON tm.team_id = t.team_id AND tm.person_id = %s ;",
            (cipher_game_id, user_id))
        result = cur.fetchone()
        return result
