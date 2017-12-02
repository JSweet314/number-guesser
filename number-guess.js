var guess = 0;
var numberOfGuesses = 0;
var ans = 0;
var description = '';

var sub = document.querySelector('#submit');
var cl = document.querySelector('#clearText');
var res = document.querySelector('#reset')

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
  guess = parseInt(document.querySelector('#guess').value);
  return guess;
}

function visElement(element){
  console.log('visElement function ran');
  document.querySelector(element).style.visibility = 'visible';
}

function invisElement(element){
  console.log('invisElement function ran');
  document.querySelector(element).style.visibility = 'hidden';
}

function presentGuess() {
  console.log('guess presented');
  document.querySelector('#attempt').innerHTML = guess;
  visElement('#attempt');
  visElement('#const');
  visElement('#reset');
}

function describeGuess(){
  console.log('guess described')
  document.querySelector('#feedBack').style.visibility = 'visible';
  document.querySelector('#feedBack').innerHTML = description;
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
  document.querySelector('#guess').value = '';
}

function reset(event) {
  console.log('reset button');
  event.preventDefault();
  numberOfGuesses = 0;
  invisElement('#attempt');
  invisElement('#feedBack');
  invisElement('#const');
  invisElement('#reset');
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