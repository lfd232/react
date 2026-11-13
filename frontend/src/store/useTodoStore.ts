import { create } from "zustand";
import { getErrorMessage, todosApi, type FetchTodosParams } from "../api/client";
import type { RequestState } from "../types/request";
import type { Todo } from "../types/todo";

interface TodoStore {
  /** Данные и статус загрузки живут вместе в одном union. */
  todos: RequestState<Todo[]>;
  /** Функция загрузки инкапсулирована в хранилище. */
  fetchTodos: (params?: FetchTodosParams) => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  reset: () => void;
}

export const useTodoStore = create<TodoStore>()((set, get) => ({
  todos: { status: "idle" },

  fetchTodos: async (params) => {
    set({ todos: { status: "loading" } });
    try {
      const data = await todosApi.list(params);
      set({ todos: { status: "success", data } });
    } catch (err) {
      set({ todos: { status: "error", error: getErrorMessage(err) } });
    }
  },

  addTodo: async (title) => {
    const created = await todosApi.create({ title });
    const current = get().todos;
    const data = current.status === "success" ? [...current.data, created] : [created];
    set({ todos: { status: "success", data } });
  },

  reset: () => set({ todos: { status: "idle" } }),
}));
