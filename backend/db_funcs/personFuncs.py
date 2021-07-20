from .config import *
from fastapi import APIRouter
from routes import Person


router = APIRouter()

connection = DB_conn
DB_conn.chooseDB(connection)


@router.post("/api/person")  # return id of inserted item
def insertPerson(newPerson: Person):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            success = cur.execute("INSERT INTO person(is_root, nickname, session_cookie, mail, password) VALUES(%s, %s, %s, %s, %s);", (newPerson.is_root, newPerson.nickname, newPerson.session_cookie, newPerson.mail, newPerson.password))
            return {"result": success}


@router.put("api/person/{person_id}")
def updatePerson(person_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            success = cur.execute("....................")   # what should be updated?
            return {"result": success}


@router.delete("/api/person/{person_id}")  # return id of inserted item
def deletePerson(person_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("DELETE FROM person WHERE person_id=%s;", (person_id,))
            return {"result": "removed"}


@router.get("/api/person/{person_id}")
def getPerson(person_id: int):
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM person WHERE person_id = %s;", (person_id,))
            result = cur.fetchall()
            return result


@router.get("/api/person")
def getPersons():
    with DB_conn.getConn(connection):
        with DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM person;")
            result = cur.fetchall()
            return result
