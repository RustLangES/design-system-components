import { useBoolean } from "@/hooks/use-boolean";
import { Filter } from "@/icons/filter";
import { Search } from "@/icons/search";
import { cn } from "@/utils/tw-merge";
import { Fragment } from "react/jsx-runtime";
import { Tag } from "../tag";
import { InputHTMLAttributes } from "react";

type Option = { label: string; value: string };
type InputSearchProps = {
  filters?: Array<Option>;
  activeFilters?: Array<Option>;
  onChangeFilter?: (option: Array<Option>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputSearch = ({
  className,
  filters,
  activeFilters = [],
  onChangeFilter,
  ...props
}: InputSearchProps) => {
  const filterModal = useBoolean();

  const hasFilter = filters?.length;

  const handleSelectFilter = (filter: Option, isSelected: boolean) => {
    if (!isSelected) return onChangeFilter?.([...activeFilters, filter]);
    onChangeFilter?.(
      activeFilters.filter(({ value }) => value !== filter.value)
    );
  };

  const handleCloseOnClickInput = () => hasFilter && filterModal.setFalse();

  return (
    <div className={cn(["rustlanges-input-search-container", className])}>
      <label
        className={cn([
          "rustlanges-input-search",
          hasFilter && "rustlanges-input-search--filter",
        ])}
      >
        <Search className="" width={24} height={24} />
        <input
          type="text"
          placeholder="Buscar"
          onClick={handleCloseOnClickInput}
          className="text-caption"
          {...props}
        />
      </label>
      <div className="rustlanges-input-search__filter">
        {hasFilter ? (
          <Fragment>
            <button onClick={filterModal.toggle} tabIndex={0}>
              <Filter width={24} height={24} />
            </button>
          </Fragment>
        ) : null}
        <div
          className={cn([
            "rustlanges-input-search-backdrop__content",
            filterModal.value
              ? "rustlanges-input-search-backdrop__content--open"
              : "rustlanges-input-search-backdrop__content--closed",
          ])}
        >
          {filterModal.value && (
            <Fragment>
              <ul className="rustlanges-input-search-backdrop__list">
                {filters?.map(filter => {
                  const isSelected = activeFilters?.some(
                    ({ value }) => value === filter.value
                  );
                  return (
                    <li
                      key={filter.value}
                      onClick={() => handleSelectFilter(filter, isSelected)}
                    >
                      <Tag
                        as="button"
                        tabIndex={0}
                        selected={isSelected}
                        label={filter.label}
                      />
                    </li>
                  );
                })}
              </ul>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};
