/** Зеркало pydantic-модели `Todo` (backend/main.py). Имена полей — snake_case, как в JSON. */
export interface Todo {
  id: number; // int
  title: string; // str
  is_done: boolean; // bool
  created_at: string; // datetime -> ISO-строка в JSON
}

/** Зеркало pydantic-модели `TodoCreate`. */
export interface TodoCreate {
  title: string;
}

/** Формат ошибок FastAPI: { "detail": "..." } или список ошибок валидации. */
export interface ApiErrorBody {
  detail: string | { msg: string }[];
}
