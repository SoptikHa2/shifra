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
