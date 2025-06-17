import { useState } from "react";
import { Location } from '../../icons';
import { CONTACT_FORM_ERROR_MESSAGES } from "./contact-form.const";
import type { ContactFormProps } from "./contact-form.types";

export default function ContactForm({ theme = "light" }: ContactFormProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

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

  const base = "w-full p-2 rounded-md border outline-none transition";
  const styles = {
    light: {
      form: "bg-gray-100",
      bg: "bg-white text-black",
      border: "border-gray-300",
      focus: "focus:border-orange-500",
      error: "border-red-500 text-red-600",
      placeholder: "placeholder-gray-400",
      button: "bg-orange-500 text-white hover:bg-orange-600",
      disabled: "bg-gray-300 text-gray-500",
    },
    dark: {
      form: "bg-[#1e1e1e]",
      bg: "bg-[#2c2c2c] text-white",
      border: "border-gray-600",
      focus: "focus:border-orange-400",
      error: "border-red-500 text-red-500",
      placeholder: "placeholder-gray-500",
      button: "bg-orange-500 text-white hover:bg-orange-600",
      disabled: "bg-gray-700 text-gray-500",
    },
  };

  const t = styles[theme];

  return (
    <form
      onSubmit={handleSubmit}
      className={`max-w-xl rounded-2xl p-6 shadow-md ${t.form}`}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Nombre"
            className={`${base} ${t.bg} ${t.placeholder} ${t.border} ${
              errors.name ? t.error : touched.name ? t.focus : ""
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>
        <div>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email"
            className={`${base} ${t.bg} ${t.placeholder} ${t.border} ${
              errors.email ? t.error : touched.email ? t.focus : ""
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="relative">
          <Location
            className={`pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transform ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          />
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ubicación"
            className={`${base} pl-10 ${t.bg} ${t.placeholder} ${t.border} ${
              errors.location ? t.error : touched.location ? t.focus : ""
            }`}
          />
        </div>
        {errors.location && (
          <p className="mt-1 text-sm text-red-500">{errors.location}</p>
        )}
      </div>

      <div className="mt-4">
        <textarea
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Mensaje"
          className={`${base} ${t.bg} ${t.placeholder} ${t.border} resize-none`}
        />
      </div>

      <div className="mt-6 text-right">
        <button
          type="submit"
          className={`rounded-md px-6 py-2 font-semibold ${
            Object.keys(errors).length ? t.disabled : t.button
          }`}
          disabled={Object.keys(errors).length > 0}
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
