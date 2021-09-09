from random import *


class word_generator():

    path = r'words.txt'

    def get_word(self):
        path = open(self.path, "r")
        line_arr = path.readlines()
        path.close()
        line = randint(0, len(line_arr) - 1)
        splited_line = line_arr[line].split(' ')
        column = randint(0, len(splited_line) - 1)
        return splited_line[column]

