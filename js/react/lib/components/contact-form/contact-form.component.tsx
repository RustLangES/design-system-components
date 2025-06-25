import { useState } from "react";
import { Location } from "../../icons";
import {
  BASE_INPUT_CLASS,
  CONTACT_FORM_ERROR_MESSAGES,
  CONTACT_FORM_STYLES,
  ERROR_INPUT_CLASS,
} from "./contact-form.const";
import { Button } from "../button";
import { cn } from "../../utils/tw-merge";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      const updated = { ...errors };
      delete updated[name];
      setErrors(updated);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;

    if (!form[name as keyof typeof form]) {
      setErrors(prev => ({
        ...prev,
        [name]: CONTACT_FORM_ERROR_MESSAGES.required,
      }));
    } else {
      const updated = { ...errors };
      delete updated[name];
      setErrors(updated);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    ["name", "email", "location"].forEach(field => {
      if (!form[field as keyof typeof form]) {
        newErrors[field] = CONTACT_FORM_ERROR_MESSAGES.required;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", form);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="@container border-1 shadow-rb-black bg-light w-full max-w-xl rounded-xl border-black p-6 dark:bg-neutral-900"
    >
      <div className="@md:grid-cols-2 grid grid-cols-1 gap-4">
        <div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Nombre"
            className={cn(
              ...BASE_INPUT_CLASS,
              !!errors.name && ERROR_INPUT_CLASS
            )}
          />
          {errors.name && (
            <p className="text-error-800 dark:text-error-300 mt-1 text-sm">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email"
            className={cn(
              ...BASE_INPUT_CLASS,
              !!errors.email && ERROR_INPUT_CLASS
            )}
          />
          {errors.email && (
            <p className="text-error-800 dark:text-error-300 mt-1 text-sm">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="relative">
          <Location
            className={cn(
              "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 transform",
              "text-gray-500 dark:text-gray-400"
            )}
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ubicación"
            className={cn(
              ...BASE_INPUT_CLASS,
              "pl-10",
              !!errors.location && ERROR_INPUT_CLASS
            )}
          />
        </div>
        {errors.location && (
          <p className="text-error-800 dark:text-error-300 mt-1 text-sm">
            {errors.location}
          </p>
        )}
      </div>

      <div className="mt-4">
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Mensaje"
          className={cn(...BASE_INPUT_CLASS, "resize-none")}
        />
      </div>

      <div className="mt-6">
        <Button
          label="Enviar"
          className="@md:w-fit @md:float-right w-full"
          disabled={Object.keys(errors).length > 0}
          {...{ type: "submit" }}
        />
      </div>
    </form>
  );
}
