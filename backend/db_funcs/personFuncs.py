from . import DBConn
from .DBConn import *
from fastapi import APIRouter
from routes import Person
import hashlib

router = APIRouter()

connection: DBConn = None


def insertPerson(newPerson: Person):
    """

    :param newPerson: person, that should be inserted into database
    :return: person_id - id of inserted person in database
    """
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                hash_object = hashlib.sha256(newPerson.password.encode('utf-8'))
                passHash = hash_object.hexdigest()
                cur.execute("INSERT INTO person(is_root, nickname, session_cookie, mail, password) VALUES(%s, %s, %s, %s, %s) RETURNING person_id;",
                            (newPerson.is_root, newPerson.nickname, newPerson.session_cookie, newPerson.mail, passHash))
                person_id = cur.fetchone()[0]
    except:
        return {"result": "error"}
    return {"result": person_id}


def updatePerson(person_id: int, updated_person: Person):
    """

    :param person_id: id of prson, who should be updated
    :param updated_person: updated object
    :return: --What to return? consult with Pavel--
    """
    try:
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
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
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
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
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
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
        with DB_conn.getConn(connection):
            with DB_conn.getCursor(connection) as cur:
                cur.execute("SELECT * FROM person;")
                result = cur.fetchall()

    except:
        return {"result": "error"}
    return result
