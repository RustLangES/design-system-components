import React, { ComponentPropsWithoutRef } from "react";

export function withAs<P extends object>(
  render: (Component: React.ElementType, props: P) => React.ReactNode
) {
  return function WithAsComponent<C extends React.ElementType = "div">(
    props: { as?: C } & Omit<ComponentPropsWithoutRef<C>, keyof P> & P
  ) {
    const { as: Component = "div", ...rest } = props;
    return render(Component, rest as P);
  };
}
