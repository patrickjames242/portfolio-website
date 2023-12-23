import { Observable } from 'rxjs';

declare module 'rxjs' {
  interface Observable<T> {
    // returns the value the observable emits immediately on subscription, or null if no value is emitted by the time this function returns

    extractSyncValue(): T | undefined;
  }
}

Observable.prototype.extractSyncValue = function (this: Observable<any>) {
  let x: any | null = null;
  const subscription = this.subscribe((value) => {
    x = value;
  });
  subscription.unsubscribe();
  return x;
};
