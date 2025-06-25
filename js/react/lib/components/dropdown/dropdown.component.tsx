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
    <div className="rustlanges-dropdown">
      <button
        onClick={handleOpen}
        className={cn([
          "text-paragraph-2 rustlanges-dropdown__view",
          DROPDOWN_STATUS_VARIANTS[value],
        ])}
      >
        <div className="rustlanges-dropdown__view-dot" />
        <span className="mr-2">{BADGE_TEXT[value]}</span>
        <Icon className={cn(["rustlanges-dropdown__view-icon"])} />
      </button>
      <div
        className={cn([
          "rustlanges-dropdown__content",
          open
            ? "rustlanges-dropdown__content--open"
            : "rustlanges-dropdown__content--closed",
        ])}
      >
        {open && (
          <ul className="rustlanges-dropdown__list">
            {DROPDOWN_OPTIONS.map(opt => (
              <li
                key={opt.value}
                className="rustlanges-dropdown__list-item"
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
