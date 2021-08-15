import hashlib
import uuid


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

