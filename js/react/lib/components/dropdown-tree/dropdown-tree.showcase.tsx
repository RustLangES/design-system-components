import { registerCase } from "@rustlanges/showcase";
import { Fragment } from "react/jsx-runtime";
import { DropdownTree } from ".";

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

registerCase("Dropdown Tree", () => {
  return (
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
          Conoce todos nuestros <strong>proyectos Open Source</strong> en los
          que puedes contribuir y potenciar tu aprendizaje 🚀
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
          Conoce todos nuestros <strong>proyectos Open Source</strong> en los
          que puedes contribuir y potenciar tu aprendizaje 🚀
        </DropdownTree.End>
      </div>
    </div>
  );
});
