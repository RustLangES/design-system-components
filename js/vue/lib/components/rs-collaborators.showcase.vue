<script setup lang="ts">
import Showcase from "@rustlanges/showcase/vue";
import RsCollaborators from "./rs-collaborators.vue";

const collaborator = {
  avatarUrl:
    "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
  nickname: "Colaborador",
};

const sourceUrl = "https://github.com/RustLangES/design-system-components";

const fourCollaborators = Array.from({ length: 4 }, () => ({ ...collaborator }));
const singleCollaborator = [collaborator];
const sevenCollaborators = Array.from({ length: 7 }, () => ({ ...collaborator }));
</script>

<template>
  <Showcase name="Collaborators">
    <div class="grid w-full justify-center gap-4">
      <div class="w-60">
        <RsCollaborators
          :collaborators="fourCollaborators"
          :source-url="sourceUrl"
        />
      </div>
      <div class="w-60">
        <RsCollaborators
          :collaborators="singleCollaborator"
          :source-url="sourceUrl"
        />
      </div>
      <div class="w-60">
        <RsCollaborators
          :collaborators="sevenCollaborators"
          :source-url="sourceUrl"
        />
      </div>
    </div>
  </Showcase>
</template>
