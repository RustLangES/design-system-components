<script setup lang="ts">
import Showcase from "@rustlanges/showcase/vue";
import RsDropdownTreeStart from "./rs-dropdown-tree-start.vue";
import RsDropdownTreeSubject from "./rs-dropdown-tree-subject.vue";
import RsDropdownTreeTopic from "./rs-dropdown-tree-topic.vue";
import RsDropdownTreeSubTopic from "./rs-dropdown-tree-subtopic.vue";
import RsDropdownTreeEnd from "./rs-dropdown-tree-end.vue";
</script>

<template>
  <Showcase name="DropdownTree">
    <RsDropdownTreeStart
      variant="default"
      level="n1"
      state="completed"
      title="Introducción a Rust"
    >
      <RsDropdownTreeSubject
        level="n1"
        state="completed"
        title="Título del tema"
        name="subject"
        value="a"
      >
        <RsDropdownTreeTopic level="n1" state="reading" title="Tópico">
          <RsDropdownTreeSubTopic
            level="n1"
            state="completed"
            title="Subtópico"
          />
          <RsDropdownTreeSubTopic level="n1" state="reading" title="Subtópico" />
          <RsDropdownTreeSubTopic level="n1" state="pending" title="Subtópico" />
        </RsDropdownTreeTopic>
        <RsDropdownTreeEnd title="Continúa aprendiendo">
          Conoce todos nuestros proyectos Open Source.
        </RsDropdownTreeEnd>
      </RsDropdownTreeSubject>
    </RsDropdownTreeStart>
  </Showcase>
</template>
