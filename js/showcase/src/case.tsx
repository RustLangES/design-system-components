import { ShowcaseDef } from ".";
import { normalizeProps, ShowcaseField } from "./field";
import { ChevronDown } from "./icons";
import { createSignal, h, MiniUI, renderAsElement } from "./miniui";
import { renderErrors } from "./error";

const registeredCases: InternalCase<unknown>[] = [];

export function getRegisteredCases(): InternalCase<unknown>[] {
  return registeredCases;
}

export type PropDef =
  & {
    displayName?: string;
    disabled?: boolean;
    hidden?: boolean;
    optional?: boolean;
  }
  & (
    | {
      kind: "raw";
      value: unknown;
      default?: any;
      options?: never[];
    }
    | {
      kind: "boolean";
      default?: boolean;
      options?: never[];
    }
    | {
      kind: "function";
      default?: boolean;
      options?: never[];
    }
    | {
      kind: "number";
      default?: number;
      options?: number[];
    }
    | {
      kind: "string";
      default?: string;
      options?: string[];
    }
  );

export type PropKind = PropDef["kind"];

export interface CaseDef<TComponent> {
  props: Record<string, Exclude<PropKind, "raw"> | PropDef>;
  component: TComponent;
}

export type InternalCase<TComponent> =
  | {
    title: string;
    kind: "render";
    render: TComponent;
  }
  | {
    title: string;
    kind: "def";
    def: CaseDef<TComponent>;
  };

export function registerCase<TNode>(title: string, def: CaseDef<TNode>): void;
export function registerCase<TNode>(title: string, render: () => TNode): void;

export function registerCase<TNode>(
  title: string,
  defOrRender: CaseDef<TNode> | (() => TNode),
): void {
  if (typeof defOrRender === "function") {
    registeredCases.push({
      title,
      kind: "render",
      render: defOrRender,
    });
  } else {
    registeredCases.push({
      title,
      kind: "def",
      def: defOrRender,
    });
  }
}

export function ShowCase<TComponent, TNode>({
  showcaseDef,
  caseDef,
}: {
  showcaseDef: ShowcaseDef<TComponent, TNode>;
  caseDef: InternalCase<TComponent>;
}): MiniUI.Node {
  let renderer: () => TNode;
  if (caseDef.kind === "render") {
    renderer = () => showcaseDef.instiate(caseDef.render, {});
  } else {
    renderer = () => ShowCaseDef(caseDef.def, showcaseDef);
  }

  return (
    <details
      class={[
        "shadow-brutal details-content:flex mb-5 px-3 py-2 dark:bg-neutral-900",
        "border-1 rounded-sm border-black",
      ]}
    >
      <summary
        class={[
          "flex list-none items-center justify-between pr-3 text-lg marker:hidden",
          "in-open:border-b-1 border-b-0 border-b-neutral-300 dark:border-b-neutral-700",
        ]}
      >
        <span class="flex items-center gap-2">{caseDef.title}</span>
        <span class="in-open:rotate-0 rotate-[-90deg] text-2xl transition">
          <ChevronDown />
        </span>
      </summary>
      <div class="flex flex-col gap-5 sm:flex-row">
        {showcaseDef.renderNode(
          showcaseDef.createErrorBoundary(
            renderer,
            (errors) =>
              showcaseDef.attach(renderAsElement(renderErrors(errors))),
          ),
        )}
      </div>
    </details>
  );
}

function ShowCaseDef<TComponent, TNode>(
  def: CaseDef<TComponent>,
  showcaseDef: ShowcaseDef<TComponent, TNode>,
): TNode {
  const props = normalizeProps(def.props);
  const signals = Object.fromEntries(
    props.map((prop) => [prop.displayName, createSignal(prop.default)]),
  );

  const inputs = renderAsElement(
    <div
      class={[
        "flex w-full max-w-xs flex-col gap-2 pr-2 pt-2",
        "border-r-1 border-r-gray-300",
      ]}
    >
      {...props.map((propDef) => (
        <ShowcaseField
          {...propDef}
          valueSignal={signals[propDef.displayName]}
        />
      ))}
    </div>,
  );

  return showcaseDef.instiate(showcaseDef.renderCaseSplitted as TComponent, {
    inputs: showcaseDef.attach(inputs),
    component: def.component,
    props: signals,
    events: {},
  });
}
