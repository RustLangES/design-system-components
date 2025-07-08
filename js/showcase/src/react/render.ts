import React, { useEffect, useSyncExternalStore } from "react";
import { Fragment, jsxs } from "react/jsx-runtime";
import ReactDOM from "react-dom/client";
import { createEffect, MiniUI, renderH } from "../miniui";

export function instiate<P extends {}>(
  node: (p: P) => React.ReactNode,
  props: P
): React.ReactNode {
  return jsxs(node, props);
}

export function render(node: () => React.ReactNode): globalThis.Node {
  return renderNode(jsxs(node, null));
}

export function renderNode(node: React.ReactNode): globalThis.Node {
  const root = document.createElement("div");
  root.style.display = "contents";

  // @ts-expect-error - React globals for testing
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;

  React.act(() => {
    ReactDOM.createRoot(root).render(node);
  });

  return root;
}

export function attach(node: MiniUI.Node): React.ReactNode {
  return jsxs("div", {
    style: { display: "contents" },
    ref: (elem: HTMLElement) => elem && renderH(elem, node),
  });
}

let isFirstUpdate = true;
export function renderCaseSplitted({
  inputs,
  component,
  props,
  events,
}: {
  inputs: React.ReactNode;
  component: (p: unknown) => React.ReactNode;
  props: Record<string, MiniUI.Signal<unknown>>;
  events: Record<string, MiniUI.Signal<void>>;
}): React.ReactNode {
  const reactProps: Record<string, any> = {};

  for (const [propName, propValue] of Object.entries(props)) {
    reactProps[propName] = useSyncExternalStore(
      callback => {
        return createEffect(() => {
          propValue(); // track

          if (isFirstUpdate) {
            callback();
          } else {
            React.act(() => {
              callback();
            });
          }
        });
      },
      () => propValue(),
      () => propValue()
    );

    // Don't send undefined props
    if (reactProps[propName] === undefined) {
      delete reactProps[propName];
    }
  }

  for (const [eventName, eventValue] of Object.entries(events)) {
    reactProps[eventName] = eventValue;
  }

  useEffect(() => {
    isFirstUpdate = false;
  });

  return jsxs(Fragment, {
    children: [inputs, jsxs(component, reactProps)],
  });
}
