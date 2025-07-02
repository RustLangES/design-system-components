import type React from "react";

import { createShowcase, ShowcaseConfigDef } from "..";
import { createErrorBoundary } from "./ErrorBoundary";
import {
  attach,
  instiate,
  render,
  renderCaseSplitted,
  renderNode,
} from "./render";

export function setupShowcase(config: ShowcaseConfigDef) {
  createShowcase<(props: unknown) => React.ReactNode, React.ReactNode>({
    ...config,
    instiate,
    render,
    renderNode,
    renderCaseSplitted,
    attach,
    createErrorBoundary,
  });
}
