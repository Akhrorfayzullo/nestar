function findDuplicates(arr: number[]): number[] {
	const elementCount: { [key: number]: number } = {};
	const duplicates: number[] = [];

	for (const num of arr) {
		elementCount[num] = (elementCount[num] || 0) + 1;
	}

	for (const num in elementCount) {
		if (elementCount[num] > 1) {
			duplicates.push(Number(num));
		}
	}

	return duplicates;
}

console.log(findDuplicates([1, 2, 3, 4, 5, 4, 3, 4]));



