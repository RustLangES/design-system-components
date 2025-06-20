import { ComponentPropsWithoutRef, ElementType } from "react";

export function withAs<P extends object, D extends ElementType>(
  render: (Component: ElementType, props: P) => React.ReactNode,
  defaultAs?: D
) {
  return function WithAsComponent<C extends React.ElementType = "div">(
    props: { as?: C } & Omit<ComponentPropsWithoutRef<C>, keyof P> & P
  ) {
    const { as: Component = defaultAs ?? "div", ...rest } = props;
    return render(Component, rest as P);
  };
}
