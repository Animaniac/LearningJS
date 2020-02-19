const createPermutations = input => {
  let permutations = "";
  
  const permute = (arr, permutation = "") =>{
    if(arr.length === 0){
      permutations.push(permutation);
    }else{
      for(let i = 0; i < arr.length; i++){
        let currentDigit = arr.slice();
        let nextDigit = currentDigit.splice(i,1);
        permute(currentDigit.slice(), permutation.concat(nextDigit));
      }
    }
  }
  permute(input);
  results.innerHTML = "";
  permutations.forEach(permutation =>{
    addPermutation(permutation);
  });
}
console.log(createPermutations("12345"));