import {
  RefCallback,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { BehaviorSubject, Observable, scan } from 'rxjs';
import { deepEqualsDistinctUntilChanged } from '../general/Observables/operators/deepEqualsDistinctUntilChanged';

export interface UseElementSizeOptions {
  /**
   * If this value is set, updates will not be sent unless the height or the width of the element changes by at least this amount. This prevent flickers when the scroll bar is shown or hidden.
   *
   * @default 0
   */
  updateThreshold?: number;
  /**
   * Accessing the dimensions of an element directly on the element itself (for whatever reason)
   * can completely halt any in-progress css animations. But waiting for ResizeObserver to send the
   * initial element size can cause a ui flicker. So by default, this hook grabs the initial value
   * directly from the element immediately on mount, and if you want to disable this behavior so that
   * animations can run smoothly (or for some other reason), you can set this to false.
   *
   * @default true
   */
  sendInitialSizeImmediately?: boolean;
}

export interface ElementSize {
  width: number;
  height: number;
}

export function useElementSize$(
  options?: UseElementSizeOptions,
): [RefCallback<any>, Observable<ElementSize>] {
  const updateThreshold = options?.updateThreshold ?? 0;
  const sendInitialSizeImmediately =
    options?.sendInitialSizeImmediately ?? true;

  const sizeSubject$ = useRef(
    new BehaviorSubject<ElementSize>({ height: 0, width: 0 }),
  ).current;

  const resizeObserver = useMemo<ResizeObserver>(
    () =>
      new ResizeObserver(([entry]) => {
        requestAnimationFrame(() => {
          if (!entry) return;
          sizeSubject$.next({
            height: entry.borderBoxSize[0]!.blockSize,
            width: entry.borderBoxSize[0]!.inlineSize,
          });
        });
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const latestObservedElement = useRef<HTMLDivElement | null>(null);

  const setObservedElement = useCallback(
    (element: HTMLDivElement | null) => {
      if (latestObservedElement.current) {
        resizeObserver.unobserve(latestObservedElement.current);
      }
      if (element) {
        if (sendInitialSizeImmediately) {
          sizeSubject$.next({
            height: element.offsetHeight,
            width: element.offsetWidth,
          });
        }
        resizeObserver.observe(element);
      }
      latestObservedElement.current = element;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resizeObserver, sizeSubject$],
  );

  const ref = useCallback(
    (instance: HTMLDivElement | null) => {
      setObservedElement(instance);
    },
    [setObservedElement],
  );

  useLayoutEffect(() => {
    setObservedElement(latestObservedElement.current);
    return () => {
      if (latestObservedElement.current) {
        resizeObserver.unobserve(latestObservedElement.current);
        // intentionally not setting latestObservedElement.current to null just in case we remount (because of react 18 nonsense)
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const size$ = useMemo(() => {
    return sizeSubject$.pipe(
      scan(
        /**
         * This code only causes the hook to only send size updates if the height or width of the element changes by at least the updateThreshold amount.
         */
        (prev, newValue) => {
          if (
            Math.abs(newValue.width - prev.width) > updateThreshold ||
            Math.abs(newValue.height - prev.height) > updateThreshold
          )
            return newValue;
          else return prev;
        },
        { width: 0, height: 0 },
      ),
      deepEqualsDistinctUntilChanged(),
    );
  }, [sizeSubject$, updateThreshold]);

  return [ref, size$];
}
