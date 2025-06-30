import type React from "react";

import { createShowcase, ShowcaseConfigDef } from "..";
import { createErrorBoundary } from "./ErrorBoundary";
import { attach, render, renderNode } from "./render";

export function setupShowcase(config: ShowcaseConfigDef) {
  createShowcase<(props: unknown) => React.ReactNode, React.ReactNode>({
    ...config,
    render,
    renderNode,
    attach,
    createErrorBoundary,
    createElement(component, _, __) {
      return component;
    },
  });
}
