import React from "react";
import { jsxs } from "react/jsx-runtime";
import ReactDOM from "react-dom/client";

export function render(node: () => React.ReactNode): globalThis.Node {
  return renderNode(React.createElement(node, null));
}

export function renderNode(node: React.ReactNode): globalThis.Node {
  const root = document.createElement("div");
  root.style.display = "contents";

  ReactDOM.createRoot(root).render(
    React.createElement(React.StrictMode, null, node)
  );

  return root;
}

export function attach(node: Node): React.ReactNode {
  return jsxs("div", {
    styles: "display: contents;",
    ref: (elem: HTMLElement) => elem?.appendChild((console.log(node), node)),
  });
}
