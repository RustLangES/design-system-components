import { registerCase } from "@rustlanges/showcase";
import { Collaborators } from "./collaborators.component";

const collaborator = {
  avatarUrl:
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  nickname: "Colaborador",
};

registerCase("Collaborators", () => {
  return (
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
  );
});
