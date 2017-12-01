var guess = 0;

function numberGuesser(x) {
  var numberOfGuesses = 0;
  var ans = Math.floor((Math.random()*100)+1);
  if (x > 100 || x < 1){
    alert("I said between 1 and 100 you asshole!")
  }

  if (x === ans) {
    console.log("Great Fucking Job!");
  }else if (x < ans) {
    console.log("Your Answer is Too Fucking Small!");
  }else if (x > ans) {
    console.log("Your Answer is Too Fucking Big!");
  }else{
    console.log("Is that even a number bro?")
  }

  guess = x;
  numberOfGuesses +=1;
  console.log(numberOfGuesses);
  console.log(guess);
}

