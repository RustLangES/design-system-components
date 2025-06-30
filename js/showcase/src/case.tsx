import { ShowcaseDef } from ".";
import { ChevronDown } from "./icons";
import { h, MiniUI, renderAsElement } from "./miniui";
import { renderErrors } from "./ShowComponent/error";

const registeredCases: InternalCase<unknown>[] = [];

export function getRegisteredCases(): InternalCase<unknown>[] {
  return registeredCases;
}

type PropDef = {
  displayName?: string;
  disabled?: boolean;
  hidden?: boolean;
  optional?: boolean;
} & (
  | {
      kind: "raw";
      value: unknown;
    }
  | {
      kind: "boolean";
      default?: boolean;
    }
  | {
      kind: "function";
      default?: boolean;
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

type PropKind = PropDef["kind"];

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
  let renderer: () => MiniUI.Node;
  if (caseDef.kind === "render") {
    renderer = () => showcaseDef.render(caseDef.render);
  } else {
    renderer = () => ShowCaseDef(caseDef.def);
  }
  return showcaseDef.renderNode(
    showcaseDef.createErrorBoundary(
      () => {
        return showcaseDef.attach(
          renderAsElement(renderCase(caseDef.title, renderer()))
        );
      },
      errors => showcaseDef.attach(renderAsElement(renderErrors(errors)))
    )
  );
}

function renderCase(title: string, child: MiniUI.Node): globalThis.Node {
  return (
    <details
      class={
        "border-1 shadow-brutal details-content:flex mb-5 rounded-sm border-black px-3 py-2"
      }
    >
      <summary class="in-open:border-b-1 flex list-none items-center justify-between border-b-0 border-b-gray-300 pr-3 text-lg marker:hidden">
        <span class="flex items-center gap-2">{title}</span>
        <span class="in-open:rotate-0 rotate-[-90deg] text-2xl transition">
          <ChevronDown />
        </span>
      </summary>
      <div class={"flex flex-col gap-5 sm:flex-row"}>{child}</div>
    </details>
  );
}

function ShowCaseDef<TComponent>(_def: CaseDef<TComponent>) {
  return <div>HI</div>;
}
