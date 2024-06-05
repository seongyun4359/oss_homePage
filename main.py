from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from todo import todo_router
import uvicorn

app = FastAPI()

origins = [ "*", "http://localhost:5500", ]     
# origins = [    "http://localhost",    "http://localhost:5500",    "http://127.0.0.1",    "http://127.0.0.1:8080",    "http://35.172.130.111",    "http://35.172.130.111:80"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def welcome() -> dict:
    return {
        "msg": "hello world?"
    }

app.include_router(todo_router)

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
