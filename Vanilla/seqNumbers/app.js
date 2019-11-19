//Given a list of integers L. Find the maximum length of sequential consecutive numbers that can be formed using L
// [5,2,99,3,4,1,100]
// problem from https://www.youtube.com/watch?v=XXLVi2y2GrY
let numseq = [5,2,99,3,4,1,100];

const findMaxSequence = (numbers =>{
  let orderedNumbers = numbers.sort((a, b) => {return a-b});  
  let numbersets = [];
  let prev = 0;  

  orderedNumbers.forEach(currnum => {
    if(currnum - prev != 1) numbersets.push([]);

    numbersets[numbersets.length -1].push(currnum);

    prev = currnum;
  });

  numbersets.sort((a,b) => b.length - a.length);

  console.log(numbersets[0]);
});
