from db_funcs import *
from db_funcs.teamFuncs import *


class Stat:
    team_id: int
    team_name: str
    score: int
    time: float
    final_score: int
    final_time: float

    def __self__(self, team_id: int, team_name: str, cipher_game_id: int):
        self.team_id = team_id
        self.team_name = team_name
        self.score = get_score(cipher_game_id, team_id)
        self.time = get_time(cipher_game_id, team_id)
        self.final_score = self.score - get_score_penalization(cipher_game_id, team_id)
        self.final_time = self.time + get_time_penalization(cipher_game_id, team_id)

    def __lt__(self, other):
        if self.final_score == other.final_score:
            return self.final_time < other.final_time
        return self.final_score < other.final_score
