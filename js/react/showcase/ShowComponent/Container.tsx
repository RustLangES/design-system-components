import { PropsWithChildren } from "react";

import { ChevronDown } from "../icons";

export function ShowComponentContainer(
  props: PropsWithChildren<{
    title: React.ReactNode;
    className?: string;
    contentClassName?: string;
  }>
) {
  return (
    <details
      className={
        "border-1 shadow-brutal details-content:flex mb-5 rounded-sm border-black px-3 py-2 " +
        props.className
      }
    >
      <summary className="in-open:border-b-1 flex list-none items-center justify-between border-b-0 border-b-gray-300 pr-3 text-lg marker:hidden">
        <span className="flex items-center gap-2">{props.title}</span>
        <span className="in-open:rotate-0 rotate-[-90deg] text-2xl transition">
          <ChevronDown />
        </span>
      </summary>
      <div className={"flex gap-2 " + props.contentClassName}>
        {props.children}
      </div>
    </details>
  );
}
