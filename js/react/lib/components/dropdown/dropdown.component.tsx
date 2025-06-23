import { cn } from "@/utils/tw-merge";
import { BADGE_TEXT, BadgeVariants } from "../badge/badge.const";
import { useState } from "react";
import { ArrowDown, ArrowUp } from "@/icons";
import { Badge } from "../badge";
import { DROPDOWN_OPTIONS, DROPDOWN_STATUS_VARIANTS } from "./dropdown.const";

type DropdownStateProps = {
  value: BadgeVariants;
  onChange: (value: BadgeVariants) => void;
};

export const DropdownState = ({ value, onChange }: DropdownStateProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(status => !status);

  const handleSelect = (val: BadgeVariants) => {
    onChange(val);
    setOpen(false);
  };

  const Icon = open ? ArrowUp : ArrowDown;

  return (
    <div className="relative grid w-fit">
      <button
        onClick={handleOpen}
        className={cn([
          "shadow-rb-black text-paragraph-2 flex h-6 items-center gap-1 overflow-hidden rounded-sm border border-black",
          DROPDOWN_STATUS_VARIANTS[value],
          "text-[12px]",
        ])}
      >
        <div className="ml-2 size-1 rounded-full" />
        <span className="mr-2">{BADGE_TEXT[value]}</span>
        <Icon
          className={cn([
            "size-6 rounded-r-sm border-l border-l-black",
            "bg-white text-black",
            "dark:bg-dark dark:text-neutral-50",
          ])}
        />
      </button>
      <div
        className={cn([
          "absolute left-0 top-full mt-2 w-full transition duration-200",
          open ? "visible opacity-100" : "invisible opacity-0",
        ])}
      >
        {open && (
          <ul className="options shadow-rb-black dark:bg-dark grid gap-1.5 rounded-sm border border-black bg-white px-2 py-1.5 transition">
            {DROPDOWN_OPTIONS.map(opt => (
              <li
                key={opt.value}
                className="option cursor-pointer"
                onClick={() => handleSelect(opt.value)}
              >
                <Badge type="text" variant={opt.value} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
