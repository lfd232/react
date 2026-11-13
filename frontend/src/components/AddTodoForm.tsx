import { useState, type FormEvent } from "react";
import { getErrorMessage } from "../api/client";
import { useTodoStore } from "../store/useTodoStore";

export function AddTodoForm() {
  const addTodo = useTodoStore((s) => s.addTodo);
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      setError(null);
      await addTodo(title.trim());
      setTitle("");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <form className="add" onSubmit={submit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Новая задача"
        maxLength={100}
        aria-label="Название задачи"
      />
      <button type="submit">Добавить</button>
      {error && <p className="form-error" role="alert">{error}</p>}
    </form>
  );
}
