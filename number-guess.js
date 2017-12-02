var guess = parseInt(document.querySelector('#guess').value);
var numberOfGuesses = 0;
var ans = 0;
var description = '';

function generateNumber() {
  if (numberOfGuesses === 0) {
    return ans = Math.floor((Math.random()*100)+1);
  } else {
    return ans;
  }
}

function submitGuess() {
  numberGuesser();
  presentGuess();
  describeGuess();
}

function numberGuesser(){
  ans = generateNumber();
  numberOfGuesses += 1;
  
  console.log('numberOfGuesses = ' + numberOfGuesses);
  console.log('guess = ' + guess);
  console.log('ans = ' + ans);

  if (guess === ans){
    return description = 'BOOM!';
  } else if (guess < ans) {
    return description = 'That is too low'
  } else {
    return description = 'That is too high';
  }
}

function describeGuess(){
  document.querySelector('.appFeed').style.visibility = 'visible';
  document.querySelector('.appFeed').innerHTML = description;
}


function presentGuess() {
  document.querySelector('.guess').innerHTML = guess;
  document.querySelector('.guess').style.visibility = 'visible';
}

// document.querySelector('#guess').value;


function clearInput() {
  document.querySelector('#guess').innerHTML = '';
}

function reset() {
  guess = 0;
  numberOfGuesses = 0;
  document.querySelector('.appFeed').style.visibility = 'hidden';
  document.querySelector('.guess').style.visibility = 'hidden';
  clearInput();
}

// function validateGuess(x) {
//   if (isNaN(x)) {
//     console.log('Please guess a number');
//   } else if (x > 100 || x < 1 || Number.isInteger(x) == false){
//     console.log('Please enter a whole number between 1 and 100.'); 
//   } else {
//     console.log('Way to follow Instructions!');
//   }
// }

