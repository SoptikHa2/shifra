# code from (https://www.youtube.com/watch?v=OOSl2jeAA5U)
# safe to use, code is under unlicense license (https://unlicense.org)

from fastapi import FastAPI

import cipherFuncs
import config
import teamFuncs
import cipherGameFuncs
import personFuncs
import hintFuncs
import attemptFuncs

connection = config.DB_conn
config.DB_conn.chooseDB(connection)  # change db (dev, prod, or local) -> set up in config.py

app = FastAPI()
app.include_router(teamFuncs.router)
app.include_router(cipherFuncs.router)
app.include_router(cipherGameFuncs.router)
app.include_router(personFuncs.router)
app.include_router(hintFuncs.router)
app.include_router(attemptFuncs.router)


@app.get('/api/teamVal/getLastVal')  # just for test (that result needs to be returned by insertTeam)
def getlastValue():
    with config.DB_conn.getConn(connection):
        with config.DB_conn.getCursor(connection) as cur:
            cur.execute("SELECT * FROM team_team_id_seq;")
            result = cur.fetchone()[0]
            return result


@app.get('/')
def root():
    return {"message": "root"}
