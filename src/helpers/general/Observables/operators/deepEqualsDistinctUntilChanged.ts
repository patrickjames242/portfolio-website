import fastDeepEqual from 'fast-deep-equal';
import { distinctUntilChanged, Observable } from 'rxjs';

export function deepEqualsDistinctUntilChanged<V>(): (
  source: Observable<V>,
) => Observable<V> {
  return function (source: Observable<V>) {
    return source.pipe(distinctUntilChanged<V>(fastDeepEqual));
  };
}
