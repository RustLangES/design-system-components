import { CaseDef, PropDef, PropKind } from "./case";
import { Reset } from "./icons";
import { createEffect, createSignal, h, Match, MiniUI, Show } from "./miniui";

const PROP_KIND_DEFAULTS: { [K in PropKind]: any } = {
  raw: undefined,
  string: "",
  boolean: false,
  callback: () => {},
  number: 0,
  function: () => {},
};

function normalizeProp(
  propName: string,
  prop: CaseDef<unknown>["props"][string]
): Required<PropDef> {
  if (typeof prop === "string") {
    return {
      displayName: propName,
      kind: prop,
      disabled: false,
      hidden: false,
      options: [],
      default: PROP_KIND_DEFAULTS[prop],
      optional: true,
    } satisfies Required<PropDef>;
  }

  return {
    default: PROP_KIND_DEFAULTS[prop.kind],
    displayName: propName,
    disabled: false,
    hidden: false,
    optional: true,
    options: [],
    ...prop,
  } satisfies Required<PropDef>;
}

export function normalizeProps(
  props: CaseDef<unknown>["props"]
): Required<PropDef>[] {
  return Object.entries(props).map(([propName, propDef]) =>
    normalizeProp(propName, propDef)
  );
}

export function prepareProps(props: CaseDef<unknown>["props"]): {
  defs: ShowcaseFieldProps[];
  componentProps: Record<string, MiniUI.Signal<unknown>>;
  componentEvents: Record<string, MiniUI.Signal<void>>;
} {
  const normalizedProps = normalizeProps(props);

  const defs: ShowcaseFieldProps[] = [];
  const componentProps: [string, MiniUI.Signal<unknown>][] = [];
  const componentEvents: [string, MiniUI.Signal<void>][] = [];

  for (const propDef of normalizedProps) {
    if (propDef.kind === "callback") {
      const valueSignal = createSignal(false as unknown);

      let timeout: NodeJS.Timeout;
      createEffect(() => {
        if (timeout) clearTimeout(timeout);
        if (valueSignal()) timeout = setTimeout(() => valueSignal(false), 100);
      });

      defs.push({
        ...propDef,
        valueSignal,
      });
      componentEvents.push([
        propDef.displayName,
        () => {
          valueSignal(true);
        },
      ]);
    } else {
      const valueSignal = createSignal(propDef.default);

      defs.push({
        ...propDef,
        valueSignal,
      });
      componentProps.push([propDef.displayName, valueSignal]);
    }
  }

  return {
    defs,
    componentProps: Object.fromEntries(componentProps),
    componentEvents: Object.fromEntries(componentEvents),
  };
}

export type ShowcaseFieldProps = Required<PropDef> & {
  valueSignal: MiniUI.WritableSignal<unknown>;
};

export function ShowcaseField(fieldDef: ShowcaseFieldProps) {
  const {
    displayName,
    // `default` is a reserved keyword
    default: default_,
    optional,
    kind,
    valueSignal,
  } = fieldDef;

  const modified = createSignal(false);

  return (
    <div class="flex w-full items-center">
      <label class="w-full">
        {displayName}
        <span class={optional ? "text-cyan-700" : "text-red-700"}>
          {optional ? "?" : "*"}
        </span>
      </label>
      <Show when={modified}>
        <button
          class="border-1 shadow-brutal mr-1 flex h-[1.7rem] min-w-[1.7rem] items-center justify-center rounded-sm"
          // Ignore label events
          onClick={() => {
            valueSignal(default_);
            modified(false);
          }}
        >
          <Reset />
        </button>
      </Show>
      <Match
        value={kind}
        props={{
          ...fieldDef,
          modified,
        }}
        cases={{
          boolean: ShowcaseFieldBoolean,
          callback: ShowcaseFieldCallback,
          function: ShowcaseFieldFunction,
          number: ShowcaseFieldNumber,
          raw: () => [],
          string: ShowcaseFieldString,
        }}
      />
    </div>
  );
}

export type ShowcaseTypeFieldProps = ShowcaseFieldProps & {
  modified: MiniUI.WritableSignal<boolean>;
};

export function ShowcaseFieldBoolean({
  modified,
  valueSignal,
}: ShowcaseTypeFieldProps): MiniUI.Node {
  return (
    <button
      class="border-1 shadow-brutal flex h-[1.7rem] min-w-[1.7rem] cursor-pointer items-center justify-center rounded-sm"
      onClick={() => {
        modified(true);
        valueSignal(!valueSignal());
      }}
    >
      <span
        class={() => [
          valueSignal() ? "block" : "hidden",
          "rounded-xs h-[1rem] w-[1rem] bg-black",
        ]}
      />
    </button>
  );
}

export function ShowcaseFieldFunction(): MiniUI.Node {
  return (
    <input
      disabled
      class={[
        "border-1 h-[1.7rem] w-[150px] cursor-not-allowed rounded-sm border-neutral-400 px-1",
        "text-neutral-400",
        "bg-neutral-100 dark:bg-neutral-900",
      ]}
      value="function"
    />
  );
}

export function ShowcaseFieldCallback({
  valueSignal,
}: ShowcaseTypeFieldProps): MiniUI.Node {
  return (
    <p
      class={() => [
        "border-1 shadow-brutal",
        "h-[1.7rem] min-w-[150px] px-1 py-1",
        "rounded-sm text-center text-base",
        (valueSignal() as boolean) && "bg-green-400",
      ]}
    >
      Callback
    </p>
  );
}

export function ShowcaseFieldNumber({
  modified,
  valueSignal,
}: ShowcaseTypeFieldProps): MiniUI.Node {
  return (
    <input
      type="number"
      class="border-1 shadow-brutal h-[1.7rem] max-w-[150px] rounded-sm px-1"
      use={ref => {
        createEffect(() => {
          ref.valueAsNumber = valueSignal() as number;
        });
      }}
      onChange={e => {
        modified(true);
        valueSignal(e.currentTarget.valueAsNumber);
      }}
    />
  );
}

export function ShowcaseFieldString({
  default: default_,
  modified,
  options,
  valueSignal,
}: ShowcaseTypeFieldProps): MiniUI.Node {
  return options.length ? (
    <select
      value={default_ as string}
      use={ref => {
        createEffect(() => {
          ref.value = valueSignal() as string;
        });
      }}
      onChange={e => {
        modified(true);
        valueSignal(e.currentTarget.value);
      }}
    >
      {!default_ && (
        <option disabled selected value={undefined}>
          - select -
        </option>
      )}
      {options.map(optionToSelect => (
        <option
          selected={() => optionToSelect === valueSignal()}
          value={optionToSelect as string}
        >
          {optionToSelect}
        </option>
      ))}
    </select>
  ) : (
    <textarea
      class={[
        "pt-1",
        "h-[1.7rem] min-h-[1.7rem] w-[150px] min-w-[150px] max-w-[150px]",
        "border-1 rounded-sm border-black px-1",
        "text-base text-black dark:text-white",
        "bg-light dark:bg-neutral-950",
      ]}
      use={ref => {
        createEffect(() => {
          ref.value = valueSignal() as string;
        });
      }}
      onInput={ev => {
        modified(true);
        valueSignal(ev.currentTarget.value);
      }}
    />
  );
}
