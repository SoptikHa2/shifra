from . import DBConn
from .DBConn import *
from fastapi import APIRouter
from routes import Person, person_from_db_row
import hashlib
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
    """

    :param person_id: id of prson, who should be updated
    :param updated_person: updated object
    :return: --What to return? consult with Pavel--
    """
    try:
        with Curr_with_conn() as cur:
            cur.execute("UPDATE person SET is_root = %s, nickname = %s, session_cookie = %s, mail = %s, password = %s WHERE person_id = %s;",
                        (updated_person.is_root, updated_person.nickname, updated_person.session_cookie, updated_person.mail, updated_person.password, person_id))
    except:
        return {"result": "error"}

    return {"result": "updated"}


def deletePerson(person_id: int):
    """

    :param team_id: id of team, which should be deleted
    :return: --What to return? consult with Pavel--
    """
    try:
        with Curr_with_conn() as cur:
            cur.execute("DELETE FROM person WHERE person_id = %s;", (person_id,))

    except:
        return {"result": "error"}

    return {"result": "removed"}

def getPerson(person_id: int):
    """

    :param person_id: id of wanted person
    :return: person returned by select
    """
    try:
        with Curr_with_conn() as cur:
            cur.execute("SELECT * FROM person WHERE person_id = %s;", (person_id,))
            result = cur.fetchall()
    except:
        return {"result": "error"}

    return result


def getPersons():
    """

    :return: persons returned by select
    """
    try:
        with Curr_with_conn() as cur:
            cur.execute("SELECT * FROM person;")
            result = cur.fetchall()
    except:
        return {"result": "error"}
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
