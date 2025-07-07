import { getRegisteredCases, ShowCase } from "./case";
import { appendChildren, MiniUI } from "./miniui";
import { ErrorsDef } from "./error";
import { ThemeSwitch } from "./theme";

export * from "./case";

export interface ShowcaseConfigDef {}

export interface ShowcaseDef<TComponent, TNode> extends ShowcaseConfigDef {
  instiate(node: TComponent, props: unknown): TNode;
  render(node: TComponent): Node;
  renderNode(node: TNode): Node;
  renderCaseSplitted(props: {
    inputs: TNode;
    component: TComponent;
    props: Record<string, MiniUI.Signal<unknown>>;
    events: Record<string, MiniUI.Signal<void>>;
  }): TNode;
  attach(node: MiniUI.Node): TNode;
  createErrorBoundary(
    render: () => TNode,
    renderErrors: (errors: ErrorsDef) => TNode
  ): TNode;
}

export function createShowcase<TComponent, TNode>(
  showcaseDef: ShowcaseDef<TComponent, TNode>
) {
  const root = document.getElementById("root");

  if (!root) {
    alert("No root element");
    throw "No root element";
  }

  appendChildren(root, [
    ThemeSwitch(),
    ...getRegisteredCases().map(caseDef =>
      ShowCase({
        showcaseDef,
        caseDef,
      })
    ),
  ]);
}
