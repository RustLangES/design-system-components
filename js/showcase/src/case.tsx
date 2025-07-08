import { ShowcaseDef } from ".";
import { prepareProps, ShowcaseField } from "./field";
import { ChevronDown } from "./icons";
import { createSignal, h, MiniUI } from "./miniui";
import { renderErrors } from "./error";

const registeredCases: InternalCase<unknown>[] = [];

export function getRegisteredCases(): InternalCase<unknown>[] {
  return registeredCases;
}

export type PropDef = {
  displayName?: string;
  disabled?: boolean;
  hidden?: boolean;
  optional?: boolean;
} & (
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
      kind: "callback";
      default?: any;
      options?: never[];
    }
  | {
      kind: "function";
      default?: boolean;
      options?: never[];
    }
  | {
      kind: "icon";
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
  defOrRender: CaseDef<TNode> | (() => TNode)
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
  let isDefRenderer = false;
  if (caseDef.kind === "render") {
    renderer = () => showcaseDef.instiate(caseDef.render, {});
  } else {
    isDefRenderer = true;
    renderer = () => ShowCaseDef(caseDef.def, showcaseDef);
  }

  const caseFailed = createSignal(true);

  return (
    <details
      class={() => [
        "shadow-brutal details-content:flex max-w-case mx-auto mb-5 px-3 py-2",
        "border-1 rounded-sm border-black",
        !caseFailed() && "bg-light dark:bg-neutral-900",
        caseFailed() && "bg-error-400 dark:bg-error-600",
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
      <div
        class={() => [
          "flex",
          !caseFailed() &&
            isDefRenderer &&
            "w-full flex-col items-center gap-2",
          !caseFailed() && !isDefRenderer && "items-center justify-center pt-2",
          caseFailed() && "flex-col",
        ]}
      >
        {showcaseDef.renderNode(
          showcaseDef.createErrorBoundary(
            () => {
              caseFailed(false);
              return renderer();
            },
            errors => {
              caseFailed(true);
              return showcaseDef.attach(renderErrors(errors));
            }
          )
        )}
      </div>
    </details>
  );
}

function ShowCaseDef<TComponent, TNode>(
  def: CaseDef<TComponent>,
  showcaseDef: ShowcaseDef<TComponent, TNode>
): TNode {
  const {
    defs: propDefs,
    componentProps,
    componentEvents,
  } = prepareProps(def.props, showcaseDef);

  const inputs = (
    <div
      class={[
        "w-full pb-2 pr-2",
        "case:!grid-cols-2 grid grid-cols-1 gap-2",
        "border-b-1 border-b-gray-300",
      ]}
    >
      {...propDefs.map(propDef => <ShowcaseField {...propDef} />)}
    </div>
  );

  return showcaseDef.instiate(showcaseDef.renderCaseSplitted as TComponent, {
    inputs: showcaseDef.attach(inputs),
    component: def.component,
    props: componentProps,
    events: componentEvents,
  });
}
