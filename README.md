# FastAPI + React + TypeScript + Axios + Zustand

## Запуск

### 1. Бэкенд (терминал 1)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Swagger: http://localhost:8000/docs

### 2. Фронтенд (терминал 2)
```bash
cd frontend
cp .env.example .env             # Windows: copy .env.example .env
npm install
npm run dev
```
Открыть: http://localhost:5173

## Соответствие требованиям

| Требование | Где |
|---|---|
| Типизированный Axios (`axios.create` + `baseURL`) | `frontend/src/api/client.ts` |
| TS-интерфейсы = Pydantic-схемы | `frontend/src/types/todo.ts` ↔ `backend/main.py` |
| Дискриминированный union (idle/loading/error/success) | `frontend/src/types/request.ts` |
| Zustand-хранилище (данные + функция загрузки) | `frontend/src/store/useTodoStore.ts` |
| Три состояния в UI | `frontend/src/components/TodoList.tsx` |
| CORS | `CORSMiddleware` в `backend/main.py` |

## Как проверить три состояния
- **loading** — «Медленная загрузка» (бэкенд ждёт 2 с).
- **error** — «Вызвать ошибку» (бэкенд отвечает 500) или остановите бэкенд.
- **success** — «Загрузить».
