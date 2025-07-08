import type React from "react";
import { jsxs } from "react/jsx-runtime";

import { createShowcase, ShowcaseConfigDef } from "..";
import { createErrorBoundary } from "./ErrorBoundary";
import {
  attach,
  instiate,
  render,
  renderCaseSplitted,
  renderNode,
} from "./render";

export function setupShowcase(
  config: ShowcaseConfigDef<(props: any) => React.ReactNode>
) {
  const icons = Object.fromEntries(
    Object.entries(config?.icons ?? {}).map(([iconName, iconComp]) => [
      iconName,
      jsxs(iconComp, {}),
    ])
  );

  createShowcase<(props: unknown) => React.ReactNode, React.ReactNode>({
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
