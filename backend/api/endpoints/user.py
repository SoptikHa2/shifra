from fastapi import APIRouter, Response, Cookie
from typing import Optional

from api.logic import user_management
from api.logic.utility import strip_user_details
from routes import Person

router = APIRouter()


@router.post('/api/login')
def login(username: str, password: str, response: Response) -> Optional[Person]:
    """
    Try to login as given user. It is impossible to log into anonymous (temporary) user account.

    This sets cookies on successful login automatically.

    :param username: Username to use
    :param password: Password to use
    :return 200 OK if login was successful, otherwise return 401 Unauthorized.
    """
    logged_in_person = user_management.login(username, password)
    if logged_in_person is not None:
        # Set cookies
        response.set_cookie(key='session_cookie', value=logged_in_person.session_cookie, secure=True, samesite='Strict', httponly=True)
        response.status_code = 200
        # Strip logged_in_person details
    else:
        response.status_code = 401

    return strip_user_details(logged_in_person)


@router.get('/api/checkUsernameAvailability')
def check_username_availability(username: str) -> bool:
    """
    Check whether username is available, or already taken.
    :param username: Username to check
    :return: Boolean indicating whether username is available
    """
    user = user_management.get_user_by_username(username)
    return user is None


@router.post('/api/register_temporary')
def register(username: str, response: Response) -> Optional[Person]:
    """
    Register given user as anonymous (temporary) user account.

    This sets login cookie automatically.
    :param username: Username to be registered
    :return: Given user, if successful. Also returns 201 created if successful, or 409 conflict, if username already exists.
    """
    new_user = user_management.create_temporary_user(username)
    if new_user is None:
        response.status_code = 409
    else:
        response.set_cookie(key='session_cookie', value=new_user.session_cookie, secure=True, samesite='Strict', httponly=True)
        response.status_code = 201

    return strip_user_details(new_user)


@router.post('/api/register')
def register(username: str, email: str, password: str, response: Response) -> Optional[Person]:
    """
    Register permanent user account.

    This fails if username already exists with 409 conflict.

    If user is already logged in, this will attempt to upgrade
    temporary user account. This thus fails, if username does *not* match
    given session cookie, or the account is already permanent.
    :param username: User username (must be unique unless upgrading into permanent user account)
    :param email: User email
    :param password: User password
    :return: 200 OK if successful, otherwise some error code (409 conflict if username already exists).
    If successful, also returns user structure.
    """
    pass


@router.post('/api/logout')
def logout(response: Response) -> None:
    response.delete_cookie(key='session_cookie')


@router.get('/api/userInfo')
def user_info(session_cookie: Optional[str] = Cookie(None)) -> Optional[Person]:
    """
    Get info about currently logged in user.
    """
    return strip_user_details(user_management.get_user_by_token(session_cookie))
