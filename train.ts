function areArraysEqual<T>(arr1: T[], arr2: T[]): boolean {
    if (arr1.length !== arr2.length) return false;

    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
}

console.log(areArraysEqual([1, 2, 3], [3, 1, 2])); 
console.log(areArraysEqual([1, 2, 3], [3, 1, 2, 1])); 



