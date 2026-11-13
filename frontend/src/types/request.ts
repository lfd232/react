/**
 * Состояние запроса как дискриминированный union.
 * `status` — дискриминант: TypeScript сужает тип, поэтому `data` доступна
 * только в success, `error` — только в error, а невозможные комбинации
 * вроде { isLoading: true, error: "..." } просто не компилируются.
 */
export type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: T };
