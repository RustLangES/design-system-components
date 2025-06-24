import {
  Button,
  Example,
  Github,
  Tag,
  Telegram,
  Flap,
  Chip,
  Level,
  Collaborators,
  Radio,
  Badge,
  DropdownState,
} from "@rustlanges/react";
import { ShowComponent } from "./ShowComponent";

const collaborator = {
  avatarUrl:
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  nickname: "Colaborador",
};

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
      <ShowComponent
        title="Level"
        propsDef={{
          variant: {
            type: "string",
            options: ["n1", "n2", "n3", "op"],
            default: "n1",
          },
          label: {
            type: "string",
            default: "Oficial",
          },
          as: {
            type: "string",
            options: ["a", "button", "span"],
            default: "span",
          },
        }}
        component={Level}
      />

      <ShowComponent title="Collaborators">
        <div className="grid w-full justify-center gap-4">
          <div className="w-60">
            <Collaborators
              collaborators={[
                collaborator,
                collaborator,
                collaborator,
                collaborator,
              ]}
              sourceUrl="https://github.com/RustLangES/design-system-components"
            />
          </div>
          <div className="w-60">
            <Collaborators
              collaborators={[collaborator]}
              sourceUrl="https://github.com/RustLangES/design-system-components"
            />
          </div>
          <div className="w-60">
            <Collaborators
              collaborators={[
                collaborator,
                collaborator,
                collaborator,
                collaborator,
                collaborator,
                collaborator,
                collaborator,
              ]}
              sourceUrl="https://github.com/RustLangES/design-system-components"
            />
          </div>
        </div>
      </ShowComponent>
      <ShowComponent
        title="Radio"
        component={Radio}
        propsDef={{
          checked: {
            type: "boolean",
            default: false,
            optional: true,
          },
        }}
      />
      <ShowComponent
        title="Badge"
        component={Badge}
        propsDef={{
          variant: {
            type: "string",
            options: ["completed", "pending", "reading", "unread"],
            default: "completed",
          },
          type: {
            type: "string",
            default: "numeric",

            options: ["default", "numeric", "text"] as unknown as ["numeric"],
          },
          count: {
            type: "string",
            default: 1,
            optional: false,
          },
        }}
      />
      <ShowComponent
        component={DropdownState}
        title="Dropdown State"
        propsDef={{
          onChange: {
            type: "callback",
            default: console.log,
          },
          value: {
            type: "string",
            options: ["completed", "pending", "reading", "unread"],
            default: "completed",
          },
        }}
      />
      <ShowComponent title="Scroll bar ">
        <div className="scrollbar mx-auto h-48 w-full overflow-auto">
          <div className="mx-auto flex h-96 w-20 items-center">Container</div>
        </div>
      </ShowComponent>
    </div>
  );
}
