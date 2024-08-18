function reduceNestedArray(arr: any[]): number {
    let sum = 0;

    for (const element of arr) {
        if (Array.isArray(element)) {
            sum += reduceNestedArray(element);
        } else {
           
            sum += element;
        }
    }

    return sum;
}

const result = reduceNestedArray([1, [1, 2, [4]]]);
console.log(result); 

