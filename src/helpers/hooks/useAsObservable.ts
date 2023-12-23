import { useObservable } from 'observable-hooks';
import { useCallback } from 'react';
import { Observable, map } from 'rxjs';

export function useAsObservable<T>(value: T): Observable<T> {
  return useObservable(
    useCallback((o: Observable<[T]>) => o.pipe(map((x) => x[0])), []),
    [value],
  );
}
