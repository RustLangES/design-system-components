import { PropsWithChildren } from "react";

import { ChevronDown } from "../icons";

export function ShowComponentContainer(
  props: PropsWithChildren<
    { title: React.ReactNode; className?: string; contentClassName?: string }
  >,
) {
  return (
    <details
      className={"border-1 rounded-sm border-black shadow-brutal px-3 py-2 mb-5 details-content:flex " +
        props.className}
    >
      <summary className="flex justify-between items-center pr-3 marker:hidden list-none text-lg border-b-0 border-b-gray-300 in-open:border-b-1">
        <span className="flex items-center gap-2">
          {props.title}
        </span>
        <span className="text-2xl rotate-[-90deg] in-open:rotate-0 transition">
          <ChevronDown />
        </span>
      </summary>
      <div className={"flex gap-2 " + props.contentClassName}>
        {props.children}
      </div>
    </details>
  );
}
