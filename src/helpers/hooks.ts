import React, {
  ForwardedRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export function consoleLogAndReturn<Value>(value: Value): Value {
  console.log(value);
  return value;
}

export function useDidValueChange<Value>(
  value: Value,
  equalsFn?: (previousValue: Value | null, currentValue: Value) => boolean,
): boolean {
  const isEquals = equalsFn ?? ((v1, v2) => v1 === v2);

  const valueRef = useRef<Value | null>(null);
  const previousValue = valueRef.current;
  const newValue = value;

  useEffect(() => {
    valueRef.current = newValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEquals(previousValue, newValue) ? previousValue : newValue]);
  return isEquals(previousValue, newValue) === false;
}

export function useMediaQuery(
  query: string,
  callback: (matches: boolean) => void,
  dependencies: React.DependencyList = [],
): void {
  useLayoutEffect(() => {
    const media = window.matchMedia(query);
    const listener = (): void => {
      callback(media.matches);
    };
    listener();
    media.addEventListener('change', listener);
    return () => {
      media.removeEventListener('change', listener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

export interface CallbackRef<T> {
  (node: T | null): void;
  getLatest(): T | null;
  latest$: Observable<T | null>;
}

export function useCallbackRef<T>(
  forwardedRef?: ForwardedRef<T>,
): CallbackRef<T> {
  const latest$ = useRef(new BehaviorSubject<T | null>(null)).current;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callbackFn = useCallback(
    Object.assign(
      (node: T | null) => {
        latest$.next(node);
        if (forwardedRef == null) return;
        else if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else {
          forwardedRef.current = node;
        }
      },
      {
        getLatest() {
          return latest$.value;
        },
        latest$: latest$.asObservable(),
      },
    ),
    [],
  );
  return callbackFn;
}

export function useUnmounted(): Observable<null> {
  const unmountedSubject = useRef(new Subject<null>()).current;
  const unmountedObservable = useRef(unmountedSubject.asObservable()).current;
  useEffect(() => {
    return () => {
      unmountedSubject.next(null);
      unmountedSubject.complete();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return unmountedObservable;
}
