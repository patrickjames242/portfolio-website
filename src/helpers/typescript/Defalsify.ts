// removes all falsy values from a type
export type Defalsify<T> = T extends false | 0 | '' | null | undefined
  ? never
  : T;
