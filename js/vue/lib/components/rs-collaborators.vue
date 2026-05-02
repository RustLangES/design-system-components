<script setup lang="ts">
import { computed } from "vue";
import RsAvatar from "./rs-avatar.vue";
import RsButton from "./rs-button.vue";
import RsGithub from "../icons/rs-github.vue";

const MAX_COLLABORATORS = 4;

type Collaborator = {
  avatarUrl: string;
  nickname: string;
};

const props = withDefaults(
  defineProps<{
    collaborators?: Collaborator[];
    sourceUrl: string;
  }>(),
  {
    collaborators: () => [],
  }
);

const visibleCollaborators = computed(() =>
  props.collaborators.slice(0, MAX_COLLABORATORS)
);

const isSingle = computed(() => props.collaborators.length === 1);

const extraCount = computed(() =>
  props.collaborators.length > MAX_COLLABORATORS
    ? props.collaborators.length - MAX_COLLABORATORS
    : 0
);
</script>

<template>
  <div class="rustlanges-collaborators">
    <div class="rustlanges-collaborators__avatars">
      <RsAvatar
        v-for="(collab, idx) in visibleCollaborators"
        :key="idx"
        :avatar-url="collab.avatarUrl"
        :alt="collab.nickname"
        :style="{ marginLeft: idx ? '-12px' : '0' }"
      />

      <span v-if="isSingle" class="text-caption pl-2">
        {{ collaborators[0]?.nickname }}
      </span>

      <span v-if="extraCount > 0" class="text-caption pl-2">
        +{{ extraCount }}
      </span>
    </div>

    <RsButton
      as="a"
      variant="icon"
      :href="sourceUrl"
      target="_blank"
      rel="noopener noreferrer"
    >
      <template #icon>
        <RsGithub />
      </template>
    </RsButton>
  </div>
</template>
