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
            #self.DB_HOST = ""
            #self.DB_NAME = ""
            #self.DB_USER = ""
            #self.DB_PASS = ""

        elif obj['database'] == 'prod':
            DB_conn.create_connection(self, 'database.ini', 'prod')
            #self.DB_HOST = ""
            #self.DB_NAME = ""
            #self.DB_USER = ""
            #self.DB_PASS = ""

        elif obj['database'] == 'local':
            DB_conn.create_connection(self, 'database.ini', 'local')
            #self.DB_HOST = ""
            #self.DB_NAME = ""
            #self.DB_USER = ""
            #self.DB_PASS = ""

        else:
            return False

        return True

    def create_connection(self, data_file_path, db_name):
        if len(data_file_path) <= 0 and len(db_name) <= 0:
            return False

        config_parser = ConfigParser()
        config_parser.read(data_file_path)

        if config_parser.has_section(db_name):
            config_parameters = config_parser.items(db_name)
            db_conn_dict = {}
            for config_param in config_parameters:
                key = config_param[0]
                value = config_param[1]
                db_conn_dict[key] = value
            self.conn = psycopg2.connect(**db_conn_dict)

    def changeConn(self):
        self.conn = psycopg2.connect(dbname=self.DB_NAME, user=self.DB_USER, password=self.DB_PASS, host=self.DB_HOST)

    def getConn(self):
        return self.conn

    def getCursor(self):
        return DB_conn.getConn(self).cursor(cursor_factory=psycopg2.extras.DictCursor)
