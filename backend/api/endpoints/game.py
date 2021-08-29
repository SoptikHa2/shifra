from fastapi import Response, Cookie

from .user import user_management
from db_funcs import *
from routes import *

router = APIRouter()


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
        return None

    if is_visible(cipher_game_id) or (user is not None and is_staff(cipher_game_id, user.person_id)) or (user is not None and user.is_root):
        response.status_code = 200
        return game.strip()
    else:
        response.status_code = 401
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

    stripped_ciphers = [x.strip_assignment() for x in all_ciphers if is_cipher_visible_to_team(x, user_team.team_id, get_cipher_game_id_from_team(user_team.team_id))]
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
        return None
    else:
        response.status_code = 200
        result = [(x.strip(), None if user is None else get_team_by_game_and_user(x.cipher_game_id, user.person_id)) for x in games]
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
    game_id = insert_cipher_game(cipher_game)
    set_game_admin(game_id, user.person_id)
    return game_id
