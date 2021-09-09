-- ┌─────────────┐
-- │ LEADERBOARD │
-- └─────────────┘

drop view if exists w_getLeaderboard;
create view w_getLeaderboard as
select
            -- Cipher game id
            cg.cipher_game_id,
            -- Team id
            t.team_id,
            -- Clean score
            SUM(c.score) filter ( where a.was_success ) AS clean_score,
            -- Start time
            COALESCE(startingAttempt.start_time, MIN(a.start_time)) as start_time,
            -- End time
            MAX(a.last_attempt_time) as end_time,
            -- Malus score
            SUM(COALESCE(h.score_cost, 0)) AS malus_score,
            -- Malus time
            SUM(COALESCE(h.time_cost, 0)) AS malus_time,
            -- Has finished
            BOOL_AND(a.was_success) as has_finished

    from team t
    join cipher c on c.cipher_game_id = t.cipher_game_id
    join attempt a on a.team_id = t.team_id and a.cipher_id = c.cipher_id
    join cipher_game cg on cg.cipher_game_id = t.cipher_game_id
    left outer join cipher startingCipher on startingCipher.cipher_id = cg.time_starting_cipher_id
    left outer join attempt startingAttempt on startingAttempt.cipher_id = startingCipher.cipher_id and
                                    startingAttempt.team_id = t.team_id
    left outer join hint_used hu on hu.team_id = t.team_id
    left outer join hint h on h.hint_id = hu.hint_id and h.cipher_id = c.cipher_id
    group by t.team_id, t.name, cg.cipher_game_id, startingAttempt.start_time;




