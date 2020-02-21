// Need a program that will take each number & place it at index 0
// Then each of the other digits at the different positions - depends on length


// getPermutations (someString)
// define permutations;
// sanatise the input string and put it into an array
// permute(array, permutationString)
// if the array is empty then add the permutation to the results
// loop through each number in the array
// copy the array so we dont change the original
// take the i letter & concatonate it to the permutation 
// pas the spliced array and the new permutation into a new permute call.
// first itteration would be i=0 permute([2,3],"1") - This then calls it again....but with i = 1-2etc
//                             1 permute([3],"12")
//                             2 permute([],"123")
// 2nd                       i=1 0 permute([1,3],"2")
//                               1 permute([3],"21")
//                               2 permute([],"213")
// 23rd                      i=2 0 permute([1,2],"3")
//                               1 permute([2],"31")
//                               2 permute([],"312")
function solution(input){
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
                permute([...digitsToProcess], permutation + nextDigit);
            }
        }
    }
    permute(inputArray);
    return permutations.toString();
};


