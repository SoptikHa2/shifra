-- Remove conflicting tables
DROP TABLE IF EXISTS attempt CASCADE;
DROP TABLE IF EXISTS cipher CASCADE;
DROP TABLE IF EXISTS cipher_game CASCADE;
DROP TABLE IF EXISTS hint CASCADE;
DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS team CASCADE;
DROP TABLE IF EXISTS cipher_game_person CASCADE;
DROP TABLE IF EXISTS cipher_game_team CASCADE;
DROP TABLE IF EXISTS person_team CASCADE;
-- End of removing

CREATE TABLE attempt (
    cipher_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    time TIMESTAMP NOT NULL,
    is_successful BOOLEAN NOT NULL
);
ALTER TABLE attempt ADD CONSTRAINT pk_attempt PRIMARY KEY (cipher_id, team_id);

CREATE TABLE cipher (
    cipher_id SERIAL NOT NULL,
    cipher_game_id INTEGER NOT NULL,
    cipher_cipher_id INTEGER NOT NULL,
    name VARCHAR(256) NOT NULL,
    description VARCHAR(256) NOT NULL,
    solution VARCHAR(256),
    judge VARCHAR(256),
    cipher_file VARCHAR(256),
    img VARCHAR(256),
    success_msg VARCHAR(256) NOT NULL,
    cooldown INTEGER NOT NULL,
    attempts INTEGER,
    score DOUBLE PRECISION NOT NULL,
    reference_solution VARCHAR(256)
);
ALTER TABLE cipher ADD CONSTRAINT pk_cipher PRIMARY KEY (cipher_id);

CREATE TABLE cipher_game (
    cipher_game_id SERIAL NOT NULL,
    cipher_id INTEGER NOT NULL,
    name VARCHAR(256) NOT NULL,
    description VARCHAR(256) NOT NULL,
    visible_from TIMESTAMP NOT NULL,
    deadline_signup TIMESTAMP NOT NULL,
    deadline_event TIMESTAMP NOT NULL,
    capacity INTEGER,
    teammax INTEGER,
    password VARCHAR(256),
    autoapprove BOOLEAN NOT NULL
);
ALTER TABLE cipher_game ADD CONSTRAINT pk_cipher_game PRIMARY KEY (cipher_game_id);
ALTER TABLE cipher_game ADD CONSTRAINT u_fk_cipher_game_cipher UNIQUE (cipher_id);

CREATE TABLE hint (
    hint_id SERIAL NOT NULL,
    cipher_id INTEGER NOT NULL,
    msg VARCHAR(256) NOT NULL,
    img VARCHAR(256),
    hint_file VARCHAR(256),
    score_cost DOUBLE PRECISION NOT NULL,
    time_cost INTEGER NOT NULL
);
ALTER TABLE hint ADD CONSTRAINT pk_hint PRIMARY KEY (hint_id);

CREATE TABLE person (
    person_id SERIAL NOT NULL,
    is_root BOOLEAN NOT NULL,
    nickname VARCHAR(256) NOT NULL,
    session_cookie VARCHAR(256),
    mail VARCHAR(256),
    password VARCHAR(256)
);
ALTER TABLE person ADD CONSTRAINT pk_person PRIMARY KEY (person_id);

CREATE TABLE team (
    team_id SERIAL NOT NULL,
    name VARCHAR(256) NOT NULL,
    invite_code VARCHAR(256) NOT NULL,
    approved BOOLEAN NOT NULL
);
ALTER TABLE team ADD CONSTRAINT pk_team PRIMARY KEY (team_id);

CREATE TABLE cipher_game_person (
    cipher_game_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL
);
ALTER TABLE cipher_game_person ADD CONSTRAINT pk_cipher_game_person PRIMARY KEY (cipher_game_id, person_id);

CREATE TABLE cipher_game_team (
    cipher_game_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL
);
ALTER TABLE cipher_game_team ADD CONSTRAINT pk_cipher_game_team PRIMARY KEY (cipher_game_id, team_id);

CREATE TABLE person_team (
    person_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL
);
ALTER TABLE person_team ADD CONSTRAINT pk_person_team PRIMARY KEY (person_id, team_id);

ALTER TABLE attempt ADD CONSTRAINT fk_attempt_cipher FOREIGN KEY (cipher_id) REFERENCES cipher (cipher_id) ON DELETE CASCADE;
ALTER TABLE attempt ADD CONSTRAINT fk_attempt_team FOREIGN KEY (team_id) REFERENCES team (team_id) ON DELETE CASCADE;

ALTER TABLE cipher ADD CONSTRAINT fk_cipher_cipher_game FOREIGN KEY (cipher_game_id) REFERENCES cipher_game (cipher_game_id) ON DELETE CASCADE;
ALTER TABLE cipher ADD CONSTRAINT fk_cipher_cipher FOREIGN KEY (cipher_cipher_id) REFERENCES cipher (cipher_id) ON DELETE CASCADE;

ALTER TABLE cipher_game ADD CONSTRAINT fk_cipher_game_cipher FOREIGN KEY (cipher_id) REFERENCES cipher (cipher_id) ON DELETE CASCADE;

ALTER TABLE hint ADD CONSTRAINT fk_hint_cipher FOREIGN KEY (cipher_id) REFERENCES cipher (cipher_id) ON DELETE CASCADE;

ALTER TABLE cipher_game_person ADD CONSTRAINT fk_cipher_game_person_cg FOREIGN KEY (cipher_game_id) REFERENCES cipher_game (cipher_game_id) ON DELETE CASCADE;
ALTER TABLE cipher_game_person ADD CONSTRAINT fk_cipher_game_person_p FOREIGN KEY (person_id) REFERENCES person (person_id) ON DELETE CASCADE;

ALTER TABLE cipher_game_team ADD CONSTRAINT fk_cipher_game_team_cg FOREIGN KEY (cipher_game_id) REFERENCES cipher_game (cipher_game_id) ON DELETE CASCADE;
ALTER TABLE cipher_game_team ADD CONSTRAINT fk_cipher_game_team_t FOREIGN KEY (team_id) REFERENCES team (team_id) ON DELETE CASCADE;

ALTER TABLE person_team ADD CONSTRAINT fk_person_team_p FOREIGN KEY (person_id) REFERENCES person (person_id) ON DELETE CASCADE;
ALTER TABLE person_team ADD CONSTRAINT fk_person_team_t FOREIGN KEY (team_id) REFERENCES team (team_id) ON DELETE CASCADE;