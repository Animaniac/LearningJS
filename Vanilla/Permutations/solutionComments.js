// Need a program that will take each number & place it at index 0
// Then each of the other digits at the different positions - depends on length
//            123              1-> 2,3 have 1 at index 0 then 2@1, 3@2
//     ________|_________      1-> 3,2
//     |       |        |      2-> 1,3
//   _123_   _213_    _312_    2-> 3,1
//   |   |   |   |    |   |    3-> 1,2
//  123 132 213 231 312  321   3-> 2,1

//pseudo
// getPermutations (someString)
// define permutations;
// sanatise the input string and put it into an array
// permute(array, permutationString)
// if the array is empty then add the permutation to the results
// loop through each number in the array
// copy the array so we dont change the original
// take each letter and add it to the current permutation
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
                //console.log(digitsToProcess, permutation);
                let nextDigit = digitsToProcess.splice(i, 1);
                permute([...digitsToProcess], permutation + nextDigit);
            }
        }
    }
    permute(inputArray);
    console.log(permutations.toString());
};


// Solution with comments output to make it easier to understand.
// function solutionComments(input){
//     document.clear();
//     document.writeln("<pre>");
//     const entries = Array.from(input.trim().replace(/\D/g,''));
//     let permutations = [];
//     let itteration = 0
//     function permute(array, permutation = "", iteration){      
//     document.writeln("itteration ", iteration," current permutation ",permutation);
//     if(array.length === 0){
//         permutations.push(permutation);
//         document.writeln("permutations ", permutations);
//         itteration ++;
//     }else{
//         for(let i = 0; i < array.length; i++){
//         let digitsToProcess = [...array];
//         document.writeln("digitsToProcess " + digitsToProcess);
//         let nextDigit = digitsToProcess.splice(i,1); 
//         document.writeln("nextDigit ", nextDigit);
//         document.writeln("permute: ", digitsToProcess.slice(), permutation + nextDigit);          
//         permute(digitsToProcess.slice(), permutation.concat(nextDigit),itteration);
//         }
//     }
//     }
//     document.writeln("start");
//     permute(entries);
//     console.log(permutations.toString());
// document.writeln("</pre>");
// };
