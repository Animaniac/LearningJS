function solutionComments(input){
    document.clear();
    document.writeln("<pre>");
      const entries = Array.from(input.trim().replace(/\D/g,''));
      let permutations = [];
      let itteration = 0
      function permute(array, permutation = "", iteration){      
        document.writeln("itteration ", iteration," current permutation ",permutation);
        if(array.length === 0){
          permutations.push(permutation);
          itteration ++;
        }else{
          for(let i = 0; i < array.length; i++){
            let digitsToProcess = array.slice();
            document.writeln("digitsToProcess " + digitsToProcess);
            let nextDigit = digitsToProcess.splice(i,1); 
            document.writeln("nextDigit ", nextDigit);
            document.writeln("permutations ", permutations);
            document.writeln("permute: ", digitsToProcess.slice(),permutation.concat(nextDigit));          
            permute(digitsToProcess.slice(), permutation.concat(nextDigit),itteration);
            }
        }
      }
      document.writeln("start");
      permute(entries);
      console.log(permutations.toString());
    document.writeln("</pre>");
  };