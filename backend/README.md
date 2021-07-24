# Spustenie FastAPI

Spúšťanie pomocou **uvicorn** 
```
Prepinače:  --host [address]    ( Bind socket to this host )
            --port [INTEGER]    ( Bind socket to this port )
            --reload            ( Enable auto-reload )
```
          
Ukážka spustenia:
```
      uvicorn main:app --reload
                |   |      |
                |   |      +--> prepínače
                |   +--> názov FastAPI v .py subory
                +--> názov .py suboru s API ( *bez prípony .py* )
```

struktura database.ini (specifikace portu není nutná)
```
[dev]
host=
port=
database=
user=
password=

[local]
host=
port=
database=
user=
password=

[prod]
host=
port=
database=
user=
password=
```


---

Suggested endpoints:

All endpoints should be prefixed with api/

```
Public (no auth required)
/login (POST, username + password, optionally sets cookies and returns success or failure)
/register (POST, username, email, password, registers (and logs in) an user, or transforms temporary user account into permanent one)
/games (GET, returns all ciphergames visible to public)
/game/[ID] (GET, returns info about ciphergame, if it is visible to the public)
/jointeam (POST, username, team passcode, joins given team and creates new temporary user account if not logged in - optionally sets login cookies, returns team ID or failure)
/leaderboard/[ID] (GET, returns leaderboard info about a cipher game, if visible to public or logged in user, otherwise failure)
/genQR/[ID] (GET, generate QR code pointing to https://shifra.klubfitpp.cz/join/[ID])

User (user has to be authenticated)
/createteam (POST, cipher game ID, creates new team and returns it's new ID, if it is possible to join given cipher game)
/team/[ID] (GET, returns info about given team)
/ciphers/[ID] (GET, returns all visible ciphers in given game)
/ciphers/[ID]/show/[CID] (GET, returns info about a given cipher in a given ciphergame if possible. May start timer)
/ciphers/[ID]/answer/ (POST, cipher ID, cipher answer (string), attempts to answer. Possible results: approved, rejected (cooldown), rejected (judge; may include extra failure info) ({ status: ok }, { status: cooldown }, { status: rejected, judge: "lol nope" })
/hint/ (POST, hint ID, opens hint and returns it's contents, may have a cost attached (see /ciphers/[ID]/show/[CID]))

Admin (user has to be authenticated and either root, or ciphergame admin)
todo
```

