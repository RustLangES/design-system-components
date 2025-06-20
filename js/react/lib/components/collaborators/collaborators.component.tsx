import { Fragment } from "react/jsx-runtime";
import { Github } from "../../icons";
import { Avatar } from "../avatar/avatar.component";
import { MAX_COLLABORATORS } from "./collaborators.const";
import { Button } from "../button";

type Collaborator = {
  avatarUrl: string;
  nickname: string;
};

type CollaboratorsProps = {
  collaborators: Array<Collaborator>;
  sourceUrl: string;
};

export const Collaborators = ({
  collaborators = [],
  sourceUrl,
}: CollaboratorsProps) => {
  const numberOfCollaborators = collaborators.length;
  const isSingleCollaborator = numberOfCollaborators === 1;

  const hasMaxCollaborators = numberOfCollaborators > MAX_COLLABORATORS;
  const extraCollaborators = numberOfCollaborators - MAX_COLLABORATORS;
  return (
    <div className="flex h-12 w-full items-center justify-between">
      <div className="flex w-fit items-center">
        {collaborators.slice(0, MAX_COLLABORATORS).map((collaborator, idx) => {
          const space = idx ? 12 : 0;
          return (
            <Fragment>
              <Avatar
                avatarUrl={collaborator.avatarUrl}
                style={{ marginLeft: `-${space}px` }}
                as="div"
              />
            </Fragment>
          );
        })}

        {isSingleCollaborator ? (
          <span className="text-caption pl-2">{collaborators[0].nickname}</span>
        ) : null}

        {hasMaxCollaborators ? (
          <span className="text-caption pl-2">+{extraCollaborators}</span>
        ) : null}
      </div>

      <Button
        as="a"
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        icon={<Github />}
        variant="icon"
      />
    </div>
  );
};
