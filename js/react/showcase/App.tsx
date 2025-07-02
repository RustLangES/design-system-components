import {
  Button,
  ContactForm,
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
  Card,
  Calendar,
  CalendarRangeDate,
  DropdownTree,
} from "@rustlanges/react";
import { ShowComponent } from "./ShowComponent";
import { Fragment, useState } from "react";

const collaborator = {
  avatarUrl:
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  nickname: "Colaborador",
};

const tree = {
  title: "Introducción a Rust",
  state: "completed" as const,
  level: "n1" as const,
  subjects: [
    {
      title: "Aprende lo básico",
      state: "completed" as const,
      level: "n1" as const,
      topics: [
        {
          title: "Sintaxis básica",
          state: "completed" as const,
          level: "n1" as const,
          subtopics: [
            {
              title: "Variables y declaraciones",
              state: "completed" as const,
              level: "n1" as const,
            },
            {
              title: "Constantes y variables estáticas",
              state: "completed" as const,
              level: "n1" as const,
            },
            {
              title: "Shadowing",
              state: "completed" as const,
              level: "n1" as const,
            },
            {
              title: "Control de flujo",
              state: "completed" as const,
              level: "n1" as const,
            },
          ],
        },
        {
          title: "Ownership y Borrowing",
          state: "completed" as const,
          level: "n1" as const,
        },
        {
          title: "Tipos de datos primitivos",
          state: "completed" as const,
          level: "n1" as const,
        },
        {
          title: "Tipos de datos complejos",
          state: "completed" as const,
          level: "n1" as const,
        },
      ],
    },
    {
      title: "Manejo de errores",
      state: "completed" as const,
      level: "n2" as const,
      topics: [],
    },
    {
      title: "Cargo",
      state: "completed" as const,
      level: "n1" as const,
      topics: [],
    },
    {
      title: "Traits",
      state: "completed" as const,
      level: "n1" as const,
      topics: [],
    },
    {
      title: "Punteros inteligentes",
      state: "completed" as const,
      level: "n2" as const,
      topics: [],
    },
    {
      title: "Concurrencia y Paralelismo",
      state: "completed" as const,
      level: "n2" as const,
      topics: [],
    },
    {
      title: "Interoperabilidad",
      state: "completed" as const,
      level: "op" as const,
      topics: [],
    },
    {
      title: "Ecosistemas y librerías",
      state: "completed" as const,
      level: "op" as const,
      topics: [],
    },
  ],
};

export function App() {
  const [single, setSingle] = useState<Date | null>(new Date());
  const [multiple, setMultiple] = useState<Record<string, Date> | null>(null);
  const [range, setRange] = useState<CalendarRangeDate | null>(null);

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
      <ShowComponent title="Contact Form">
        <ContactForm />
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
      <ShowComponent
        title="Card"
        propsDef={{
          clickable: {
            type: "boolean",
            default: false,
          },
          disabled: {
            type: "boolean",
            default: false,
          },
          className: {
            type: "string",
            default: "min-w-50 min-h-50"
          },
          onClick: {
            type: "callback",
          },
        }}
        component={Card}
      />
      <ShowComponent title="Scroll bar ">
        <div className="scrollbar mx-auto h-48 w-full overflow-auto">
          <div className="mx-auto flex h-96 w-20 items-center">Container</div>
        </div>
      </ShowComponent>
      <ShowComponent title="Calendar">
        <Calendar type="single" onChange={setSingle} value={single} />
        <Calendar type="multiple" onChange={setMultiple} value={multiple} />
        <Calendar type="range" onChange={setRange} value={range} />
      </ShowComponent>
      <ShowComponent title="Dropdown Tree">
        <div className="flex flex-wrap gap-x-10 gap-y-4 sm:grid sm:grid-cols-2">
          <div className="flex flex-col gap-4">
            <DropdownTree.Start
              level={tree.level}
              state={tree.state}
              title={tree.title}
              variant="default"
            >
              {tree.subjects.map(subject => (
                <DropdownTree.Subject
                  level={subject.level}
                  state={subject.state}
                  title={subject.title}
                  name={tree.title}
                  id={subject.title}
                >
                  {subject.topics.map(topic => (
                    <DropdownTree.Topic
                      level={topic.level}
                      state={topic.state}
                      title={topic.title}
                    >
                      {topic.subtopics?.map(subtopic => (
                        <DropdownTree.SubTopic
                          level={subtopic.level}
                          state={subtopic.state}
                          title={subtopic.title}
                        />
                      ))}
                    </DropdownTree.Topic>
                  ))}
                </DropdownTree.Subject>
              ))}
            </DropdownTree.Start>
            <DropdownTree.End as="a" href="" title="Continúa aprendiendo">
              Conoce todos nuestros <strong>proyectos Open Source</strong> en
              los que puedes contribuir y potenciar tu aprendizaje 🚀
            </DropdownTree.End>
          </div>

          <div className="flex flex-col gap-4">
            <DropdownTree.Start
              level={tree.level}
              state={tree.state}
              title={tree.title}
              variant="extended"
            >
              {tree.subjects.map(subject => (
                <Fragment>
                  {subject.topics.map(topic => (
                    <DropdownTree.Topic
                      level={topic.level}
                      state={topic.state}
                      title={topic.title}
                    >
                      {topic.subtopics?.map(subtopic => (
                        <DropdownTree.SubTopic
                          level={subtopic.level}
                          state={subtopic.state}
                          title={subtopic.title}
                        />
                      ))}
                    </DropdownTree.Topic>
                  ))}
                </Fragment>
              ))}
            </DropdownTree.Start>
            <DropdownTree.Start
              level={tree.level}
              state={tree.state}
              title="Manejo de errores"
              variant="extended"
            >
              {tree.subjects.map(subject => (
                <Fragment>
                  {subject.topics.map(topic => (
                    <DropdownTree.Topic
                      level={topic.level}
                      state={topic.state}
                      title={topic.title}
                    >
                      {topic.subtopics?.map(subtopic => (
                        <DropdownTree.SubTopic
                          level={subtopic.level}
                          state={subtopic.state}
                          title={subtopic.title}
                        />
                      ))}
                    </DropdownTree.Topic>
                  ))}
                </Fragment>
              ))}
            </DropdownTree.Start>
            <DropdownTree.End as="a" href="" title="Continúa aprendiendo">
              Conoce todos nuestros <strong>proyectos Open Source</strong> en
              los que puedes contribuir y potenciar tu aprendizaje 🚀
            </DropdownTree.End>
          </div>
        </div>
      </ShowComponent>
    </div>
  );
}
