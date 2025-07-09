import React, { Component } from "react";
import { jsxs } from "react/jsx-runtime";
import { ErrorsDef, ErrorStack } from "../error";

export function createErrorBoundary(
  render: () => React.ReactNode,
  renderErrors: (error: ErrorsDef) => React.ReactNode
): React.ReactElement {
  return jsxs(ErrorBoundary, { render, renderErrors });
}

export class ErrorBoundary extends Component<
  {
    renderErrors(error: ErrorsDef): React.ReactNode;
    render(): React.ReactNode;
  },
  { error?: Error }
> {
  componentDidCatch(error: Error): void {
    console.error(error);
    this.setState({
      error,
    });
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render(): React.ReactNode {
    return this.state?.error
      ? this.props.renderErrors(errorToDef(this.state.error!))
      : jsxs(this.props.render, {});
  }
}

function errorToDef(error: Error): ErrorsDef {
  const stack: ErrorStack[] = (error.stack?.split?.("\n") ?? [])
    .map(line => {
      if (line.length === 0) {
        return;
      }

      // split by really last @ or @http(s)?://
      let [, name, source = ""] = line.match(/(.*)@(https?:\/\/.*)$/) ??
        line.match(/(.*)@(:?[^@]*)$/) ?? [, line];

      // replace empty string to anonymous call
      name = name || "<anonymous>";

      // Ignore all the internal functions of react and vite
      if (
        source.startsWith("vite/client") ||
        source.startsWith("react-refresh") ||
        name.includes("/node_modules/") ||
        name.startsWith("__require")
      ) {
        return;
      }

      // Remove any URL prefix, leave just path
      source = source.startsWith(location.origin)
        ? source.substring(location.origin.length)
        : source;

      // Remove node_modules prefix from URL
      const NODE_MODULES_DEPS = "/node_modules/.vite/deps/";
      source = source.startsWith(NODE_MODULES_DEPS)
        ? "/node_modules/" +
          source.substring(NODE_MODULES_DEPS.length).replace(/_/g, "/")
        : source;

      const SHOWCASE_DIST = "showcase/dist";
      source = source.includes(SHOWCASE_DIST)
        ? "@showcase" +
          source.substring(source.indexOf(SHOWCASE_DIST) + SHOWCASE_DIST.length)
        : source;

      // match to <source-file>?<timestamp-or-version>:<line>:<column>
      const [, sourceFile, lineN, columnN] = source.match(
        /^(.+)?(?:t=\d+|v=\w+):(\d+):(\d+)$/
      ) ?? [, source, "", ""];

      return {
        line: parseInt(lineN),
        column: parseInt(columnN),
        name: name,
        source: sourceFile,
      } satisfies ErrorStack;
    })
    .filter((e): e is ErrorStack => !!e);

  return {
    message: error.message,
    stack,
  };
}
