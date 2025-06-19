import {
  Button,
  Example,
  Github,
  Tag,
  Telegram,
  Flap,
  Chip,
} from "@rustlanges/react";
import { ShowComponent } from "./ShowComponent";

export function App() {
  return (
    <div className="mx-auto mt-10 max-w-[1024px] px-5">
      <h1 className="mb-5 text-center text-5xl font-bold">
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
          className: {
            type: "string",
          },
        }}
        component={Button}
      />
      <ShowComponent title="Button with icon">
        <Button variant="primary" icon={<Telegram />} label="Botón" />
        <Button variant="secondary" icon={<Telegram />} label="Botón" />
        <Button variant="icon" icon={<Github />} />
      </ShowComponent>
      <ShowComponent
        title="Chip"
        propsDef={{
          variant: {
            type: "string",
            options: [
              "featured",
              "numeric",
              "description",
              "location",
              "small",
            ],
            default: "featured",
          },
          label: {
            type: "string",
            default: "Destacado",
          },
          className: {
            type: "string",
          },
        }}
        component={Chip}
      />
      <ShowComponent
        title="Tag"
        component={Tag}
        propsDef={{
          label: {
            type: "string",
            default: "#tag",
          },
          selected: {
            type: "boolean",
            default: false,
            optional: true,
          },
          as: {
            type: "string",
            options: ["span", "button", "a"],
            optional: true,
          },

          onClick: {
            type: "callback",
            optional: true,
          },
        }}
      />
      <ShowComponent
        title="Flap"
        propsDef={{
          variant: {
            type: "string",
            options: ["highlight", "descriptive", "numeric"],
            default: "descriptive",
          },
          label: {
            type: "string",
            default: "Oficial",
          },
        }}
        component={Flap}
      />
    </div>
  );
}
