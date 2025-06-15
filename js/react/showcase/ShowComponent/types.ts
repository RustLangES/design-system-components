export type FieldType<Field, F> = unknown extends F
  ? string
  : Field extends string
    ? "string"
    : Field extends boolean
      ? "boolean"
      : Field extends Function
        ? "function" | "callback"
        : Field extends object
          ? "object"
          : string;

export type PropsDefOptional<Field> = undefined extends Field
  ? Field extends undefined
    ? { optional: true } | { optional?: true; default: NonNullable<Field> }
    : unknown
  : { optional?: false };

export type PropsDefConfig<Field> = {
  type: FieldType<NonNullable<Field>, Field>;
  displayName?: string;
  hidden?: boolean;
  placeholder?: string;
  default?: NonNullable<Field>;
  options?: Field[];
  optional?: boolean;
  disabled?: boolean;
} & PropsDefOptional<Field>;

export type PropsDef<P> = {
  [K in keyof P]-?: PropsDefConfig<P[K]>;
};

export type GenericPropDef = Record<string, PropsDefConfig<unknown>>;
export type NormalizedProps = Record<
  string,
  Required<PropsDefConfig<unknown>> & { settedDefault: unknown }
>;
