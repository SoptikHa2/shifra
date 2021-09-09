from fastapi import Response, Cookie
from typing import Optional

from api.logic import user_management
from db_funcs import *
from routes import *
from logger import *

router = APIRouter()


@router.get('/api/leaderboard/{cipher_game_id}')
def get_leaderboard(cipher_game_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
	Shows leaderboard of specified game

	:param cipher_game_id: Game id to use
	:return 200 everything is OK
	        401 no permissions to see leaderboard
    """

    user = user_management.get_user_by_token(session_cookie)
    if not is_visible(cipher_game_id) and not is_staff(cipher_game_id, user.person_id) and not user.is_root:
        response.status_code = 401
        return None

    return cipherGameFuncs.get_leaderboard(cipher_game_id)


@router.get("/api/game/{cipher_game_id}")
def get_game_by_id(cipher_game_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
	Try show information about given game

	:param cipher_game_id: Game id to use
	:return 200 Everything was OK
	        401 No permissions
	        404 Game doesn't exists
    """
    user = user_management.get_user_by_token(session_cookie)
    game = cipherGameFuncs.get_cipher_game(cipher_game_id)
    if game is None:
        response.status_code = 404
        logger.info(get_game_by_id.__name__ + " /api/game/" + str(cipher_game_id) + " (GET) / ERROR CODE " + str(
            response.status_code) + ": cipher game " + str(cipher_game_id) + " does not exist")
        return None

    if is_visible(cipher_game_id) or (user is not None and is_staff(cipher_game_id, user.person_id)) or (
            user is not None and user.is_root):
        response.status_code = 200
        return game.strip()
    else:
        response.status_code = 401
        logger.warning(get_game_by_id.__name__ + " /api/game/" + str(cipher_game_id) + " (GET) / ERROR CODE " + str(
            response.status_code))
        return None


@router.get("/api/game/{cipher_game_id}/ciphers")
def get_ciphers_for_game(cipher_game_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
    404 -> game not found
    401 -> person not authenticated
    400 -> person not in any team
    """
    user = user_management.get_user_by_token(session_cookie)
    game = cipherGameFuncs.get_cipher_game(cipher_game_id)

    if game is None:
        response.status_code = 404
        return None

    if user is None:
        response.status_code = 401
        return None

    all_ciphers = get_ciphers(cipher_game_id)

    # If user is staff, return everything
    if is_staff(cipher_game_id, user.person_id) or user.is_root:
        ciphers = [x.strip_assignment() for x in all_ciphers]
        # Add solved if applicable
        user_team = get_team_by_game_and_user(game.cipher_game_id, user.person_id)
        if user_team is not None:
            for cip in ciphers:
                cip.solved = is_cipher_solved(cip.cipher_id, user_team.team_id)
        return ciphers

    # Else, return just visible ciphers
    user_team = get_team_by_game_and_user(game.cipher_game_id, user.person_id)

    if user_team is None:
        response.status_code = 400
        return None

    stripped_ciphers = [x.strip_assignment() for x in all_ciphers if is_cipher_visible_to_team(x, user_team.team_id,
                                                                                               get_cipher_game_id_from_team(
                                                                                                   user_team.team_id))]
    for stripped_cipher in stripped_ciphers:
        stripped_cipher.solved = is_cipher_solved(stripped_cipher.cipher_id, user_team.team_id)
    return stripped_ciphers


@router.get("/api/games")
def get_all_games(response: Response, session_cookie: Optional[str] = Cookie(None)) -> [CipherGame]:
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        games = get_visible_games(-1)
    elif user.is_root:
        games = get_all_cipher_games()
    else:
        # Get all games, that are visible to public at the moment,
        # or user is admin of the given game.
        games = get_visible_games(user.person_id)

    if games is None:
        response.status_code = 400
        logger.warning(get_all_games.__name__ + " /api/games (GET) / ERROR CODE " + str(response.status_code))
        return None
    else:
        response.status_code = 200
        result = [(x.strip(), None if user is None else get_team_by_game_and_user(x.cipher_game_id, user.person_id)) for
                  x in games]
    return result


@router.post('/api/game')
def create_game(cipher_game: CipherGame, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
	Creating game
	:param cipher_game ciphergame to create
	:return 200 Everything OK
	        401 Not authorized
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None
    if not user.is_root:
        response.status_code = 401
        return None

    game_id = insert_cipher_game(cipher_game)
    return game_id


@router.post('/api/game/{cipher_game_id}/set_admin/{user_id}')
def set_admin(cipher_game_id: int, user_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
	Add new admin of game
	:param user_id id of new admin
	:return 200 Everything OK
	        401 No permission
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    if not user.is_root:
        response.status_code = 401
        return None

    if not exist_game(cipher_game_id):
        response.status_code = 404
        return None

    if not is_registred(user_id):
        response.status_code = 404
        return None

    set_game_admin(cipher_game_id, user_id)
    return None


@router.get('/api/leaderboard/{cipher_game_id}')
def get_leaderboard(cipher_game_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
	Shows leaderboard of specified game
	:param cipher_game_id: Game id to use
	:return 200 everything is OK
	        401 no permissions to see leaderboard
    """

    user = user_management.get_user_by_token(session_cookie)
    if is_visible(cipher_game_id) or (user is not None and (is_staff(cipher_game_id, user.person_id) or user.is_root)):
        return cipherGameFuncs.get_leaderboard(cipher_game_id)
    else:
        response.status_code = 401
        return None


@router.get('/api/game/{cipher_game_id}/teams')
def get_teams_in_game(cipher_game_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
	Show all teams registered in game with specified id
	:param cipher_game_id: Game id to use
	:return 200 everything is OK
	        401 not visible game
    """
    user = user_management.get_user_by_token(session_cookie)

    if not is_visible(cipher_game_id):
        if user is None:
            response.status_code = 401
            return None
        elif not user.is_root and not is_staff(cipher_game_id, user.person_id):
            response.status_code = 401
            return None

    teams_in_game = cipherGameFuncs.get_all_teams(cipher_game_id)
    return teams_in_game


@router.put('/api/game/{cipher_game_id}')
def edit_game(cipher_game_id: int, cipher_game_edits: EditCipherGame, response: Response,
              session_cookie: Optional[str] = Cookie(None)) -> Optional[CipherGame]:
    """
	Edit of existing game
	:param cipher_game_id id of game to edit
	:param cipher_game edits on game
    :return 200 Everything OK
	        401 Not authorized
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    if not user.is_root and not is_staff(cipher_game_id, user.person_id):
        response.status_code = 401
        return None

    edited_game = cipherGameFuncs.edit_game(cipher_game_id, cipher_game_edits)
    return edited_game


@router.delete('/api/game/{cipher_game_id}')
def delete_game(cipher_game_id: int, response: Response, session_cookie: Optional[str] = Cookie(None)):
    """
	Delete game if user is root
	:return 200 Everything OK
	        401 not root
    """
    user = user_management.get_user_by_token(session_cookie)
    if user is None:
        response.status_code = 401
        return None

    if not user.is_root:
        response.status_code = 401
        return None

    cipherGameFuncs.delete_cipher_game(cipher_game_id)
