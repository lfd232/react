import { AddTodoForm } from "./components/AddTodoForm";
import { TodoList } from "./components/TodoList";
import { useTodoStore } from "./store/useTodoStore";

export default function App() {
  const fetchTodos = useTodoStore((s) => s.fetchTodos);
  const reset = useTodoStore((s) => s.reset);
  const status = useTodoStore((s) => s.todos.status);

  return (
    <main className="app">
      <header>
        <h1>Задачи</h1>
        <p className="sub">
          React + TypeScript · Axios · Zustand · FastAPI. Статус запроса:{" "}
          <code data-status={status}>{status}</code>
        </p>
      </header>

      <div className="toolbar">
        <button onClick={() => fetchTodos()}>Загрузить</button>
        <button onClick={() => fetchTodos({ delay_ms: 2000 })}>Медленная загрузка</button>
        <button className="danger" onClick={() => fetchTodos({ fail: true })}>
          Вызвать ошибку
        </button>
        <button className="ghost" onClick={reset}>Сбросить</button>
      </div>

      <TodoList />
      <AddTodoForm />
    </main>
  );
}
