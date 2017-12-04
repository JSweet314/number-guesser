// PRODUCTION LOG
// Phase Two: More Better

// The input field should only accept numerical entries, within the defined min and max range - DONE - INPUT FIELD ONLY ACCEPTS NUMERICAL INPUT (changed type from 'submit' to 'number') BUT USER IS STILL ABLE TO MANUALLY TYPE NUMBER OUTSIDE OF MIN/MAX SET IN HTML.

// The application should display an error message if the guess is not a number (e.g. parseInt() returns NaN). - DONE - USER IS UNABLE TO SUBMIT EMPTY FIELD OR NaN.

// The application should display an error if the guess is outside of the range of possible answers. - DONE - user is alert(ed) and description changed to instruct user to input guess between .max and .min. 

// The clear button should be disabled if there is nothing to clear.  - DONE - IF USER DOES NOT PROVIDE INPUT TO NUMBER FIELD OR CLEAR/RESET BUTTON IS PRESSED AND TEXT FIELD IS CLEARED, CLEAR BUTTON IS DISABLED.

// The reset button should be disabled if there is nothing to reset. - DONE - RESET BUTTON VISIBILILITY PROPERTY SET TO HIDDEN UNTIL GUESS IS MADE AND AFTER RESET BUTTON IS CLICKED

// Research keyword 'this', error user promtp options for numbers submitted outside of preset range.

var guess = 0;
var numberOfGuesses = 0;
var ans = 0;
var description = '';
var winCase = 'You Win!<br />Click Reset to<br /> play again.';

var sub = document.querySelector('#submit');
var cl = document.querySelector('#clearText');
var res = document.querySelector('#reset');


sub.addEventListener('click', submitGuess);
cl.addEventListener('click', clearInput);
res.addEventListener('click', reset);

function readyPlay() {
  //function for eventListener 'input' in text box.
  if (!isNaN(this.value)){ 
    toggleButtonOn('#submit');
    toggleButtonOn('#clearText');
    changeAttribute('#game', 'class', 'hover');
  } else if (isNaN(this.value) || ((this.value > this.max) || (this.value < this.min))){
    toggleButtonOff('#submit')
    toggleButtonOff('#clearText')
    console.log('value isNaN');
  }
  while (this.value == ''){ //disables buttons if user deletes entire guess before hitting submit.
    toggleButtonOff('#submit')
    toggleButtonOff('#clearText')
    document.querySelector('#guess').disabled = false;
    console.log('value isNaN');
    break;  
  }
  return true;
}

var userInput = document.querySelector('#guess');
userInput.addEventListener('input', readyPlay, false);

function gameOver(){
  if (description === 'BOOM!'){
    toggleButtonOff('#submit');
    toggleButtonOff('#clearText');
    console.log('gameOver disabled submit and clear buttons');
    changeText('#const', 'BOOM!');
    changeHTML('#feedBack', winCase);
    document.querySelector('#guess').disabled = true;
  }
} 

function changeAttribute(selector, attribute, value) { //function to change element attributes easier
  var toBeChanged = document.querySelector(selector);
  toBeChanged.setAttribute(attribute, value);
}

function addClass(selector, value){
  var toBeChanged = document.querySelector(selector);
  toBeChanged.classList.add(value);
}

function removeClass(selector, value){
  var toBeChanged = document.querySelector(selector);
  toBeChanged.classList.remove(value);
}

function toggleButtonOn(buttonId){
  console.log('toggleButtonOn: ' + buttonId);
  removeClass(buttonId, 'buttonDisabled');
  addClass(buttonId, 'buttonEnabled');
  document.querySelector(buttonId).disabled = false;
}

function toggleButtonOff(buttonId){
  console.log('toggleButtonOff: ' + buttonId);
  removeClass(buttonId, 'buttonEnabled');
  addClass(buttonId, 'buttonDisabled');
  document.querySelector(buttonId).disabled = true;
}

function submitGuess(event) {
  changeText('#const', 'Your last guess was');
  numberGuesser();
  event.preventDefault();
  toggleButtonOff('#submit');
  document.querySelector('#guess').disabled = true;
  console.log('..........................');
  console.log('default form settings prevented');
  console.log('submit guess function');
}

function outOfRange(){
  description = "You must submit a number between " + document.querySelector(
    '#guess').min + " and " + document.querySelector('#guess').max + ".";
  alert('Did we not explain the rules? Clear your guess and see the prompt inside the text box.');
}

function numberGuesser(){
  ans = generateNumber();
  getGuess();
  numberOfGuesses += 1;
  console.log('numberOfGuesses = ' + numberOfGuesses);
  console.log('guess = ' + guess);
  console.log('ans = ' + ans);
  if ((guess > document.querySelector('#guess').max)||(guess < document.querySelector('#guess').min)){
    outOfRange();
  } else if (guess === ans){
    description = 'BOOM!';
  } else if (guess < ans){
    description = 'That is too low'
  } else if (guess > ans){
    description = 'That is too high';
  }
  describeGuess();
  gameOver();
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
  if (isNaN(guess)){
    changeText('#attempt', '');
    changeText('#const', 'WHOA!');
    changeText('#feedBack', 'Your must input a whole number!');
  } else {
    changeText('#attempt', guess)
  }
  visElements(['#attempt', '#const', '#reset']);
}

function changeText(selector, text){
  document.querySelector(selector).innerText = text;
}

function changeHTML(selector, text){
  document.querySelector(selector).innerHTML = text;
}

function describeGuess(){
  console.log('guess described');
  visElements(['#feedBack']);
  changeText('#feedBack', description);
  presentGuess();
}

function clearInput(event) {
  event.preventDefault();
  document.querySelector('#guess').value = '';
  toggleButtonOff('#clearText');
  toggleButtonOff('#submit');
  document.querySelector('#guess').disabled = false;
  console.log('..........................');
  console.log('clearInput() called')
  console.log('Default form settings prevented');
  console.log('text box set to \'\'');
}

function reset(event) {
  numberOfGuesses = 0;
  invisElements(['#attempt', '#feedBack', '#const', '#reset'])
  clearInput(event);
  changeText('#const', 'Your last guess was');
  document.querySelector('#guess').disabled = false;
  console.log('..........................');
  console.log('reset() called');
}

function visElements(elArray){
  var test = 'vis Elements: ';
  for (i=0; i < elArray.length; i++){
    document.querySelector(elArray[i]).style.visibility = 'visible';
    test += elArray[i] + ' ';
  }
  console.log(test);
}

function invisElements(elArray){
  var test = 'invis Elements: ';
  for (i=0; i < elArray.length; i++){
    document.querySelector(elArray[i]).style.visibility = 'hidden';
    test += elArray[i] + ' ';
  }
  console.log(test);
}

function visElement(element){
  console.log('visElement: ' + element);
  document.querySelector(element).style.visibility = 'visible';
}

function invisElement(element){
  console.log('invisElement: ' + element);
  document.querySelector(element).style.visibility = 'hidden';
}