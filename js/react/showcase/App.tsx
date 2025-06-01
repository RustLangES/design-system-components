import { Example } from "@rustlanges/react";
import { ShowComponent } from "./ShowComponent";

export function App() {
  return (
    <div className="px-5 max-w-[1024px] mx-auto mt-10">
      <h1 className="text-5xl font-bold text-center mb-5">
        RustLangES Components
      </h1>
      <ShowComponent
        title="Example With Props Definition"
        propsDef={{
          text: {
            type: "string",
            optional: true,
          },
          boolean: {
            type: "boolean",
            optional: true,
            default: true,
          },
          object: {
            type: "object",
            optional: true,
          },
          required: {
            type: "string",
          },
          function: {
            type: "function",
            optional: true,
          },
          callback: {
            type: "callback",
            optional: true,
          },
        }}
        component={Example}
      />
      <ShowComponent title="Example With children">
        <Example required="" />
        <Example required="" boolean />
      </ShowComponent>
    </div>
  );
}
