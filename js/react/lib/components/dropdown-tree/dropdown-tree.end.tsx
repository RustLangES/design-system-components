import { ArrowRight } from "@/icons";
import { withAs } from "@/utils/hoc";
import { PropsWithChildren } from "react";

type DropdownTreeEndProps = {
  title: string;
} & PropsWithChildren;

export const DropdownTreeEnd = withAs(
  (Component, props: DropdownTreeEndProps) => {
    const { title, children, ...rest } = props;
    return (
      <Component className="dropdown-tree-end" {...rest}>
        <span className="text-h5">
          {title} <ArrowRight width={24} height={24} />
        </span>
        <span className="text-paragraph-1">{children}</span>
      </Component>
    );
  }
);
