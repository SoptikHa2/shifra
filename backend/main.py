# code inspirated by (https://www.youtube.com/watch?v=OOSl2jeAA5U)
# safe to use, code is under unlicense license (https://unlicense.org)

from fastapi import FastAPI, Response
from logger import *
from api.endpoints import user, misc, game, team
from db_funcs import *


try:
    DB_conn.initialize()
except:
    print('database info is not correct or wrong database was chosen')
    logger.critical("Something went horribly wrong, server will not start")
    exit(-1)


logger.initialize()
logger.info("server start")
app = FastAPI()
app.include_router(user.router)
app.include_router(misc.router)
app.include_router(game.router)
app.include_router(team.router)
