import { registerCase } from "@rustlanges/showcase";
import { InputSearch } from "./input-search.component";
import { useState } from "react";

const filters = [
  { label: "Reciente", value: "reciente" },
  { label: "ES", value: "es" },
  { label: "EN", value: "en" },
  { label: "Libros", value: "libros" },
  { label: "Guías", value: "guias" },
  { label: "Frameworks", value: "frameworks" },
  { label: "Librerías", value: "librerias" },
  { label: "Multinivel", value: "multinivel" },
  { label: "Principiante", value: "principiante" },
  { label: "Intermedio", value: "intermedio" },
  { label: "Avanzado", value: "avanzado" },
];

registerCase("Input Search", () => {
  const [activeFilters, setActiveFilters] = useState<
    Array<{
      label: string;
      value: string;
    }>
  >([]);

  return (
    <div className="flex min-h-60 w-full flex-wrap justify-evenly gap-40 p-5">
      <InputSearch
        activeFilters={activeFilters}
        onChangeFilter={setActiveFilters}
        filters={filters}
        className="max-w-80"
      />
      <InputSearch className="max-w-80" />
    </div>
  );
});
