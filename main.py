from fastapi import FastAPI
import psycopg2
import psycopg2.extras


DB_HOST = "soptik.tech"
DB_NAME = "shifra-dev"
DB_USER = "marek"
DB_PASS = "mesicniPrsten"

conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST)

app = FastAPI()


@app.post("/insert/{name}/{inv_code}")
def write(name: str, inv_code: str):
    with conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
            if cur.execute("INSERT INTO team (name, invite_code, approved) VALUES(%s, %s, false);", (name, inv_code)):
                return {"message": "success"}
            else:
                return {"message": "fail"}


@app.get('/read/{team_id}')
def read(team_id: int):
    with conn:
        with conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cur:
            cur.execute("SELECT * FROM team where team_id = %s;", (team_id,))

            result = cur.fetchone()
            if result:
                if result['approved']:
                    return {"message": result['name'] + ', ' + result['invite_code'] + ', approved'}
                else:
                    return {"message": result['name'] + ', ' + result['invite_code'] + ', not approved'}
            else:
                return {"message": "not found"}


@app.get('/')
def root():
    return {"message": "root"}
