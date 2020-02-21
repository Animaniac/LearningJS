//Need to get an array that only contains ints from the input.
//Then find all the permutations of the ints.
//help from https://stackoverflow.com/questions/9960908/permutations-in-javascript

const entryForm = document.querySelector('.entry');
const results = document.querySelector('.results');

const addPermutation = permutation =>{
  const html =`
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>${permutation}</span>
  </li>`
  results.innerHTML += html;
};
//recursive solution. Could potentially cause stackoverflow.
const createPermutations = input => {
  let permutations = [];
  
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

entryForm.addEventListener('submit', e => {    
  e.preventDefault();

  const entries = Array.from(entryForm.entry.value.trim().replace(/\D/g,''));  
  
  if(entries.length){
      console.log(createPermutations(entries));
      entryForm.reset();
  } else{
    console.log(entry);
    entry.ClassList.add("error");
    //output some error or something on the inputform.
  }   
});