import json
from configparser import ConfigParser
from psycopg2 import pool


class DB_conn:
    min_of_conn = 5
    max_of_conn = 10
    INI_FILENAME = 'database.ini'
    SETTINGS_FILENAME = 'settings.json'
    __conn_pool = None

    @classmethod
    def initialize(cls):
        with open(cls.SETTINGS_FILENAME, 'r') as dbFile:
            data = dbFile.read()
            obj = json.loads(data)

            if len(cls.INI_FILENAME) <= 0 and len(obj['database']) <= 0:
                return False

            config_parser = ConfigParser()
            config_parser.read(cls.INI_FILENAME)
        #
            if config_parser.has_section(obj['database']):
                header = config_parser[obj['database']]
                cls.__conn_pool = pool.SimpleConnectionPool(cls.min_of_conn,
                                                           cls.max_of_conn,
                                                           database=header['database'],
                                                           user=header['user'],
                                                           password=header['password'],
                                                           host=header['host'])
                return True
            return False

    @classmethod
    def get_conn(cls):
        return cls.__conn_pool.getconn()

    @classmethod
    def close_conn(cls, connection):
        cls.__conn_pool.putconn(connection)

    @classmethod
    def close_all_connections(cls):
        cls.__conn_pool.closeall()


class Curr_with_conn:
    def __init__(self):
        self.conn = None
        self.cursor = None

    def __enter__(self):
        self.conn = DB_conn.get_conn()
        self.cursor = self.conn.cursor()
        return self.cursor

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_val is not None:
            self.conn.rollback()
        else:
            self.cursor.close()
            self.conn.commit()
        DB_conn.close_conn(self.conn)
