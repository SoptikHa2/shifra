import logging


class logger:

    @classmethod
    def initialize(cls):
        logging.basicConfig(filename="logger_test.log",
                            format='%(asctime)s | %(message)s',
                            filemode='w',
                            level=logging.NOTSET)
        # logging.getLogger().setLevel(logging.NOTSET)

    # @classmethod
    # def getLog(cls):
    #     return logging.getLogger()

    @classmethod
    def info(cls, msg: str):
        logging.getLogger().info("INFO: " + msg)

    @classmethod
    def warning(cls, msg: str):
        logging.getLogger().warning("WARNING: " + msg)

    @classmethod
    def critical(cls, msg: str):
        logging.getLogger().critical("CRITICAL: " + msg)
