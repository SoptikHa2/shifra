import hashlib
import uuid
from typing import Optional

from routes.person import Person


def hash_password(username: str, password: str) -> str:
    """
    Hash and salt user password
    :param username: User username, used for salting
    :param password: User password to be hashed
    :return: Hashed and salted password
    """
    salt = username + "__SHIFRA" + username
    key = hashlib.pbkdf2_hmac(
        'sha256',  # Use sha256
        password.encode('utf-8'),  # Hash password as bytes
        salt.encode('utf-8'),  # Salt in order to evade rainbow tables
        100000  # Do it few times in order to be slow
    )
    return str(key)


def generate_new_access_token() -> str:
    return uuid.uuid4().hex


def strip_user_details(user: Optional[Person]) -> Optional[Person]:
    """
    Strip details from user, so that client does not learn
    everything about inner details. One does not need to know
    ID, password hash or session cookie.

    :param user: Person to strip
    :return: Stripped person structure
    """
    if user is None:
        return None

    user.person_id = 0
    user.session_cookie = None
    user.password = None
    return user
