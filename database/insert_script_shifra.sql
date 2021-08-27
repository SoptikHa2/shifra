
BEGIN TRANSACTION;

TRUNCATE TABLE attempt, cipher, hint, person, cipher_game, team, hint_used, cipher_game_admin, cipher_game_team, team_member CASCADE;

ALTER SEQUENCE cipher_cipher_id_seq RESTART WITH 1;
ALTER SEQUENCE cipher_game_cipher_game_id_seq RESTART WITH 1;
ALTER SEQUENCE hint_hint_id_seq RESTART WITH 1;
ALTER SEQUENCE person_person_id_seq RESTART WITH 1;
ALTER SEQUENCE team_team_id_seq RESTART WITH 1;

-- Cipher game data
------------------------------------------------------------------------------------------------------------------------
INSERT INTO cipher_game (time_starting_cipher_id, name, description, visible_from, deadline_signup, deadline_event, capacity, teammax, password, autoapprove)
VALUES (null, 'CipherGame1', 'First cipher', '2021-10-10 16:30', '2021-10-20 23:59', '2021-10-22 23:59', 200, 4,
 'code1', true);

INSERT INTO cipher_game (time_starting_cipher_id, name, description, visible_from, deadline_signup, deadline_event, capacity, teammax, password, autoapprove)
VALUES (null, 'CipherGame2', 'Cipher 2', '2021-12-10 00:00', '2021-12-12 23:59', '2021-12-31 23:59', 500, 2,
 'code2', false);

INSERT INTO cipher_game (time_starting_cipher_id, name, description, visible_from, deadline_signup, deadline_event, capacity, teammax, password, autoapprove)
VALUES (null, 'CipherGame3', 'Cipher 3', '2021-10-10 16:30', '2021-10-20 23:59', '2021-10-22 23:59', 300, 4,
 'code3', true);

INSERT INTO cipher_game (time_starting_cipher_id, name, description, visible_from, deadline_signup, deadline_event, capacity, teammax, password, autoapprove)
VALUES (null, 'CipherGame4', 'Cipher 4', '2021-10-10 16:30', '2021-10-20 23:59', '2021-10-22 23:59', 400, 4,
 'code4', false);

INSERT INTO cipher_game (time_starting_cipher_id, name, description, visible_from, deadline_signup, deadline_event, capacity, teammax, password, autoapprove)
VALUES (null, 'CipherGame5', 'Cipher 5', '2021-10-10 16:30', '2021-10-20 23:59', '2021-10-22 23:59', 100, 4,
'code5', false);

INSERT INTO cipher_game (time_starting_cipher_id, name, description, visible_from, deadline_signup, deadline_event, capacity, teammax, password, autoapprove)
VALUES (null, 'Dejvicka sifrovacka', 'What do you expect me to say', '2021-10-10 16:30', '2021-10-20 23:59', '2021-10-22 23:59', 200, 4,
 'code6', true);

INSERT INTO cipher_game (time_starting_cipher_id, name, description, visible_from, deadline_signup, deadline_event, capacity, teammax, password, autoapprove)
VALUES (null, 'FIT', 'Biggest cipher game of them all', '2020-9-21 00:00', '2021-04-20 23:59', '2023-06-30 23:59', 800, 1,
 'code7', false);
------------------------------------------------------------------------------------------------------------------------

-- Cipher data
------------------------------------------------------------------------------------------------------------------------
INSERT INTO cipher (cipher_game_id, req_cipher_id, name, description, solution, judge, cipher_file, img, success_msg, cooldown, attempts, score, reference_solution)
VALUES (1, null, 'How to survive', 'Survivalist cipher', 'Do not die', 'Soptik', 'file.txt', 'img.jpg', 'Yay!', 200, 3, 100.0, 'Opposite of dying.');

INSERT INTO cipher (cipher_game_id, req_cipher_id, name, description, solution, judge, cipher_file, img, success_msg, cooldown, attempts, score, reference_solution)
VALUES (1, 1, 'How to die', 'Survivalist cipher', 'Join FIT', 'FIT', 'file.txt', 'img.jpg', 'Yay!', 200, 3, 100.0, 'Just die');

INSERT INTO cipher (cipher_game_id, req_cipher_id, name, description, solution, judge, cipher_file, img, success_msg, cooldown, attempts, score, reference_solution)
VALUES (2, null, 'Void', 'Death', 'Death', 'Death', 'file.txt', 'img.jpg', 'Yay!', 200, 3, 100.0, 'Death');

INSERT INTO cipher (cipher_game_id, req_cipher_id, name, description, solution, judge, cipher_file, img, success_msg, cooldown, attempts, score, reference_solution)
VALUES (2, 3, 'How to survive', 'Survivalist cipher', 'Do not die', 'Soptik', 'file.txt', 'img.jpg', 'Yay!', 200, 3, 100.0, 'Opposite of dying.');

INSERT INTO cipher (cipher_game_id, req_cipher_id, name, description, solution, judge, cipher_file, img, success_msg, cooldown, attempts, score, reference_solution)
VALUES (3, null, 'Depression', '', 'Live', 'Damian', 'file.txt', 'img.jpg', 'You depressed now!', 200, 3, 100.0, '');

INSERT INTO cipher (cipher_game_id, req_cipher_id, name, description, solution, judge, cipher_file, img, success_msg, cooldown, attempts, score, reference_solution)
VALUES (4, null, 'How to survive', 'Survivalist cipher', 'Do not die', 'Soptik', 'file.txt', 'img.jpg', 'Yay!', 200, 3, 100.0, 'Opposite of dying.');

INSERT INTO cipher (cipher_game_id, req_cipher_id, name, description, solution, judge, cipher_file, img, success_msg, cooldown, attempts, score, reference_solution)
VALUES (5, null, 'How to survive', 'Survivalist cipher', 'Do not die', 'Soptik', 'file.txt', 'img.jpg', 'Yay!', 200, 3, 100.0, 'Opposite of dying.');

INSERT INTO cipher (cipher_game_id, req_cipher_id, name, description, solution, judge, cipher_file, img, success_msg, cooldown, attempts, score, reference_solution)
VALUES (5, null, 'How to survive', 'Survivalist cipher', 'Do not die', 'Soptik', 'file.txt', 'img.jpg', 'Yay!', 200, 3, 100.0, 'Opposite of dying.');

INSERT INTO cipher (cipher_game_id, req_cipher_id, name, description, solution, judge, cipher_file, img, success_msg, cooldown, attempts, score, reference_solution)
VALUES (6, null, 'How to survive', 'Survivalist cipher', 'Do not die', 'Soptik', 'file.txt', 'img.jpg', 'Yay!', 200, 3, 100.0, 'Opposite of dying.');

INSERT INTO cipher (cipher_game_id, req_cipher_id, name, description, solution, judge, cipher_file, img, success_msg, cooldown, attempts, score, reference_solution)
VALUES (7, null, 'Get your degree', 'Survivalist cipher', 'Survive years of constant pain', 'Vagner, Kalvoda, Klouda, Dombek', 'file.txt', 'fotka_pred_fitom.jpg', 'Bc. done', 200, 3, 100.0, '');
------------------------------------------------------------------------------------------------------------------------

-- Hint data
------------------------------------------------------------------------------------------------------------------------
INSERT INTO hint (cipher_id, msg, img, hint_file, score_cost, time_cost)
VALUES (1, 'xd', 'img.jpg', 'file.txt', 200, 300 );

INSERT INTO hint (cipher_id, msg, img, hint_file, score_cost, time_cost)
VALUES (2, 'xd', 'img.jpg', 'file.txt', 200, 300 );

INSERT INTO hint (cipher_id, msg, img, hint_file, score_cost, time_cost)
VALUES (3, 'xd', 'img.jpg', 'file.txt', 200, 300 );

INSERT INTO hint (cipher_id, msg, img, hint_file, score_cost, time_cost)
VALUES (4, 'xd', 'img.jpg', 'file.txt', 200, 300 );

INSERT INTO hint (cipher_id, msg, img, hint_file, score_cost, time_cost)
VALUES (5, 'xd', 'img.jpg', 'file.txt', 200, 300 );

INSERT INTO hint (cipher_id, msg, img, hint_file, score_cost, time_cost)
VALUES (6, 'xd', 'img.jpg', 'file.txt', 200, 300 );

INSERT INTO hint (cipher_id, msg, img, hint_file, score_cost, time_cost)
VALUES (7, 'xd', 'img.jpg', 'file.txt', 200, 300 );

INSERT INTO hint (cipher_id, msg, img, hint_file, score_cost, time_cost)
VALUES (8, 'xd', 'img.jpg', 'file.txt', 200, 300 );

INSERT INTO hint (cipher_id, msg, img, hint_file, score_cost, time_cost)
VALUES (9, 'xd', 'img.jpg', 'file.txt', 200, 300 );

INSERT INTO hint (cipher_id, msg, img, hint_file, score_cost, time_cost)
VALUES (10, 'xd', 'img.jpg', 'file.txt', 200, 300 );
------------------------------------------------------------------------------------------------------------------------

-- Person data (password = nickname)
------------------------------------------------------------------------------------------------------------------------
INSERT INTO person (is_root, nickname, session_cookie, mail, password)
VALUES (true, 'soptik', null, 'petr@soptik.tech', 'b''\x8dHj;]da\xc4\xcc\xf6\xe2\x90s\x1a-,}4>)\x94\x0eP\x91\x08\x10mc\x83:5\xb5''');

INSERT INTO person (is_root, nickname, session_cookie, mail, password)
VALUES (true, 'marek', null, 'marek@example.org', 'b''\xa7\xda;w=|\x8e\x19\x88e\xe8\x95\xddm\xe8\x13\xff\xbd\xe1\x88@:\x85\xeaK\x05\xd7\xc4\x10\xd3\xb7]''');

INSERT INTO person (is_root, nickname, session_cookie, mail, password)
VALUES (true, 'damian', null, 'damian@example.org', 'b''\xf27\xeet~<\xf1\xa2\xd4eX;\xf3\xa7\xc2\xbbI\xd6\xcddy\nht\xc8c\x18\xc0\x1d\xa1\x1b\xec''');

INSERT INTO person (is_root, nickname, session_cookie, mail, password)
VALUES (false, 'bot1', null, 'bot@example.org', 'b"&=\x87\xbe[\x16\x80pJ\x08\x93\xd4\x9a\x884\xd6\x17\xafs\x9b\xc0\xc3j\x92\xf5\xaa\xe3\xc4\xce\x1b5\x9a"');

INSERT INTO person (is_root, nickname, session_cookie, mail, password)
VALUES (false, 'bot2', null, null, 'b''%\x1aX\xfc\x8e\xe2\xfcH\x00\xa6\x19\xc8\xc0\xc4Hs\xf9\x91\xcdh\xb6P\\\xb7X\xdc\xfc \xa8\xd2\\\x96''');
------------------------------------------------------------------------------------------------------------------------

-- Team data
------------------------------------------------------------------------------------------------------------------------
INSERT INTO team (name, invite_code, approved) VALUES ('Mods are gay', 'We are the code', true);
INSERT INTO team (name, invite_code, approved) VALUES ('Bots1', '', false);
INSERT INTO team (name, invite_code, approved) VALUES ('Bots2', '', false);
------------------------------------------------------------------------------------------------------------------------

-- Team_person data
------------------------------------------------------------------------------------------------------------------------
INSERT INTO team_member (person_id, team_id) VALUES (1,1);
INSERT INTO team_member (person_id, team_id) VALUES (2,1);
INSERT INTO team_member (person_id, team_id) VALUES (3,1);

INSERT INTO team_member (person_id, team_id) VALUES (4,2);

INSERT INTO team_member (person_id, team_id) VALUES (4,3);
INSERT INTO team_member (person_id, team_id) VALUES (5,3);
------------------------------------------------------------------------------------------------------------------------

-- Cipher_game_team data
------------------------------------------------------------------------------------------------------------------------
INSERT INTO cipher_game_team (cipher_game_id, team_id) VALUES (1,1);
INSERT INTO cipher_game_team (cipher_game_id, team_id) VALUES (2,1);
INSERT INTO cipher_game_team (cipher_game_id, team_id) VALUES (3,1);
INSERT INTO cipher_game_team (cipher_game_id, team_id) VALUES (4,1);
INSERT INTO cipher_game_team (cipher_game_id, team_id) VALUES (5,1);

INSERT INTO cipher_game_team (cipher_game_id, team_id) VALUES (1,2);
INSERT INTO cipher_game_team (cipher_game_id, team_id) VALUES (2,2);
INSERT INTO cipher_game_team (cipher_game_id, team_id) VALUES (6,2);

INSERT INTO cipher_game_team (cipher_game_id, team_id) VALUES (4,3);
------------------------------------------------------------------------------------------------------------------------

-- Cipher_game_person data
------------------------------------------------------------------------------------------------------------------------
INSERT INTO cipher_game_admin (cipher_game_id, person_id) VALUES (1,1);
INSERT INTO cipher_game_admin (cipher_game_id, person_id) VALUES (2,4);
INSERT INTO cipher_game_admin (cipher_game_id, person_id) VALUES (3,4);
INSERT INTO cipher_game_admin (cipher_game_id, person_id) VALUES (4,4);
INSERT INTO cipher_game_admin (cipher_game_id, person_id) VALUES (5,5);
------------------------------------------------------------------------------------------------------------------------

-- Attempt data
------------------------------------------------------------------------------------------------------------------------
INSERT INTO attempt (cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (1, 1, '2021-10-10 17:00', '2021-10-10 17:00', 1, true);
INSERT INTO attempt (cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (2, 1, '2021-10-10 17:03', '2021-10-10 17:20', 4, true);
INSERT INTO attempt (cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (3, 1, '2021-10-10 17:45', '2021-10-10 17:55', 3, false);

INSERT INTO attempt (cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (1, 2, '2021-10-10 17:00', '2021-10-10 17:20', 5, true);
INSERT INTO attempt (cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (2, 2, '2021-10-10 17:20', '2021-10-10 17:20', 1, true);
INSERT INTO attempt (cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (3, 2, '2021-10-10 17:30', '2021-10-10 17:30', 1, true);
INSERT INTO attempt (cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (4, 2, '2021-10-10 17:40', '2021-10-10 19:20', 20, false);

INSERT INTO attempt (cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (1, 3, '2021-10-10 17:00', '2021-10-10 17:00', 1, true);
INSERT INTO attempt (cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (2, 3, '2021-10-10 17:00', '2021-10-10 17:00', 1, true);
INSERT INTO attempt (cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (3, 3, '2021-10-10 17:01', '2021-10-10 17:01', 1, true);
INSERT INTO attempt (cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (4, 3, '2021-10-10 17:01', '2021-10-10 17:01', 1, true);
INSERT INTO attempt (cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (5, 3, '2021-10-10 17:02', '2021-10-10 17:02', 1, true);
INSERT INTO attempt (cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (6, 3, '2021-10-10 17:02', '2021-10-10 17:02', 1, true);
INSERT INTO attempt (cipher_id, team_id, start_time, last_attempt_time, attempt_count, was_success) VALUES (7, 3, '2021-10-10 17:03', '2021-10-10 17:03', 1, true);
------------------------------------------------------------------------------------------------------------------------

-- Hint_used data
------------------------------------------------------------------------------------------------------------------------
INSERT INTO hint_used (hint_id, team_id) VALUES (1,1);
INSERT INTO hint_used (hint_id, team_id) VALUES (1,2);
INSERT INTO hint_used (hint_id, team_id) VALUES (2,1);
INSERT INTO hint_used (hint_id, team_id) VALUES (2,3);
INSERT INTO hint_used (hint_id, team_id) VALUES (4,1);
INSERT INTO hint_used (hint_id, team_id) VALUES (4,2);
INSERT INTO hint_used (hint_id, team_id) VALUES (5,3);
INSERT INTO hint_used (hint_id, team_id) VALUES (6,2);
INSERT INTO hint_used (hint_id, team_id) VALUES (6,3);
INSERT INTO hint_used (hint_id, team_id) VALUES (7,1);
INSERT INTO hint_used (hint_id, team_id) VALUES (7,2);
INSERT INTO hint_used (hint_id, team_id) VALUES (7,3);
INSERT INTO hint_used (hint_id, team_id) VALUES (8,1);
INSERT INTO hint_used (hint_id, team_id) VALUES (8,2);
INSERT INTO hint_used (hint_id, team_id) VALUES (10,3);
------------------------------------------------------------------------------------------------------------------------

COMMIT;
