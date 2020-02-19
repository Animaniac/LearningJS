function solution(input)
{
	function permuteEach(currentLetter, index){
  	var inputWithCurrentLetterRemoved = input.slice(index + 1).split("");
    var permutationsForCurrentLetter = inputWithCurrentLetterRemoved.map(function(nextLetter){
    	
    	return  currentLetter + "" + nextLetter;
    });
  }
	var permutations = input.split("").map(permuteEach);
  
	return permutations.join(',');
}

const createPermutations = input => {
  let permutations = [];
  const entries = Array.from(input.trim().replace(/\D/g,''));
  const permute = (arr, permutation = "") =>{
    if(arr.length === 0){
      permutations.push(permutation);
    }else{
      for(let i = 0; i < arr.length; i++){
        let currentDigit = arr.slice();
        console.log(currentDigit);
        let nextDigit = currentDigit.splice(i,1);
        console.log(nextDigit);
        permute(currentDigit.slice(), permutation.concat(nextDigit));
        console.log(permute(currentDigit.slice(), permutation.concat(nextDigit)));
      }
    }
  }
  console.log(permute(entries));
};


function solution(input){
  //removes anything thats not a int and puts it into an array
    const entries = Array.from(input.trim().replace(/\D/g,''));
    
  //empty array to store the results/different permutations
    let permutations = [];
    
    
    function permute(array, permutation = ""){//first iteration permute([1,2,3], "")
      //if we run out of entries in the array then push the permutation
      if(array.length === 0){//array.length = 3
        permutations.push(permutation);
      }else{
        //loop through each entry in the array
        for(let i = 0; i < array.length; i++){
          // shallow copy our array values to a new one
          let copyOfnumbers = array.slice();//[1,2,3]
          
          // remove the digit at the current index from our shallow copy
          // this gives us an array with a single digit in
          let nextDigit = copyOfnumbers.splice(i,1);//nextDigit = [1]
          
            //enter them both into the function...recursion starts here?
          permute(copyOfnumbers.slice(), permutation.concat(nextDigit));//[1,2,3],[].concat([1]) -> "1"
          
        }
      }
    }
    permute(entries);
    console.log(permutations.toString());
  };
  
  //implimentation of https://i.stack.imgur.com/F0lDq.jpg
  function solution2(input){
      const entries = Array.from(input.trim().replace(/\D/g,''));
      let permutations = [];      
      function permute(array, permutation = ""){
        console.log("permutatinos start ",permutation);
        if(array.length === 0){
          permutations.push(permutation);
        }else{
          for(let i = 0; i < array.length; i++){
            let copyOfnumbers = array.slice();
            console.log("copyofnum " + copyOfnumbers);
            let nextDigit = copyOfnumbers.splice(i,1); 
            console.log("nextDigit ",nextDigit);
            console.log("permutations ",permutations);          
            permute(copyOfnumbers.slice(), permutation.concat(nextDigit))}
        }
      }
      permute(entries);
      console.log(permutations.toString());
};
    

function rhysSolution(input){
  const entries = Array.from(input.trim().replace(/\D/g,''));
  let permutations = [];

  function permute(array, permutation = ""){
    if(array.length === 0){
      permutations.push(permutation);
    }else{
      console.log(array);
      for(let i = 0; i < array.length; i++){
        let currentDigit = array.slice();
        let nextDigit = currentDigit.splice(i,1);
        permute(currentDigit.slice(), permutation.concat(nextDigit));
      }
    }
  }
  permute(entries);
  console.log(permutations.toString());
};