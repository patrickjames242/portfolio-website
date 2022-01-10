export function getNumberList(startNumber: number, endNumber: number) {
	if (endNumber < startNumber)
		throw new Error("end number cannot be less than start number");
	let x = startNumber;
	const numbers: number[] = [];
	while (x <= endNumber) {
		numbers.push(x);
	}
	return numbers;
}
