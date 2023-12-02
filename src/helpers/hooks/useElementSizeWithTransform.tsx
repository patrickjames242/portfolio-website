import { useLayoutObservableState } from 'observable-hooks';
import { Ref, useMemo } from 'react';
import { Observable } from 'rxjs';
import { deepEqualsDistinctUntilChanged } from '../general/Observables/operators/deepEqualsDistinctUntilChanged';
import {
  ElementSize,
  UseElementSizeOptions,
  useElementSize$,
} from './useElementSize$';

export function useElementSizeWithTransform<ResultValue>(
  transform: (size$: Observable<ElementSize>) => Observable<ResultValue>,
  options?: UseElementSizeOptions,
): [Ref<HTMLDivElement>, ResultValue | null];
export function useElementSizeWithTransform<ResultValue>(
  transform: (size$: Observable<ElementSize>) => Observable<ResultValue>,
  options: UseElementSizeOptions & {
    defaultValue: ResultValue;
  },
): [Ref<HTMLDivElement>, ResultValue];
export function useElementSizeWithTransform<ResultValue>(
  transform: (size$: Observable<ElementSize>) => Observable<ResultValue>,
  options?: UseElementSizeOptions & {
    defaultValue?: ResultValue;
  },
): [Ref<HTMLDivElement>, ResultValue | null] {
  const [ref, size$] = useElementSize$(options);
  const obs = useMemo(
    () => transform(size$).pipe(deepEqualsDistinctUntilChanged()),
    [size$, transform],
  );
  const result = useLayoutObservableState(obs, options?.defaultValue);
  return [ref, result ?? null];
}
