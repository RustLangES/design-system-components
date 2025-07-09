import { createEffect, createSignal, h } from "./miniui";

const theme = createSignal(localStorage.getItem("theme") ?? "system");
const isDarkTheme = () => theme() === "dark";
const isLightTheme = () => theme() === "light";
const isSystemTheme = () => !isDarkTheme() && !isLightTheme();

const htmlElement = document.documentElement;
createEffect(() => {
  localStorage.setItem("theme", theme());

  if (theme() === "system") {
    htmlElement.classList.add("rustlanges-theme-system");
    htmlElement.classList.remove(
      "rustlanges-theme-dark",
      "rustlanges-theme-light"
    );
  } else if (theme() === "dark") {
    htmlElement.classList.add("rustlanges-theme-dark");
    htmlElement.classList.remove(
      "rustlanges-theme-system",
      "rustlanges-theme-light"
    );
  } else if (theme() === "light") {
    htmlElement.classList.add("rustlanges-theme-light");
    htmlElement.classList.remove(
      "rustlanges-theme-system",
      "rustlanges-theme-dark"
    );
  }
});

export function ThemeSwitch() {
  return (
    <div
      class={[
        "max-w-case mx-auto mb-5 px-3 py-2",
        "flex justify-end",
        "sticky top-3",
      ]}
    >
      <select onChange={e => theme(e.currentTarget.value)}>
        <option selected={isSystemTheme()} value="system">
          System
        </option>
        <option selected={isDarkTheme()} value="dark">
          Dark
        </option>
        <option selected={isLightTheme()} value="light">
          Light
        </option>
      </select>
    </div>
  );
}
