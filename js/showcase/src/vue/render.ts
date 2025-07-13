import {
  createApp,
  customRef,
  defineComponent,
  Fragment,
  h as vueH,
  Ref,
  VNode,
} from "vue";
import { createEffect, MiniUI, renderH } from "../miniui";

export function instiate<P extends {}>(node: (p: P) => VNode, props: P): VNode {
  return vueH(node, props);
}

export function render(node: () => VNode): globalThis.Node {
  const root = document.createElement("div");
  root.style.display = "contents";

  createApp(node).mount(root);

  return root;
}

export function renderNode(node: VNode): globalThis.Node {
  return render(() => node);
}

const ExternalAttach = defineComponent({
  name: "ExternalAttach",
  props: ["node"],
  setup({ node }) {
    return () =>
      vueH("div", {
        style: { display: "contents" },
        ref: elem => elem instanceof Element && renderH(elem, node),
      });
  },
});

export function attach(node: MiniUI.Node): VNode {
  return vueH(ExternalAttach, { node });
}

export const renderCaseSplitted = defineComponent<{
  inputs: VNode;
  component: (p: unknown) => VNode;
  props: Record<string, MiniUI.WritableSignal<unknown>>;
  slots: Record<string, MiniUI.Signal<VNode>>;
  events: Record<string, MiniUI.Signal<void>>;
}>({
  name: "Case",
  props: ["inputs", "component", "props", "slots", "events"],
  setup({ inputs, component, props, slots, events }, ctx) {
    ctx.expose();
    const outProps: Record<
      string,
      Ref<unknown, unknown> | MiniUI.Signal<void>
    > = {};

    for (const [propName, propValue] of Object.entries(props)) {
      outProps[propName] = customRef((track, trigger) => {
        createEffect(() => {
          propValue();
          trigger();
        });

        return {
          get: () => (track(), propValue()),
          set: v => propValue(v),
        };
      });
    }

    for (const [eventName, eventValue] of Object.entries(events)) {
      outProps[eventName] = eventValue;
    }

    return () =>
      vueH(Fragment, null, [
        inputs,
        vueH(
          component,
          outProps,
          Object.fromEntries(
            Object.entries(slots).map(([slotName, slotSignal]) => [
              slotName,
              () => slotSignal(),
            ])
          )
        ),
      ]);
  },
});
