import { getRegisteredCases, ShowCase } from "./case";
import { MiniUI, renderH } from "./miniui";
import { ErrorsDef } from "./ShowComponent/error";

export * from "./case";

export interface ShowcaseConfigDef {}

export interface ShowcaseDef<TComponent, TNode> extends ShowcaseConfigDef {
  render(node: TComponent): Node;
  renderNode(node: TNode): Node;
  attach(node: Node): TNode;
  createElement(
    component: TComponent,
    props: Record<string, MiniUI.Signal<unknown>>,
    events: Record<string, MiniUI.Signal<void>>
  ): TComponent;
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

  for (const caseDef of getRegisteredCases()) {
    renderH(
      root,
      ShowCase({
        showcaseDef,
        caseDef,
      })
    );
  }
}
