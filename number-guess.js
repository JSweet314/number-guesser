var guess = 0;
var numberOfGuesses = 0;
var ans = 0;
var description = '';

var sub = document.getElementById('submit');
var cl = document.getElementById('clear');
var res = document.getElementById('reset')

sub.addEventListener('click', submitGuess)
cl.addEventListener('click', clearInput)
res.addEventListener('click', reset)

function numberGuesser(){
  ans = generateNumber();
  getGuess();
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

function generateNumber() {
  console.log('random number generated');
  if (numberOfGuesses === 0) {
    return ans = Math.floor((Math.random()*100)+1);
  } else {
    return ans;
  }
}

function getGuess(){
  console.log('obtained guess from user');
  guess = parseInt(document.getElementById('guess').value);
  return guess;
}

function presentGuess() {
  console.log('guess presented');
  document.getElementById('attempt').innerHTML = guess;
  document.getElementById('attempt').style.visibility = 'visible';
  document.getElementById('const').style.visibility = 'visible';
  document.querySelector('#reset').style.visibility = 'visible';
}

function describeGuess(){
  console.log('guess described')
  document.getElementById('feedBack').style.visibility = 'visible';
  document.getElementById('feedBack').innerHTML = description;
}

function submitGuess(event) {
  event.preventDefault();
  console.log('submit guess function');
  numberGuesser();
  presentGuess();
  describeGuess();
  
}

function clearInput(event) {
  console.log('clear button pressed, text box = \'\'');
  event.preventDefault();
  document.getElementById('guess').value = '';
}

function reset(event) {
  console.log('reset button');
  event.preventDefault();
  numberOfGuesses = 0;
  document.getElementById('attempt').style.visibility = 'hidden';
  document.getElementById('feedBack').style.visibility = 'hidden';
  document.getElementById('const').style.visibility = 'hidden';
  document.querySelector('#reset').style.visibility = 'hidden';
  clearInput(event);
}

function validateGuess(x) {
  if (isNaN(x)) {
    console.log('Please guess a number');
  } else if (x > 100 || x < 1 || Number.isInteger(x) == false){
    console.log('Please enter a whole number between 1 and 100.'); 
  } else {
    submitGuess();
  }
  
}