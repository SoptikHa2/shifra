import hashlib

import routes


def hash_password(username: str, password: str) -> bytes:
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
        salt,  # Salt in order to evade rainbow tables
        100000  # Do it few times in order to be slow
    )
    return key


def is_root(session_cookie: str) -> bool:
    """
    Checks whether given user is root
    :param session_cookie: Session cookie of queried user
    """
    pass


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
