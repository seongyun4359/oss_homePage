from fastapi import APIRouter, Path
from pydantic import BaseModel
from datetime import datetime
from typing import List

class Todo(BaseModel):
    id: int
    item: str
    writer: str
    time: datetime

todo_router = APIRouter()

todo_list = []
todo_counter = 0

@todo_router.post("/todo")
async def add_todo(todo: Todo) -> dict:
    global todo_counter
    todo_counter += 1
    todo.id = todo_counter
    todo.time = datetime.now()
    todo_list.append(todo)
    return {
        "msg": "Todo added successfully"
    }

@todo_router.get("/todo")
async def retrieve_todos() -> dict:
    return {
        "todos": todo_list
    }

@todo_router.get("/todo/{todo_id}")
async def get_single_todo(todo_id: int = Path(..., title="the ID of the todo to retrieve")) -> dict:
    for todo in todo_list:
        if todo.id == todo_id:
            return {"todo": todo}
    return {"msg": "Todo with supplied ID doesn't exist"}

@todo_router.delete("/todo/{todo_id}")
async def delete_todo(todo_id: int = Path(..., title="the ID of the todo to delete")) -> dict:
    for index, todo in enumerate(todo_list):
        if todo.id == todo_id:
            del todo_list[index]
            return {"msg": f"Todo with ID {todo_id} deleted successfully"}
    return {"msg": "Todo with supplied ID doesn't exist"}
