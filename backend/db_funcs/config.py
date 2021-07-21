import json
from configparser import ConfigParser
import psycopg2
import psycopg2.extras
from psycopg2._psycopg import connection


class DB_conn:
    conn = ""

    def __init__(self):
        self.chooseDB()

    def chooseDB(self):
        with open('absolute path to settings.json', 'r') as dbFile:
            data = dbFile.read()

        obj = json.loads(data)

        if obj['database'] == 'dev':
            DB_conn.create_connection(self, 'database.ini', 'dev')

        elif obj['database'] == 'prod':
            DB_conn.create_connection(self, 'database.ini', 'prod')

        elif obj['database'] == 'local':
            DB_conn.create_connection(self, 'database.ini', 'local')

        else:
            return False

        return True

    def create_connection(self, data_file_path, db_name):
        if len(data_file_path) <= 0 and len(db_name) <= 0:
            return False

        config_parser = ConfigParser()
        config_parser.read(data_file_path)

        if config_parser.has_section(db_name):
            header = config_parser[db_name]
            self.conn = psycopg2.connect(dbname=header['database'], user=header['user'], password=header['password'], host=header['host'])

    def getConn(self):
        return self.conn

    def getCursor(self):
        return DB_conn.getConn(self).cursor(cursor_factory=psycopg2.extras.DictCursor)

    def closeConnection(self):
        self.conn.close()
