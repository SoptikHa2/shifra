from .config import *
from fastapi import APIRouter
from routes import Person


router = APIRouter()

connection = ""


@router.post("/api/person")  # return id of inserted item
def insertPerson(newPerson: Person):
    """

    :param newPerson: person, that should be inserted into database
    :return: person_id - id of inserted person in database
    """
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("INSERT INTO person(is_root, nickname, session_cookie, mail, password) VALUES(%s, %s, %s, %s, %s);", (newPerson.is_root, newPerson.nickname, newPerson.session_cookie, newPerson.mail, newPerson.password))
            cur.execute("SELECT * FROM person_person_id_seq;")
            person_id = cur.fetchone()[0]
    return {"result": person_id}


@router.put("/api/person/{person_id}")
def updatePerson(person_id: int, updated_person: Person):
    """

    :param person_id: id of prson, who should be updated
    :param updated_person: updated object
    :return: --What to return? consult with Pavel--
    """
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("UPDATE person SET is_root=%s, nickname=%s, session_cookie=%s, mail=%s, password=%s WHERE person_id=%s;",
                        (updated_person.is_root, updated_person.nickname, updated_person.session_cookie, updated_person.mail, updated_person.password, person_id))
    return {"result": "updated"}


@router.delete("/api/person/{person_id}")  # return id of inserted item
def deletePerson(person_id: int):
    """

    :param team_id: id of team, which should be deleted
    :return: --What to return? consult with Pavel--
    """
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("DELETE FROM person WHERE person_id=%s;", (person_id,))
    return {"result": "removed"}


@router.get("/api/person/{person_id}")
def getPerson(person_id: int):
    """

    :param person_id: id of wanted person
    :return: person returned by select
    """
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM person WHERE person_id = %s;", (person_id,))
            result = cur.fetchall()
    return result


@router.get("/api/person")
def getPersons():
    """

    :return: persons returned by select
    """
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM person;")
            result = cur.fetchall()
    return result
