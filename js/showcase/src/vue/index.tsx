import {
  ConcreteComponent,
  createApp,
  DefineComponent,
  defineComponent,
  VNode,
  h as vueH,
} from "vue";
import { createShowcase, registerCase, ShowcaseConfigDef } from "..";
import { createErrorBoundary } from "./ErrorBoundary";
import {
  attach,
  instiate,
  render,
  renderCaseSplitted,
  renderNode,
} from "./render";

export function setupShowcase(
  config: ShowcaseConfigDef<ConcreteComponent<any>> & {
    showcases: Record<string, ConcreteComponent<any>>;
  }
) {
  const virtualElem = document.createElement("div");
  Object.values(config.showcases).forEach(comp => {
    createApp(comp).mount(virtualElem);
  });

  const icons = Object.fromEntries(
    Object.entries(config?.icons ?? {}).map(([iconName, iconComp]) => [
      iconName,
      vueH(iconComp),
    ])
  );

  createShowcase<ConcreteComponent<any>, VNode>({
    ...config,
    icons,
    instiate,
    render,
    renderNode,
    renderCaseSplitted,
    attach,
    createErrorBoundary,
  });
}

export default defineComponent({
  name: "Showcase",
  props: ["name", "props", "slots", "component"],
  setup(props, { slots }) {
    if (slots.default) {
      registerCase(props.name, () => slots.default!());
    } else {
      registerCase(props.name, {
        props: props.props,
        slots: props.slots,
        component: props.component,
      });
    }
    return () => vueH("div");
  },
});
