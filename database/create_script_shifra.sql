BEGIN TRANSACTION;

-- Remove conflicting tables
DROP TABLE IF EXISTS attempt CASCADE;
DROP TABLE IF EXISTS cipher CASCADE;
DROP TABLE IF EXISTS cipher_game CASCADE;
DROP TABLE IF EXISTS hint CASCADE;
DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS team CASCADE;
DROP TABLE IF EXISTS cipher_game_admin CASCADE;
DROP TABLE IF EXISTS cipher_game_team CASCADE;
DROP TABLE IF EXISTS team_member CASCADE;
DROP TABLE IF EXISTS hint_used CASCADE;
-- Remove legacy tables
DROP TABLE IF EXISTS cipher_game_person CASCADE;
DROP TABLE IF EXISTS person_team CASCADE;
-- End of removing

CREATE TABLE attempt (
    cipher_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    start_time TIMESTAMP NOT NULL,
    last_attempt_time TIMESTAMP,
    attempt_count INTEGER NOT NULL DEFAULT(0),
    was_success BOOLEAN NOT NULL
);
ALTER TABLE attempt ADD CONSTRAINT pk_attempt PRIMARY KEY (cipher_id, team_id);

CREATE TABLE cipher (
    cipher_id SERIAL NOT NULL,
    cipher_game_id INTEGER NOT NULL,
    req_cipher_id INTEGER NULL,
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
    time_starting_cipher_id INTEGER,
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
    invite_code VARCHAR(256),
    approved BOOLEAN NOT NULL
);
ALTER TABLE team ADD CONSTRAINT pk_team PRIMARY KEY (team_id);

CREATE TABLE cipher_game_admin (
    cipher_game_id INTEGER NOT NULL,
    person_id INTEGER NOT NULL
);
ALTER TABLE cipher_game_admin ADD CONSTRAINT pk_cipher_game_admin PRIMARY KEY (cipher_game_id, person_id);

CREATE TABLE cipher_game_team (
    cipher_game_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL
);
ALTER TABLE cipher_game_team ADD CONSTRAINT pk_cipher_game_team PRIMARY KEY (cipher_game_id, team_id);

CREATE TABLE team_member (
    person_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL
);
ALTER TABLE team_member ADD CONSTRAINT pk_team_member PRIMARY KEY (person_id, team_id);

CREATE TABLE hint_used (
    hint_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL
);
ALTER TABLE hint_used ADD CONSTRAINT pk_hint_used PRIMARY KEY (hint_id, team_id);

ALTER TABLE attempt ADD CONSTRAINT fk_attempt_cipher FOREIGN KEY (cipher_id) REFERENCES cipher (cipher_id) ON DELETE CASCADE;
ALTER TABLE attempt ADD CONSTRAINT fk_attempt_team FOREIGN KEY (team_id) REFERENCES team (team_id) ON DELETE CASCADE;

ALTER TABLE cipher ADD CONSTRAINT fk_cipher_cipher_game FOREIGN KEY (cipher_game_id) REFERENCES cipher_game (cipher_game_id) ON DELETE CASCADE;
ALTER TABLE cipher ADD CONSTRAINT fk_cipher_cipher FOREIGN KEY (req_cipher_id) REFERENCES cipher (cipher_id) ON DELETE CASCADE;

ALTER TABLE cipher_game ADD CONSTRAINT fk_cipher_game_cipher FOREIGN KEY (time_starting_cipher_id) REFERENCES cipher (cipher_id) ON DELETE CASCADE;

ALTER TABLE hint ADD CONSTRAINT fk_hint_cipher FOREIGN KEY (cipher_id) REFERENCES cipher (cipher_id) ON DELETE CASCADE;

ALTER TABLE cipher_game_admin ADD CONSTRAINT fk_cipher_game_admin_cg FOREIGN KEY (cipher_game_id) REFERENCES cipher_game (cipher_game_id) ON DELETE CASCADE;
ALTER TABLE cipher_game_admin ADD CONSTRAINT fk_cipher_game_admin_p FOREIGN KEY (person_id) REFERENCES person (person_id) ON DELETE CASCADE;

ALTER TABLE cipher_game_team ADD CONSTRAINT fk_cipher_game_team_cg FOREIGN KEY (cipher_game_id) REFERENCES cipher_game (cipher_game_id) ON DELETE CASCADE;
ALTER TABLE cipher_game_team ADD CONSTRAINT fk_cipher_game_team_t FOREIGN KEY (team_id) REFERENCES team (team_id) ON DELETE CASCADE;

ALTER TABLE team_member ADD CONSTRAINT fk_team_member_p FOREIGN KEY (person_id) REFERENCES person (person_id) ON DELETE CASCADE;
ALTER TABLE team_member ADD CONSTRAINT fk_team_member_t FOREIGN KEY (team_id) REFERENCES team (team_id) ON DELETE CASCADE;

ALTER TABLE hint_used ADD CONSTRAINT fk_hint_used_h FOREIGN KEY (hint_id) REFERENCES hint (hint_id) ON DELETE CASCADE;
ALTER TABLE hint_used ADD CONSTRAINT fk_hint_used_t FOREIGN KEY (team_id) REFERENCES team (team_id) ON DELETE CASCADE;

COMMIT;
