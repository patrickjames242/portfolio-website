import { BehaviorSubject } from 'rxjs';
import { useCleanedUpResource } from './useCleanedUpResource';

export function useBehaviorSubject<T>(initialValue: T): BehaviorSubject<T> {
  return useCleanedUpResource({
    init: (prevSubject) =>
      new BehaviorSubject<T>(prevSubject?.value ?? initialValue),
    cleanUp: (subject) => subject.complete(),
  });
}
