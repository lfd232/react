import axios from "axios";
import type { ApiErrorBody, Todo, TodoCreate } from "../types/todo";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

export interface FetchTodosParams {
  delay_ms?: number;
  fail?: boolean;
}

export const todosApi = {
  list: async (params?: FetchTodosParams): Promise<Todo[]> => {
    const { data } = await api.get<Todo[]>("/api/todos", { params });
    return data;
  },
  create: async (payload: TodoCreate): Promise<Todo> => {
    const { data } = await api.post<Todo>("/api/todos", payload);
    return data;
  },
};

/** Превращает любую ошибку в человекочитаемую строку. */
export function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError<ApiErrorBody>(err)) {
    if (err.response) {
      const detail = err.response.data?.detail;
      const text = Array.isArray(detail) ? detail.map((d) => d.msg).join("; ") : detail;
      return `${err.response.status}: ${text ?? err.message}`;
    }
    if (err.code === "ECONNABORTED") return "Сервер не ответил вовремя";
    return "Нет связи с сервером. Проверьте, что FastAPI запущен и настроен CORS.";
  }
  return err instanceof Error ? err.message : "Неизвестная ошибка";
}
