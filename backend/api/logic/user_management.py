from db_funcs.personFuncs import *
from routes.person import Person
from .utility import hash_password, generate_new_access_token


def create_temporary_user(username: str) -> Optional[Person]:
    new_user = Person(nickname=username, session_cookie=generate_new_access_token())
    id = insertPerson(new_user)
    if id is None:
        return None

    new_user.person_id = id
    return new_user


def create_user(username: str, email: str, password: str) -> Optional[Person]:
    new_user = Person(nickname=username, mail=email, password=hash_password(username, password),
                      session_cookie=generate_new_access_token())
    id = insertPerson(new_user)
    if id is None:
        return None
    new_user.person_id = id
    return new_user


def login(username: str, password: str) -> Optional[Person]:
    hash = hash_password(username, password)
    found_person = getPersonByCredentials(username, hash)
    if found_person is not None:
        # Update access token and return it together with the person
        found_person.session_cookie = generate_new_access_token()
        # Update the person in database
        updatePerson(found_person.person_id, found_person)

    return found_person


def get_user_by_token(token: str) -> Optional[Person]:
    return getPersonByAccessToken(token)


def get_user_by_username(username: str) -> Optional[Person]:
    return getPersonByUsername(username)
