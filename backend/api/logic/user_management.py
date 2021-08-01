from typing import Optional

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


def login(username: str, password: str) -> Optional[Person]:
    hash = hash_password(username, password)
    foundPerson = getPersonByCredentials(username, hash)
    if foundPerson is not None:
        # Update access token and return it together with the person
        foundPerson.session_cookie = generate_new_access_token()
        # Update the person in database
        updatePerson(foundPerson.person_id, foundPerson)

    return foundPerson


def get_user_by_token(token: str) -> Optional[Person]:
    return getPersonByAccessToken(token)


def get_user_by_username(username: str) -> Optional[Person]:
    return getPersonByUsername(username)
def is_admin(session_cookie: str, cipher_gam_id: int) -> bool:
    """
    Checks whether given user is administrator of given cipher game
    :param session_cookie: Session cookie of queried user
    :param cipher_gam_id: ID of the cipher game
    """
    pass


def is_member_of_team(session_cookie: str, team_id: int) -> bool:
    """
    Checks whether given user is member of given team
    :param session_cookie: Session cookie of queried user
    :param team_id ID of given team
    """
    pass


def is_ciphergame_visible(session_cookie: str, cipher_game_id: int) -> bool:
    """
    Checks whether cipher game is visible for given user.

    User has to be in a team that is signed up to the game, root, or an administrator
    of the game.
    :param session_cookie: Session cookie of queried user
    :param cipher_game_id: ID of the cipher game
    """
    pass


def is_cipher_visible(session_cookie: str, cipher_id: int) -> bool:
    """
    Checks whether cipher is visible for given user.

    User has to be in a team that has signed up to the cipher game *and* the
    team must have successfully completed all prerequisites of the cipher.

    The cipher is always visible to root users or administrator of the game.
    :param session_cookie: Session cookie of the queried user
    :param cipher_id: ID of the cipher
    """
    pass


def get_hint_status(session_cookie: str, hint_id: int) -> routes.HintStatus:
    """
    Returns hint status for given user.

    It is Invisible if user does not have access to the cipher of the hint.
    It is Locked if team didn't buy the cipher yet, otherwise it is Unlocked.
    :param session_cookie: Session cookie of queried user
    :param hint_id: ID of the hint
    """
    pass
