import { useEffect } from "react";
import { NormalizedProps } from "./types";

export function ShowComponentField(
  { name, def, setValue, modified, setModified, ...props }: {
    name: string;
    def: NormalizedProps[string];
    value: unknown;
    setValue(v: unknown): void;
    modified: boolean;
    setModified(v: boolean): void;
  },
) {
  const value = !def.optional || modified ? props.value : def.default;

  useEffect(() => {
    if (def.type === "callback" && value) {
      const timer = setTimeout(() => setValue(false), 100);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div className="w-full flex items-center">
      <label className="w-full">
        {name}
        <span className={def.optional ? "text-cyan-700" : "text-red-700"}>
          {def.optional ? "?" : "*"}
        </span>
      </label>
      {modified && (
        <button
          className="flex justify-center items-center min-w-[1.7rem] h-[1.7rem] border-1 rounded-sm shadow-brutal mr-1"
          // Ignore label events
          onClick={() => {
            setValue(def.default);
            setModified(false);
          }}
        >
          <svg
            fill="currentColor"
            strokeWidth="0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
          >
            <path d="M463.5 224h8.5c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2S461.9 48.1 455 55l-41.6 41.6c-87.6-86.5-228.7-86.2-315.8 1-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2S334.3 224 344 224h119.5z" />
          </svg>
        </button>
      )}
      {def.type === "string"
        ? (
          <textarea
            className="max-w-[150px] min-h-[1.7rem] h-[1.7rem] border-1 rounded-sm shadow-brutal px-1"
            value={value as string}
            onChange={(ev) => {
              setModified(true);
              setValue(ev.currentTarget.value);
            }}
          />
        )
        : def.type === "boolean"
        ? (
          <>
            <button
              className="flex justify-center items-center min-w-[1.7rem] h-[1.7rem] border-1 shadow-brutal rounded-sm cursor-pointer"
              onClick={() => {
                setModified(true);
                setValue(!props.value);
              }}
            >
              <span
                className={(props.value ? "block" : "hidden") +
                  " bg-black w-[1rem] h-[1rem] rounded-xs"}
              />
            </button>
          </>
        )
        : def.type === "object"
        ? (
          <input
            disabled
            className="max-w-[150px] h-[1.7rem] border-1 rounded-sm shadow-brutal px-1 bg-gray-300 cursor-not-allowed"
            value="object"
          />
        )
        : def.type === "function"
        ? (
          <input
            disabled
            className="w-[150px] h-[1.7rem] border-1 rounded-sm shadow-brutal px-1 bg-gray-300 cursor-not-allowed"
            value="function"
          />
        )
        : def.type === "callback"
        ? (
          <p
            className={"min-w-[150px] h-[1.7rem] border-1 rounded-sm shadow-brutal px-1 text-center " +
              (props.value ? "bg-green-400" : "")}
          >
            Callback
          </p>
        )
        : null}
    </div>
  );
}
