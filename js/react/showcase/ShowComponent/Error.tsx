import { BombIcon } from "../icons";
import { ShowComponentContainer } from "./Container";

export function ShowComponentError(
  { title, error: err }: { title: string; error: Error },
) {
  return (
    <ShowComponentContainer
      title={
        <>
          <BombIcon /> {title}
        </>
      }
      className="bg-red-300"
      contentClassName="flex-col"
    >
      <span className="text-xl font-bold">
        {err.message}
      </span>
      {(err.stack?.split?.("\n") ?? []).map((line) => {
        // really last @
        const [, name, source_ = ""] = line.match(/(.*)@([^@]*)$/) ??
          [, line];

        let source = source_;

        if (
          source.startsWith("vite/client") ||
          source.startsWith("react-refresh") ||
          name.includes("/node_modules/") ||
          name.startsWith("__require") ||
          name.trim().length === 0
        ) {
          return;
        }

        source = source.startsWith(location.origin)
          ? source.substring(location.origin.length)
          : source;

        // match to <source-file>?<timestamp-or-version>:<line>:<column>
        const [, sourceFile, lineN, columnN] =
          source.match(/^(.+)?(?:t=\d+|v=\w+):(\d+):(\d+)$/) ??
            [, source, "", ""];
        source = `${sourceFile}${lineN}:${columnN}`;

        return (
          <span key={line} className="w-full flex justify-between">
            <span className="font-semibold">{name}</span>
            <span
              className={!source.startsWith("/node_modules")
                ? "font-semibold"
                : ""}
            >
              {source}
            </span>
          </span>
        );
      })}
    </ShowComponentContainer>
  );
}
