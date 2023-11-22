export type ArrayElement<A extends any[]> = A extends Array<infer E>
  ? E
  : unknown;

export function getNumberList(
  startNumber: number,
  endNumber: number,
): number[] {
  if (endNumber < startNumber)
    throw new Error('end number cannot be less than start number');
  const x = startNumber;
  const numbers: number[] = [];
  while (x <= endNumber) {
    numbers.push(x);
  }
  return numbers;
}

export function numberSort<ItemT>(
  ...args: ItemT extends number ? [] : [(item: ItemT) => number]
): (item1: ItemT, item2: ItemT) => number {
  return (item1, item2) => {
    const item1Num = typeof item1 === 'number' ? item1 : args[0]?.(item1);
    const item2Num = typeof item2 === 'number' ? item2 : args[0]?.(item2);
    if (typeof item1Num !== 'number' || typeof item2Num !== 'number') {
      throw new Error('numberSort could not produce sort value');
    }
    if (item1Num < item2Num) return -1;
    else if (item1Num > item2Num) return 1;
    else if (item1Num === item2Num) return 0;
    else return 1;
  };
}
export function clampNum(
  value: number,
  options: { min?: number; max?: number },
): number {
  if (options?.min != null) {
    value = Math.max(value, options.min);
  }
  if (options?.max != null) {
    value = Math.min(value, options.max);
  }
  return value;
}

export function ifThen<T>(condition: boolean, value: T): T | null {
  if (condition) return value;
  return null;
}

export function wait(numberOfMilliseconds: number): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), numberOfMilliseconds);
  });
}

// executes closure if value is not null or undefined and returns its result, otherwise returns null.
export function mapOptional<Unwrapped, ReturnVal>(
  optional: Unwrapped | undefined | null,
  action: (unwrapped: Unwrapped) => ReturnVal,
): ReturnVal | null {
  if (optional == null) {
    return null;
  } else {
    return action(optional);
  }
}

type Animation = () =>
  | { secondsTillNextAnimation: number }
  | null
  | undefined
  | void;
export interface AnimationStack {
  addElementsToAnimationStack(animations: Animation[]): Promise<void>;
}
export function getAnimationStack(timeInterval: number = 300): AnimationStack {
  const elementAnimationStack: Animation[] = [];
  let animationIsRunning = false;

  async function addElementsToAnimationStack(
    animations: Animation[],
  ): Promise<void> {
    elementAnimationStack.push(...animations);
    if (animationIsRunning) return;
    animationIsRunning = true;
    while (elementAnimationStack.length >= 1) {
      const next = elementAnimationStack.shift();
      const delayTillNext =
        mapOptional(next?.()?.secondsTillNextAnimation, (x) => x * 1000) ??
        timeInterval;
      await wait(delayTillNext);
    }
    animationIsRunning = false;
  }
  return { addElementsToAnimationStack };
}
