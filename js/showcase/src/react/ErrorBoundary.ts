import React, { Component } from "react";
import { jsxs } from "react/jsx-runtime";
import { ErrorsDef, ErrorStack } from "../ShowComponent/error";

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
      : this.props.render();
  }
}

function errorToDef(error: Error): ErrorsDef {
  const stack: ErrorStack[] = (error.stack?.split?.("\n") ?? [])
    .map(line => {
      // split by really last @
      const [, name, source_ = ""] = line.match(/(.*)@([^@]*)$/) ?? [, line];

      // This is separated because of eslint
      let source = source_;

      // Ignore all the internal functions of react and vite
      if (
        source.startsWith("vite/client") ||
        source.startsWith("react-refresh") ||
        name.includes("/node_modules/") ||
        name.startsWith("__require") ||
        name.trim().length === 0
      ) {
        return;
      }

      // Remove any URL prefix, leave just path
      source = source.startsWith(location.origin)
        ? source.substring(location.origin.length)
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
