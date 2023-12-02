import { useLayoutObservableState } from 'observable-hooks';
import { Ref } from 'react';
import { useElementSize$, UseElementSizeOptions } from './useElementSize$';

export function useElementSize(
  options?: UseElementSizeOptions,
): [Ref<HTMLDivElement>, { height: number; width: number }] {
  const [ref, size$] = useElementSize$(options);
  const size = useLayoutObservableState(size$, { height: 0, width: 0 });
  return [ref, size];
}
