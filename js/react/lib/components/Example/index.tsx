export function Example(
  props: {
    text?: string;
    boolean?: boolean;
    object?: object;
    required: string;
    function?: () => void;
    callback?: () => void;
  },
) {
  return (
    <pre className="text-red-900" onClick={props.callback}>
      {JSON.stringify(props, null, 2)}
    </pre>
  );
}
