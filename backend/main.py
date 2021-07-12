from fastapi import FastAPI

api = FastAPI()


@api.get("/")
def main_page():
    return {"text": "Hello world!"}

