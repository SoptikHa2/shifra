# code inspirated by (https://www.youtube.com/watch?v=OOSl2jeAA5U)
# safe to use, code is under unlicense license (https://unlicense.org)

from fastapi import FastAPI

from api.endpoints import user
from api.endpoints import misc
from db_funcs import *

try:
    connection = DB_conn()
    if connection.conn is None:
        raise Exception()
except:
    print('database info is not correct or wrong database was chosen')
    exit(-1)

cipherFuncs.connection = connection
teamFuncs.connection = connection
cipherGameFuncs.connection = connection
personFuncs.connection = connection
hintFuncs.connection = connection
attemptFuncs.connection = connection

app = FastAPI()
app.include_router(user.router)
app.include_router(misc.router)

@app.get('/')
def root():
    return {"version": "1"}
