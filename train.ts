function rotateArray(arr: number[], index: number): number[] {
    if (index < 0 || index >= arr.length) {
        throw new Error("Invalid index");
    }

    const rotatedPart = arr.slice(-index);
    const remainingPart = arr.slice(0, -index);
    
    return rotatedPart.concat(remainingPart);
}

console.log(rotateArray([1, 2, 3, 4, 5, 6], 2)); 


