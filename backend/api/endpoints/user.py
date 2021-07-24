from fastapi import APIRouter
from routes import Person
from api.logic.utility import hash_password

router = APIRouter()


@router.post('/api/login')
def login(username: str, password: str):
    """
    Try to login as given user. It is impossible to log into anonymous (temporary) user account.

    This sets cookies on successful login automatically.

    :param username: Username to use
    :param password: Password to use
    :return 200 OK if login was successful, otherwise return 401 Unauthorized.
    """
    pass
