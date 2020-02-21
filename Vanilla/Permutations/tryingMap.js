const solution = input => {
    const inputArray = [...input.trim().replace(/\D/g,'')];
    let permutations = [];

    const permute = (array, permutation = "") => {
        if (array.length === 0) {
            permutations.push(permutation);
        }
        else {
            for (let i = 0; i < array.length; i++) {
                let digitsToProcess = [...array];
                let nextDigit = digitsToProcess.splice(i, 1);
                permute([...digitsToProcess], permutation.concat(nextDigit));
            }
        }
    }
    permute(inputArray);
    console.log(permutations.toString());
};