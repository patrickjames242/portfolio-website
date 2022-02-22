/*eslint-disable no-extend-native */

export {};

declare global {
	interface Array<T> {
		/** transforms all items in original array but leaves out transformed values that are either null or undefined */
		compactMap<Result>(
			this: Array<T>,
			transform: (initial: T, index: number) => Result | null | undefined
		): Result[];
		/// groups the items provided according to the key provided
		groupBy<Key>(keyGetter: (item: T) => Key): Map<string, T[]>;
		firstWhere(predicate: (item: T) => boolean): T | null;
		asClassString(): string | undefined;

		// /// return true from sorter if the first element should come before the second. otherwise return false
		// sortSimple(sorter: (i1: T, i2: T) => boolean): T[];
	}
}

Array.prototype.compactMap = function transform<Result>(
	this: Array<any>,
	transform: (initial: any, index: number) => Result | null | undefined
): Result[] {
	const result: Result[] = [];
	this.forEach((item, index) => {
		const transformed = transform(item, index);
		if (transformed != null) result.push(transformed);
	});
	return result;
};

(Array as any).prototype.groupBy = function groupBy<Key>(
	keyGetter: (item: any) => Key
): Map<Key, any[]> {
	const map = new Map<Key, any[]>();
	for (const item of this) {
		const key = keyGetter(item);
		if (map.has(key)) map.get(key)?.push(item);
		else map.set(key, [item]);
	}
	return map;
};

Array.prototype.firstWhere = function (this: Array<any>, predicate) {
	for (const item of this) {
		if (predicate(item)) return item;
	}
	return null;
};

Array.prototype.asClassString = function (
	this: Array<any>
): string | undefined {
	const validClassNames = this.flatMap((x) => {
		if (typeof x === "string") return x.split(" ");
		else if (x == null) return [];
		else {
			console.warn(
				`you submitted a value (${x}) that is not valid to be used as a class name.`
			);
			return [];
		}
	}).compactMap((x) => {
		const result = x.trim();
		if (result.length < 1) return null;
		else return result;
	});
	return validClassNames.join(" ");
};
