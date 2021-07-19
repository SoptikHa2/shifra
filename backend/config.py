import json

import psycopg2
import psycopg2.extras
from psycopg2._psycopg import connection


class DB_conn:
    DB_HOST = ""
    DB_NAME = ""
    DB_USER = ""
    DB_PASS = ""
    conn: connection

    def __init__(self):
        self.chooseDB()

    def chooseDB(self):
        with open('insert absolute path to settings.json', 'r') as dbFile:
            data = dbFile.read()

        obj = json.loads(data)

        if obj['database'] == 'dev':
            self.DB_HOST = ""
            self.DB_NAME = ""
            self.DB_USER = ""
            self.DB_PASS = ""

        elif obj['database'] == 'prod':
            self.DB_HOST = ""
            self.DB_NAME = ""
            self.DB_USER = ""
            self.DB_PASS = ""

        elif obj['database'] == 'local':
            self.DB_HOST = ""
            self.DB_NAME = ""
            self.DB_USER = ""
            self.DB_PASS = ""

        else:
            return False

        DB_conn.changeConn(self)
        return True

    def changeConn(self):
        self.conn = psycopg2.connect(dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)

    def getConn(self):
        return self.conn

    def getCursor(self):
        return DB_conn.getConn(self).cursor(cursor_factory=psycopg2.extras.DictCursor)
