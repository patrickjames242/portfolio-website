import { useEffect, useRef } from "react";

export function consoleLogAndReturn<Value>(value: Value) {
	console.log(value);
	return value;
}

export function useDidValueChange<Value>(
	value: Value,
	equalsFn?: (previousValue: Value | null, currentValue: Value) => boolean
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

export function clampNum(
	value: number,
	options: { min?: number; max?: number }
) {
	if (options?.min != null) {
		value = Math.max(value, options.min);
	}
	if (options?.max != null) {
		value = Math.min(value, options.max);
	}
	return value;
}
