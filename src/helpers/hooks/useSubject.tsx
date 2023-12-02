import { Subject } from 'rxjs';
import { useCleanedUpResource } from './useCleanedUpResource';

export function useSubject<T>(): Subject<T> {
  return useCleanedUpResource({
    init: () => new Subject<T>(),
    cleanUp: (subject) => subject.complete(),
  });
}
