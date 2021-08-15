# code inspirated by (https://www.youtube.com/watch?v=OOSl2jeAA5U)
# safe to use, code is under unlicense license (https://unlicense.org)

from fastapi import FastAPI

from api.endpoints import user, misc, game
from db_funcs import *

try:
    DB_conn.initialize()
except:
    print('database info is not correct or wrong database was chosen')
    exit(-1)

app = FastAPI()
app.include_router(user.router)
app.include_router(misc.router)
app.include_router(game.router)

