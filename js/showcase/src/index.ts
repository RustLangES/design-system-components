import { getRegisteredCases, ShowCase } from "./case";
import { appendChildren, MiniUI } from "./miniui";
import { ErrorsDef } from "./error";
import { ThemeSwitch } from "./theme";

export * from "./case";

export interface ShowcaseConfigDef<TNode> {
  icons?: Record<string, TNode>;
}

export interface ShowcaseDef<TComponent, TNode>
  extends ShowcaseConfigDef<TNode> {
  icons: Record<string, TNode>;
  instiate(node: TComponent, props: unknown): TNode;
  render(node: TComponent): Node;
  renderNode(node: TNode): Node;
  renderCaseSplitted: TComponent;
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
