import { Button, Example, Github, Telegram } from "@rustlanges/react";
import { ShowComponent } from "./ShowComponent";

export function App() {
  return (
    <div className="px-5 max-w-[1024px] mx-auto mt-10">
      <h1 className="text-5xl font-bold text-center mb-5">
        RustLangES Components
      </h1>
      <p className="text-center text-xs">
        Change your computer theme to explore the different styles (light, dark)
      </p>
      <ShowComponent
        title="Example With Props Definition"
        propsDef={{
          text: {
            type: "string",
            options: ["option", "value"],
            default: "option",
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

      <ShowComponent
        title="Button"
        propsDef={{
          variant: {
            type: "string",
            options: ["primary", "secondary", "text", "icon"],
            default: "primary",
          },
          label: {
            type: "string",
            default: "Botón",
          },
          disabled: {
            type: "boolean",
            default: false,
          },
          icon: {
            type: "function",
          },
        }}
        component={Button}
      />
      <ShowComponent title="Button with icon">
        <Button variant="primary" icon={<Telegram />} label="Botón" />
        <Button variant="secondary" icon={<Telegram />} label="Botón" />
        <Button variant="icon" icon={<Github />} />
      </ShowComponent>
    </div>
  );
}
