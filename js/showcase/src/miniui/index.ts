import { signal as alienSignal, effect } from "alien-signals";

export namespace MiniUI {
  export const SIGNAL = Symbol("Signal");

  export interface WritableSignal<T> extends Signal<T> {
    (value: T): void;
  }

  export interface Signal<T> {
    (): T;
    [SIGNAL]: typeof SIGNAL;
  }

  export type MaybeSignal<T> = Signal<T> | T;

  export type Component<P = {}> = (
    props?: P,
    ...children: MiniUI.Node[]
  ) => HTMLElement;
  export type HTMLElementType = keyof HTMLElementTagNameMap;
  export type HTMLElementProps<K extends HTMLElementType> = OmitNeverValue<
    MapToSignals<HTMLElementTagNameMap[K]>
  >;
  export type Element<P> = HTMLElementType | Component<P>;
  export type Node = HTMLElement | WeakRef<HTMLElement>;

  export type MapToSignals<P> = {
    [K in keyof P]: ((ev: Event) => void) extends P[K] ? P[K]
      : P[K] extends ((...args: infer _) => infer __) ? never
      : MaybeSignal<P[K]>;
  };

  type OmitNeverValue<Base> = {
    [
      Key in (keyof Base & {}) as [Base[Key]] extends [never] | [undefined]
        ? never
        : Key
    ]: Base[Key];
  };
}

export function isSignal(s: unknown): s is MiniUI.Signal<unknown> {
  return typeof s === "object" && s !== null && MiniUI.SIGNAL in s;
}

export function createSignal<T>(value: T): MiniUI.WritableSignal<T> {
  const newSignal = alienSignal<T>(value) as MiniUI.WritableSignal<T>;
  newSignal[MiniUI.SIGNAL] = MiniUI.SIGNAL;
  return newSignal;
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

export function h(
  elemType: MiniUI.Element<unknown>,
  props: unknown,
  ...children: MiniUI.Node[]
): MiniUI.Node {
  if (typeof elemType !== "string") {
    return elemType(props, ...children);
  }

  const elem = new WeakRef(document.createElement(elemType));

  let effects: Array<() => void> = [];

  for (const [propKey, propValue] of Object.entries(props as Record<string, unknown>)) {
    if (isSignal(propValue)) {
      effects.push(effect(() => {
        if (elem.deref()) {}
      }));
    }
  }

  return elem;
}
