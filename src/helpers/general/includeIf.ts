import { Defalsify } from '../typescript/Defalsify';

export function includeFnIf<C, T>(
  condition: C,
  value: (conditionValue: Defalsify<C>) => T,
): [T] | [] {
  return condition ? [value(condition as Defalsify<C>)] : [];
}
