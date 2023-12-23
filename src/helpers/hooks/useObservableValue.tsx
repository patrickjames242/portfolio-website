import { useLayoutSubscription } from 'observable-hooks';
import { useMemo, useState } from 'react';
import { Observable } from 'rxjs';

const NO_VALUE_SYMBOL = Symbol('NO_VALUE');

export function useObservableValue<V>(observable: Observable<V>): V | undefined;
export function useObservableValue<V>(
  observable: Observable<V>,
  initialValue: V,
): V;
export function useObservableValue<V>(
  observable: Observable<V>,
  initialValue?: V,
): V | undefined {
  const [value, setValue] = useState<V | undefined | typeof NO_VALUE_SYMBOL>(
    NO_VALUE_SYMBOL,
  );
  const __initialValue = useMemo(() => {
    return initialValue === undefined
      ? observable.extractSyncValue()
      : initialValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useLayoutSubscription(observable, setValue);
  const result = (() => {
    if (value === NO_VALUE_SYMBOL) return __initialValue;
    else return value;
  })();
  return result;
}
