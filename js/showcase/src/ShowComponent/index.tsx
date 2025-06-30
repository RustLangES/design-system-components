// import React, { FC, JSX, useMemo, useState } from "react";
//
// import { ShowComponentContainer } from "./Container";
// // import { ErrorBoundary } from "../ErrorBoundary";
// // import { ShowComponentError } from "./Error";
// import { ShowComponentField } from "./Field";
// import { GenericPropDef, NormalizedProps, PropsDef } from "./types";
// import { h } from "../miniui";
//
// export function ShowComponent<P extends Record<string, unknown>>(props: {
//   title?: string;
//   component: FC<P>;
//   propsDef: PropsDef<P>;
// }): JSX.Element;
//
// export function ShowComponent(props: {
//   title: string;
//   children: React.ReactNode;
// }): JSX.Element;
//
// export function ShowComponent(
//   props:
//     | {
//         title?: string;
//         component: FC;
//         propsDef: GenericPropDef;
//       }
//     | { title: string; children: React.ReactNode }
// ) {
//   const title =
//     props.title ??
//     ("component" in props
//       ? (props.component.displayName ?? props.component.name)
//       : null) ??
//     "No title";
//
//   return (
//     <ErrorBoundary
//       fallback={(err: Error) => (
//         <ShowComponentError title={title} error={err} />
//       )}
//     >
//       <ShowComponentInner {...props} title={title} />
//     </ErrorBoundary>
//   );
// }
//
// function ShowComponentInner(
//   props: { title: string } & (
//     | {
//         component: FC;
//         propsDef: GenericPropDef;
//       }
//     | { children: React.ReactNode }
//   )
// ) {
//   const propsDef: GenericPropDef = useMemo(
//     () => ("propsDef" in props ? props.propsDef : {}),
//     [props]
//   );
//
//   const normalizedProps: NormalizedProps = useMemo(
//     () =>
//       Object.fromEntries(
//         Object.entries(propsDef).map(([name, prop]) => {
//           return [
//             name,
//             {
//               displayName: name,
//               hidden: false,
//               placeholder: "",
//               default:
//                 prop.type === "string"
//                   ? ""
//                   : prop.type === "boolean"
//                     ? false
//                     : prop.type === "number"
//                       ? 0
//                       : prop.type === "object"
//                         ? {}
//                         : prop.type === "function"
//                           ? () => {}
//                           : prop.type === "callback"
//                             ? () => {}
//                             : (() => {
//                                 throw new Error(
//                                   "Unknown prop type: " + prop.type
//                                 );
//                               })(),
//               disabled: false,
//               optional: false,
//               options: [],
//               settedDefault: prop.default,
//               ...prop,
//             } satisfies NormalizedProps[string],
//           ];
//         })
//       ),
//     [propsDef]
//   );
//
//   const [childrenProps, inputs] = processProps(normalizedProps);
//
//   return (
//     <ShowComponentContainer title={props.title} className="bg-gray-50">
//       {!!Object.keys(inputs).length && (
//         <div className="border-r-1 flex w-full max-w-xs flex-col gap-2 border-r-gray-300 pr-2 pt-2">
//           {inputs}
//         </div>
//       )}
//       <div className="flex w-full flex-wrap items-center justify-center gap-2 py-2">
//         {"component" in props ? (
//           <props.component {...childrenProps} />
//         ) : (
//           props.children
//         )}
//       </div>
//     </ShowComponentContainer>
//   );
// }
//
// function processProps(
//   props: NormalizedProps
// ): [Record<string, unknown>, React.ReactNode[]] {
//   const newProps = Object.fromEntries(
//     Object.entries(props).map(([name, prop]) => {
//       const [value, setValue] = useState(prop.default);
//       const [modified, setModified] = useState(false);
//
//       return [
//         name,
//         {
//           value:
//             prop.type === "callback"
//               ? () => setValue(true)
//               : !prop.optional || modified
//                 ? value
//                 : prop.settedDefault,
//           element: (
//             <ShowComponentField
//               key={name}
//               name={name}
//               def={prop}
//               modified={modified}
//               setModified={setModified}
//               value={value}
//               setValue={setValue}
//             />
//           ),
//         },
//       ];
//     })
//   );
//
//   const childrenProps = Object.fromEntries(
//     Object.entries(newProps).map(([k, v]) => [k, v.value])
//   );
//
//   const inputs = Object.values(newProps).map(p => p.element);
//
//   return [childrenProps, inputs];
// }
