import { useTodoStore } from "../store/useTodoStore";

function assertNever(x: never): never {
  throw new Error(`Необработанное состояние: ${JSON.stringify(x)}`);
}

export function TodoList() {
  const state = useTodoStore((s) => s.todos);
  const fetchTodos = useTodoStore((s) => s.fetchTodos);

  // switch по дискриминанту: TS проверяет, что обработаны ВСЕ состояния
  switch (state.status) {
    case "idle":
      return (
        <div className="panel panel--idle">
          <p>Запрос ещё не отправлялся. Нажмите «Загрузить».</p>
        </div>
      );

    case "loading":
      return (
        <div className="panel panel--loading" role="status" aria-live="polite">
          <span className="spinner" aria-hidden="true" />
          <p>Загружаем задачи…</p>
        </div>
      );

    case "error":
      return (
        <div className="panel panel--error" role="alert">
          <p className="panel__title">Не удалось загрузить задачи</p>
          <p>{state.error}</p>
          <button onClick={() => fetchTodos()}>Повторить</button>
        </div>
      );

    case "success":
      return state.data.length === 0 ? (
        <div className="panel panel--idle">
          <p>Задач пока нет. Добавьте первую.</p>
        </div>
      ) : (
        <ul className="list">
          {state.data.map((t) => (
            <li key={t.id} className={t.is_done ? "done" : ""}>
              <span className="mark" aria-hidden="true">{t.is_done ? "✓" : "○"}</span>
              <span className="title">{t.title}</span>
              <time dateTime={t.created_at}>
                {new Date(t.created_at).toLocaleTimeString("ru-RU")}
              </time>
            </li>
          ))}
        </ul>
      );

    default:
      return assertNever(state);
  }
}
