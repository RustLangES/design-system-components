import { PropsWithChildren } from "react";

import { ChevronDown } from "../icons";
import { h } from "../miniui";

export function ShowComponentContainer(
  props: PropsWithChildren<{
    title: React.ReactNode;
    class?: string;
    contentClassName?: string;
  }>
) {
  return (
    <details
      class={
        "border-1 shadow-brutal details-content:flex mb-5 rounded-sm border-black px-3 py-2 " +
        props.class
      }
    >
      <summary class="in-open:border-b-1 flex list-none items-center justify-between border-b-0 border-b-gray-300 pr-3 text-lg marker:hidden">
        <span class="flex items-center gap-2">{props.title}</span>
        <span class="in-open:rotate-0 rotate-[-90deg] text-2xl transition">
          <ChevronDown />
        </span>
      </summary>
      <div class={"flex flex-col gap-5 sm:flex-row " + props.contentClassName}>
        {props.children}
      </div>
    </details>
  );
}
