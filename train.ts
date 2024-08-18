function printNumbers(): void {
    let number: number = 1;
    const intervalId: NodeJS.Timeout = setInterval(() => {
        console.log(number);
        number++;

        if (number > 5) {
            clearInterval(intervalId);
        }
    }, 1000); 
}

printNumbers();

console.log("working")

