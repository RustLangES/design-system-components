<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import RsLocation from "../icons/rs-location.vue";
import RsButton from "./rs-button.vue";

const ERROR_MESSAGE = "Mensaje de error";

const BASE_INPUT_CLASS = [
  "w-full p-2 rounded-md border outline-none transition",
  "bg-white text-black dark:bg-[#2c2c2c] dark:text-white",
  "border-1 border-black",
  "focus:border-primary-500",
  "placeholder-neutral-400 dark:placeholder-neutral-600",
];

const ERROR_INPUT_CLASS = "border-error-600 dark:border-error-500";

type FormShape = {
  name: string;
  email: string;
  location: string;
  message: string;
};

const props = withDefaults(
  defineProps<{
    requiredFields?: Array<keyof FormShape>;
    submitLabel?: string;
    initialValue?: Partial<FormShape>;
  }>(),
  {
    requiredFields: () => ["name", "email", "location"],
    submitLabel: "Enviar",
    initialValue: () => ({}),
  }
);

const emit = defineEmits<{
  (e: "submit", value: FormShape): void;
}>();

const form = reactive<FormShape>({
  name: props.initialValue.name ?? "",
  email: props.initialValue.email ?? "",
  location: props.initialValue.location ?? "",
  message: props.initialValue.message ?? "",
});

const errors = ref<Partial<Record<keyof FormShape, string>>>({});

const inputClass = (field: keyof FormShape) => [
  ...BASE_INPUT_CLASS,
  errors.value[field] && ERROR_INPUT_CLASS,
];

const handleBlur = (field: keyof FormShape) => {
  if (!props.requiredFields.includes(field)) return;
  if (!form[field]) {
    errors.value = { ...errors.value, [field]: ERROR_MESSAGE };
  } else {
    const next = { ...errors.value };
    delete next[field];
    errors.value = next;
  }
};

const handleInput = (field: keyof FormShape) => {
  if (errors.value[field]) {
    const next = { ...errors.value };
    delete next[field];
    errors.value = next;
  }
};

const handleSubmit = () => {
  const next: Partial<Record<keyof FormShape, string>> = {};
  for (const field of props.requiredFields) {
    if (!form[field]) next[field] = ERROR_MESSAGE;
  }
  errors.value = next;
  if (Object.keys(next).length === 0) emit("submit", { ...form });
};

const hasErrors = computed(() => Object.keys(errors.value).length > 0);
</script>

<template>
  <form
    class="@container border-1 shadow-rb-black bg-light w-full max-w-xl rounded-xl border-black p-6 dark:bg-neutral-900"
    @submit.prevent="handleSubmit"
  >
    <div class="@md:grid-cols-2 grid grid-cols-1 gap-4">
      <div>
        <input
          v-model="form.name"
          name="name"
          placeholder="Nombre"
          :class="inputClass('name')"
          @input="handleInput('name')"
          @blur="handleBlur('name')"
        />
        <p
          v-if="errors.name"
          class="text-error-800 dark:text-error-300 mt-1 text-sm"
        >
          {{ errors.name }}
        </p>
      </div>
      <div>
        <input
          v-model="form.email"
          name="email"
          placeholder="Email"
          :class="inputClass('email')"
          @input="handleInput('email')"
          @blur="handleBlur('email')"
        />
        <p
          v-if="errors.email"
          class="text-error-800 dark:text-error-300 mt-1 text-sm"
        >
          {{ errors.email }}
        </p>
      </div>
    </div>

    <div class="mt-4">
      <div class="relative">
        <RsLocation
          class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500 dark:text-gray-400"
        />
        <input
          v-model="form.location"
          name="location"
          placeholder="Ubicación"
          :class="[...inputClass('location'), 'pl-10']"
          @input="handleInput('location')"
          @blur="handleBlur('location')"
        />
      </div>
      <p
        v-if="errors.location"
        class="text-error-800 dark:text-error-300 mt-1 text-sm"
      >
        {{ errors.location }}
      </p>
    </div>

    <div class="mt-4">
      <textarea
        v-model="form.message"
        name="message"
        :rows="4"
        placeholder="Mensaje"
        :class="[...BASE_INPUT_CLASS, 'resize-none']"
      />
    </div>

    <div class="mt-6">
      <RsButton
        type="submit"
        class="@md:w-fit @md:float-right w-full"
        :disabled="hasErrors"
      >
        {{ submitLabel }}
      </RsButton>
    </div>
  </form>
</template>
