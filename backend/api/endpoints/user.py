import sys

from fastapi import APIRouter, Response, Cookie
from typing import Optional
sys.path.append('../../')
from logger import *
from pydantic import BaseModel

from api.logic import user_management
from routes import Person

router = APIRouter()


class login_post(BaseModel):
    username: str
    password: str


class register_temp_post(BaseModel):
    username: str


class register_post(BaseModel):
    username: Optional[str]
    email: str
    password: str


@router.post('/api/auth/login')
def login(credentials: login_post, response: Response) -> Optional[Person]:
    """
    Try to login as given user. It is impossible to log into anonymous (temporary) user account.

    This sets cookies on successful login automatically.

    :param username: Username to use
    :param password: Password to use
    :return 200 OK if login was successful, otherwise return 401 Unauthorized.
    """
    logged_in_person = user_management.login(credentials.username, credentials.password)
    if logged_in_person is not None:
        # Set cookies
        response.set_cookie(key='session_cookie', value=logged_in_person.session_cookie, secure=True, samesite='Strict',
                            httponly=True)
        response.status_code = 200
        # Strip logged_in_person details
        logged_in_person.strip()
    else:
        response.status_code = 401
        logger.warning(login.__name__ + " /api/auth/login (POST) / ERROR CODE " + str(response.status_code) + ": Bad login")

    return logged_in_person


@router.get('/api/auth/checkUsernameAvailability')
def check_username_availability(username: str) -> bool:
    """
    Check whether username is available, or already taken.
    :param username: Username to check
    :return: Boolean indicating whether username is available
    """
    user = user_management.get_user_by_username(username)
    return user is None


@router.post('/api/auth/temporaryRegister')
def register(credentials: register_temp_post, response: Response) -> Optional[Person]:
    """
    Register given user as anonymous (temporary) user account.

    This sets login cookie automatically.
    :param username: Username to be registered
    :return: Given user, if successful. Also returns 201 created if successful, or 409 conflict, if username already exists.
    """
    new_user = user_management.create_temporary_user(credentials.username)
    if new_user is None:
        response.status_code = 409
        logger.info(register.__name__ + " /api/auth/temporaryRegister (POST) / ERROR CODE " + str(response.status_code) + ": temporary user was not created")
    else:
        response.set_cookie(key='session_cookie', value=new_user.session_cookie, secure=True, samesite='Strict',
                            httponly=True)
        response.status_code = 201
        new_user.strip()
    return new_user


@router.post('/api/auth/register')
def register(credentials: register_post, response: Response, session_cookie: Optional[str] = Cookie(None)) -> Optional[
    Person]:
    """
    Register permanent user account.

    This fails if username already exists with 409 conflict.

    If user is already logged in, this will attempt to upgrade
    temporary user account. This thus fails, if the account is already permanent.
    :param username: User username (must be unique unless upgrading into permanent user account)
    :param email: User email
    :param password: User password
    :return: 201 if brand new user was registered, 200 if user was upgraded, 409 if name collision caused failure
    to register brand new user and 400 if user is logged in, but upgrade isn't possible.
    If successful, this also returns user structure.
    """

    # Check if user is already logged in
    logged_in_user = user_management.get_user_by_token(session_cookie)

    if logged_in_user is None:
        # Username must not be None
        if credentials.username is None:
            response.status_code = 400
            logger.info(register.__name__ + " /api/auth/register (POST) / ERROR CODE " + str(response.status_code) + ": empty username")
            return None

        # Just register the user, if possible
        new_user = user_management.create_user(credentials.username, credentials.email, credentials.password)
        if new_user is None:
            response.status_code = 409
            logger.info(register.__name__ + " /api/auth/register (POST) / ERROR CODE " + str(response.status_code) + ": user " + credentials.username + " already exists")
            return None
        else:
            response.status_code = 201
            new_user.strip()
            return new_user
    else:
        # User already exists, check if it is temp account
        if logged_in_user.mail is not None and logged_in_user.password is not None:
            # User can log in! It's not temporary account.
            response.status_code = 400
            logged_in_user.strip()
            return logged_in_user
        # User already exists and it is temp account. Provided username will be ignored.
        # Upgrade user account.
        logged_in_user.mail = credentials.email
        logged_in_user.password = user_management.hash_password(logged_in_user.nickname, credentials.password)
        user_management.updatePerson(logged_in_user.person_id, logged_in_user)
        logged_in_user.strip()
        return logged_in_user


@router.post('/api/auth/logout')
def logout(response: Response) -> None:
    response.delete_cookie(key='session_cookie')


@router.get('/api/auth/userInfo')
def user_info(response: Response, session_cookie: Optional[str] = Cookie(None)) -> Optional[Person]:
    """
    Get info about currently logged in user.
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 404
        logger.info(user_info.__name__ + " /api/auth/logout (GET) / ERROR CODE " + str(response.status_code) + ": user does not exist (user_info)")
    else:
        user.strip()
    return user
