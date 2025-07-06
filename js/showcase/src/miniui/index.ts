import { effect, signal as alienSignal } from "alien-signals";
import { SVGElements } from "dom-expressions/src/constants";
import { type JSX } from "dom-expressions/src/jsx";

export namespace MiniUI {
  export interface WritableSignal<T> extends Signal<T> {
    (value: T): void;
  }

  export interface Signal<T> {
    (): T;
  }

  export type MaybeSignal<T> = T | (() => T);

  export type Component<P = {}> = (
    props: P,
    ...children: MiniUI.Node[]
  ) => MiniUI.Node;

  export type GetNodeElement<K extends HTMLElementType> =
    NonNullable<
      JSX.IntrinsicElements[K]["onClick"]
    > extends JSX.EventHandlerUnion<any, any, infer Event>
      ? Event extends JSX.EventHandler<infer Node, any>
        ? Node
        : Event
      : NonNullable<JSX.IntrinsicElements[K]["onClick"]>;

  export type ExtendedHTMLElementTagMap = JSX.IntrinsicElements;

  export type HTMLElementType = keyof ExtendedHTMLElementTagMap;
  export type HTMLElementProps<K extends HTMLElementType> = Partial<
    OmitNeverValue<
      {
        use: (ref: GetNodeElement<K>) => void;
      } & MapToSignals<
        Omit<
          JSX.IntrinsicElements[K],
          | "class"
          | keyof JSX.CustomEventHandlersNamespaced<
              ExtendedHTMLElementTagMap[K]
            >
          | keyof JSX.CustomEventHandlersLowerCase<ExtendedHTMLElementTagMap[K]>
        > & {
          class: string | (string | boolean)[];
        }
      >
    >
  >;
  export type Element<P> = HTMLElementType | Component<P>;
  export type Node =
    | Node[]
    | boolean
    | string
    | globalThis.Node
    | Signal<Node>
    | WeakRef<globalThis.Node>;

  export type MapToSignals<P> = {
    [K in keyof P]: EventListener extends P[K]
      ? P[K]
      : P[K] extends (...args: infer _) => infer __
        ? never
        : MaybeSignal<P[K]>;
  };

  type OmitNeverValue<Base> = {
    [Key in keyof Base & {} as [Base[Key]] extends [never] | [undefined]
      ? never
      : Key]: Base[Key];
  };
}

export function isSignal(s: unknown): s is MiniUI.Signal<unknown> {
  return typeof s === "function";
}

export function createSignal<T>(value: T): MiniUI.WritableSignal<T> {
  return alienSignal<T>(value);
}

export function createEffect(fn: () => void): () => void {
  return effect(fn);
}

export function renderH(parent: HTMLElement, node: MiniUI.Node) {
  parent.innerHTML = "";
  appendChildren(parent, [node]);
}

export function h<K extends MiniUI.HTMLElementType>(
  elemType: K,
  props: MiniUI.HTMLElementProps<K>,
  ...children: MiniUI.Node[]
): MiniUI.Node;

export function h<P>(
  elemType: MiniUI.Component<P>,
  props: P,
  ...children: MiniUI.Node[]
): MiniUI.Node;

/** For fragment */
export function h(
  elemType: typeof h,
  props: unknown,
  ...children: MiniUI.Node[]
): MiniUI.Node;

export function h(
  elemType: MiniUI.Element<unknown> | typeof h,
  props: unknown,
  ...children: MiniUI.Node[]
): MiniUI.Node {
  if (isFragment(elemType)) {
    return children;
  }

  if (typeof elemType !== "string") {
    return elemType(props, ...children);
  }

  const elem = new WeakRef(
    SVGElements.has(elemType)
      ? document.createElementNS("http://www.w3.org/2000/svg", elemType)
      : document.createElement(elemType)
  );

  let effects: Array<() => void> = [];
  const refGuard = (fn: (ref: Element) => void) => {
    const ref = elem.deref();

    if (ref) {
      fn(ref);
    } else {
      // Stop all attached effects and clear it
      effects.forEach(stop => stop());
      effects = [];
    }
  };

  const setAttribute = (ref: Element, name: string, value: unknown) => {
    if (typeof value === "boolean") {
      if (value) {
        ref.setAttribute(name, "");
      } else {
        ref.removeAttribute(name);
      }
    } else if (name === "class" && Array.isArray(value)) {
      ref.setAttribute("class", value.filter(v => !!v).join(" "));
    } else {
      ref.setAttribute(name, `${value}`);
    }
  };

  if (typeof props === "object" && props != null) {
    for (const [propKey, propValue] of Object.entries(
      props as Record<string, unknown>
    )) {
      if (propKey === "use" && typeof propValue === "function") {
        propValue(elem.deref());
      } else if (isSignal(propValue) && !propKey.startsWith("on")) {
        effects.push(
          effect(() => {
            refGuard(ref => {
              const attrValue = propValue();

              setAttribute(ref, propKey, attrValue);
            });
          })
        );
      } else if (typeof propValue === "function") {
        const eventName = propKey.substring(2).toLowerCase();

        elem.deref()!.addEventListener(eventName, propValue as EventListener);
      } else {
        setAttribute(elem.deref()!, propKey, propValue);
      }
    }
  }

  if (children.length) {
    appendChildren(elem.deref()!, children);
  }

  return elem;
}

function isFragment(value: unknown): value is typeof h {
  return value === h;
}

export function appendChildren(node: Node, children: MiniUI.Node[]) {
  for (const child of children) {
    if (child instanceof WeakRef) {
      const childRef = child.deref();
      childRef && node.appendChild(childRef);
    } else if (typeof child === "boolean") {
      if (child) {
        node.appendChild(document.createTextNode(`${child}`));
      }
    } else if (typeof child === "string" || typeof child === "number") {
      node.appendChild(document.createTextNode(`${child}`));
    } else if (Array.isArray(child)) {
      appendChildren(node, child);
    } else if (typeof child === "function") {
      renderSignal(child, node);
    } else {
      node.appendChild(child);
    }
  }
}

function renderSignal(signal: () => MiniUI.Node, parent: Node | null = null) {
  let node: Node;

  effect(() => {
    const value = signal();
    let next_node;

    if (value instanceof WeakRef) {
      const childRef = value.deref();
      !childRef && console.error("[MiniUI] rendering removed element");
      next_node = childRef!;
    } else if (typeof value === "boolean") {
      if (value) {
        next_node = document.createTextNode(`${value}`);
      } else {
        next_node = document.createComment("");
      }
    } else if (typeof value === "string" || typeof value === "number") {
      next_node = document.createTextNode(`${value}`);
    } else if (Array.isArray(value)) {
      const root = document.createElement("div");
      root.style.display = "contents";
      appendChildren(root, value);
      next_node = root;
    } else if (typeof value === "function") {
      next_node = renderSignal(value, parent);
    } else {
      next_node = value;
    }

    if (node && parent) {
      parent.replaceChild(next_node, node);
      node = next_node;
    } else if (node instanceof Element) {
      node.replaceWith(next_node);
      node = next_node;
    } else {
      parent?.appendChild(next_node);
      node = next_node;
    }
  });

  return node!;
}

export function Show(
  { when }: { when: MiniUI.Signal<boolean> },
  ...children: MiniUI.Node[]
): MiniUI.Node {
  return h(
    "div",
    {
      style: () => (when() ? "display: contents;" : "display: none;"),
    },
    ...children
  );
}

export type MatchProps<
  Cases extends Record<string, MiniUI.Component<P>>,
  Keys extends keyof Cases,
  P extends {} = {},
> = { value: Keys; cases: Cases } & ({} extends NonNullable<P>
  ? { props?: NonNullable<P> }
  : { props: NonNullable<P> });

export function Match<
  P extends {},
  Cases extends Record<string, MiniUI.Component<P>>,
  Keys extends keyof Cases,
>({ value, props, cases }: MatchProps<Cases, Keys, P>): MiniUI.Node {
  return () => {
    return cases[value](props ?? ({} as P));
  };
}
