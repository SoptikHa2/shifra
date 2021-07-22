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