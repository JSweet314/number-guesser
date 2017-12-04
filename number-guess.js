// PRODUCTION LOG
// Phase Two: More Better

// The input field should only accept numerical entries, within the defined min and max range - IN PROGRESS - INPUT FIELD ONLY ACCEPTS NUMERICAL INPUT (changed type from 'submit' to 'number') BUT USER IS STILL ABLE TO MANUALLY TYPE NUMBER OUTSIDE OF PRESET MIN/MAX.

// The application should display an error message if the guess is not a number (e.g. parseInt() returns NaN). - IN PROGRESS - USER IS UNABLE TO SUBMIT EMPTY FIELD OR NaN - ISSUE STILL EXISTS THAT USER CAN INPUT NUMBER OUTSIDE PRESET MIN/MAX.

// The application should display an error if the guess is outside of the range of possible answers. - IN PROGRESS - IF USER INPUT IS OUTSIDE OF PRESET RANGE, DESCRIPTION VARIABLE UPDATED TO PRINT ERROR MESSAGE TO SCREEN 

// The clear button should be disabled if there is nothing to clear.  - DONE - IF USER DOES NOT PROVIDE INPUT TO NUMBER FIELD OR CLEAR/RESET BUTTON IS PRESSED AND TEXT FIELD IS CLEARED, CLEAR BUTTON IS DISABLED.

// The reset button should be disabled if there is nothing to reset. - DONE - RESET BUTTON VISIBILILITY PROPERTY SET TO HIDDEN UNTIL GUESS IS MADE AND AFTER RESET BUTTON IS CLICKED

// Research keyword 'this', error user promtp options for numbers submitted outside of preset range.

var guess = 0;
var numberOfGuesses = 0;
var ans = 0;
var description = '';

var sub = document.querySelector('#submit');
var cl = document.querySelector('#clearText');
var res = document.querySelector('#reset');

sub.addEventListener('click', submitGuess);
sub.addEventListener('click', gameOver);
cl.addEventListener('click', clearInput);
res.addEventListener('click', reset);

// below - eventListener for user input into text area
var userInput = document.querySelector('#guess');

userInput.addEventListener('input', enableButtons, false);


function enableButtons() {
  //function for eventListener 'input' in text box.
  if (!isNaN(this.value)){ 
    document.querySelector('#submit').disabled = false;
    document.querySelector('#clearText').disabled = false;
    changeAttribute('#game', 'class', 'hover');
    changeAttribute('#submit', 'class', 'buttonEnabled');
    changeAttribute('#clearText', 'class', 'buttonEnabled');
  } else if (isNaN(this.value) || ((this.value > this.max) || (this.value < this.min))){
    console.log('value isNaN line 39');
    changeAttrubute('#submit', 'class', 'buttonDisabled');
    changeAttribute('#clearText', 'class', 'buttonDisabled');
  }
}


function gameOver(event){
  if (description === 'BOOM!'){
    changeAttribute('#submit', 'class', 'buttonDisabled');
    document.querySelector('#submit').disabled = true;
    document.querySelector('#const').innerHTML = 'BOOM!';
    document.querySelector('#feedBack').innerHTML = 'You Win!<br />Click Reset to<br /> play again.';
  }
} 


function changeAttribute(selector, attribute, value) { //function to change element attributes easier
  toBeChanged = document.querySelector(selector);
  toBeChanged.setAttribute(attribute, value);
}

function submitGuess(event) {
  console.log('default form settings prevented');
  console.log('submit guess function');
  numberGuesser();
  event.preventDefault();
}

function numberGuesser(){
  ans = generateNumber();
  getGuess();
  numberOfGuesses += 1;
  console.log('numberOfGuesses = ' + numberOfGuesses);
  console.log('guess = ' + guess);
  console.log('ans = ' + ans);
  if ((guess > document.querySelector('#guess').max)||(guess < document.querySelector('#guess').min)){
    description = "You must submit a number between " + document.querySelector(
      '#guess').min + " and " + document.querySelector('#guess').max + ".";
    alert('Did we not explain the rules? Clear your guess and see the prompt inside the text box.');
  } else if (guess === ans){
    description = 'BOOM!';
  } else if (guess < ans) {
    description = 'That is too low'
  } else {
    description = 'That is too high';
  }
  describeGuess();
  if (description === 'BOOM!'){
    changeAttribute('#submit', 'class', 'buttonDisabled');
    document.querySelector('#submit').disabled = true;
    console.log('submit button disabled');
    changeAttribute('#clearText', 'class', 'buttonDisabled');
    document.querySelector('#clearText').disabled = true;
    console.log('clear button disabled');
  }
  return description;
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
  presentGuess();
}

function clearInput(event) {
  event.preventDefault();
  console.log('Default form settings prevented');
  console.log('text box set to \'\'');
  document.querySelector('#guess').value = '';
  document.querySelector('#clearText').disabled = true;
  document.querySelector('#submit').disabled = true;
  document.querySelector('#submit').setAttribute('class', 'buttonDisabled');
  document.querySelector('#clearText').setAttribute('class', 'buttonDisabled')
}

function reset(event) {
  console.log('reset button');
  numberOfGuesses = 0;
  invisElement('#attempt');
  invisElement('#feedBack');
  invisElement('#const');
  invisElement('#reset');
  clearInput(event);
  document.querySelector('#const').innerHTML = 'Your last guess was';
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

function visElement(element){
  console.log('visElement function');
  document.querySelector(element).style.visibility = 'visible';
}

function invisElement(element){
  console.log('invisElement function');
  document.querySelector(element).style.visibility = 'hidden';
}