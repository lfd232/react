import asyncio
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Todo API")

# CORS: разрешаем запросы с dev-сервера Vite
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------- Pydantic-схемы (snake_case) ----------
class Todo(BaseModel):
    id: int
    title: str
    is_done: bool
    created_at: datetime


class TodoCreate(BaseModel):
    title: str = Field(min_length=1, max_length=100)


# ---------- "База данных" в памяти ----------
def _now() -> datetime:
    return datetime.now(timezone.utc)


todos: list[Todo] = [
    Todo(id=1, title="Настроить Axios-клиент", is_done=True, created_at=_now()),
    Todo(id=2, title="Описать типы по Pydantic-схемам", is_done=True, created_at=_now()),
    Todo(id=3, title="Подключить Zustand", is_done=False, created_at=_now()),
]
next_id = 4


# ---------- Эндпоинты ----------
@app.get("/api/todos", response_model=list[Todo])
async def list_todos(
    delay_ms: int = Query(0, ge=0, le=10_000, description="Искусственная задержка"),
    fail: bool = Query(False, description="Имитировать ошибку сервера"),
):
    """delay_ms и fail нужны, чтобы увидеть состояния loading и error."""
    if delay_ms:
        await asyncio.sleep(delay_ms / 1000)
    if fail:
        raise HTTPException(status_code=500, detail="Имитация ошибки сервера")
    return todos


@app.post("/api/todos", response_model=Todo, status_code=201)
async def create_todo(payload: TodoCreate):
    global next_id
    todo = Todo(id=next_id, title=payload.title, is_done=False, created_at=_now())
    next_id += 1
    todos.append(todo)
    return todo
