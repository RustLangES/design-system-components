import { h, MiniUI } from "../miniui";

export type ErrorStack = {
  line: number;
  column: number;
  name: string;
  source: string;
};

export type ErrorsDef = {
  message: string;
  stack: ErrorStack[];
};

export function renderError(error: ErrorStack): MiniUI.Node {
  return (
    <span class="flex w-full justify-between">
      <span class="font-semibold">{error.name}</span>
      <span
        class={!error.source.startsWith("/node_modules") ? "font-semibold" : ""}
      >
        {error.source}:{error.line}:{error.column}
      </span>
    </span>
  );
}

export function renderErrors(error: ErrorsDef): MiniUI.Node {
  return (
    <div class="contents">
      <span class="text-xl font-bold">{error.message}</span>
      {error.stack.map(renderError)}
    </div>
  );
}
