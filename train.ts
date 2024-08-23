function reverseInteger(num: number): number {
    const reversedNumber = parseInt(num.toString().split('').reverse().join(''), 10);
    return Math.sign(num) * reversedNumber;
}

console.log(reverseInteger(123456789)); 
console.log(reverseInteger(-123456789)); 


