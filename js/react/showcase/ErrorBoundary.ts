import React, { Component, PropsWithChildren } from "react";

export class ErrorBoundary extends Component<
  PropsWithChildren<{ fallback(err: Error): React.ReactNode }>,
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
      ? this.props.fallback(this.state.error)
      : this.props.children;
  }
}
