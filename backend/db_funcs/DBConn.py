import json
from configparser import ConfigParser
import psycopg2
import psycopg2.extras


class DB_conn:
    conn = None
    INI_FILENAME = 'database.ini'
    SETTINGS_FILENAME = 'settings.json'

    def __init__(self):
        self.chooseDB()
        self.conn.autocommit = True

    def chooseDB(self):
        with open(self.SETTINGS_FILENAME, 'r') as dbFile:
            data = dbFile.read()

        obj = json.loads(data)

        if not DB_conn.create_connection(self, self.INI_FILENAME, obj['database']):
            raise Exception()

    def create_connection(self, data_file_path, db_name):
        if len(data_file_path) <= 0 and len(db_name) <= 0:
            return False

        config_parser = ConfigParser()
        config_parser.read(data_file_path)

        if config_parser.has_section(db_name):
            header = config_parser[db_name]
            self.conn = psycopg2.connect(dbname=header['database'], user=header['user'], password=header['password'], host=header['host'])
            return True
        return False

    def getConn(self):
        return self.conn

    def getCursor(self):
        return DB_conn.getConn(self).cursor(cursor_factory=psycopg2.extras.DictCursor)

    def closeConnection(self):
        self.conn.close()
