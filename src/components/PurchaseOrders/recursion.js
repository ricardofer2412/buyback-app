// input 5
// ouput 125


function factorialLoop(n) {
  let result = n

  for (let i = n; i !== 1; i--) {
    result = result * (i - 1)
  }

  return result
}

function factorialRecursion(n) {
  if (n === 1) return 1
  return factorialRecursion(n - 1) * n;
}




function stairsRecursion(n) {
  if (n === 1) return 1
  if (n === 2) return 2
  return stairsRecursion(n - 1) + stairsRecursion(n - 2)

}


// input 4 = 5 




// fact 1 = 1
// fact 2 = 2
// fact 3 = fact(2) * 3

// res = fact(n - 1) * n



console.log("Result: ", factorialRecursion(5));

