// PRODUCTION LOG
// Add additional inputs that allow the user to specify the minimum/maximum range.
// Upon successful win, user’s range is updated:
//    Every time the user wins a round increase the maximum number by 10.
//    Every time the user wins a round decrease the minimum number by 10.
//    Appropriate UI is incorporated such that user understands what is happening.
// (Pro-tip: You’ll need to adjust the input fields to accept the new minimum and maximum numbers.)

// Research keyword 'this', error user-prompt options for numbers submitted outside of preset range.

//ERROR - hitting enter after submitting guess runs updateMin and updateMax...

var guess = 0;
var numberOfGuesses = 0;
var ans = 0;
var description = '';
var winCase = 'You Win!<br />Click Reset to<br /> play again.';
var guesses = [];
var userMin = 1;
var userMax = 100;

var sub = document.querySelector('#submit');
var cl = document.querySelector('#clearText');
var res = document.querySelector('#reset');

sub.addEventListener('click', submitGuess);
cl.addEventListener('click', clearInput);
res.addEventListener('click', reset);

var minChange = document.querySelector('#minGuess');
var maxChange = document.querySelector('#maxGuess');
var guess = document.querySelector('#guess'); 

minChange.onkeypress = changeWidth;
maxChange.onkeypress = changeWidth;

minChange.onkeydown = restrictNegatives;
maxChange.onkeydown = restrictNegatives;
guess.onkeydown = restrictNegatives;
 //adds 'onkeydown' event listener and references keycode to restrict which keyboard keys are alowed. effectively removes ability for user to input negative numbers. to be applied to min and max inputs as well. 
 function restrictNegatives(event){
  if(!((event.keyCode > 95 && event.keyCode < 106)
    || (event.keyCode > 47 && event.keyCode < 58) 
    || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13)) {
    return false;
}
}

function changeWidth(event){
  this.style.width = ((this.value.length + 1) * 9) + 'px';
}

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
  while (this.value == ''){//disables buttons if user deletes entire guess before hitting submit.
    toggleButtonOff('#submit');
    toggleButtonOff('#clearText');
    document.querySelector('#guess').disabled = false;
    console.log('value isNaN');
    break;  
  }
  while (this.value < userMin || this.value > userMax){ // prevents guess out of range. 
    toggleButtonOff('#submit');
    break;
  }
  while (userMin > userMax){
    toggleButtonOff('#submit');
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
  toggleButtonOff('#subMinMax');
  document.querySelector('#guess').disabled = true;
  document.querySelector('#minGuess').disabled = true;
  document.querySelector('#maxGuess').disabled = true;
  console.log('..........................');
  console.log('default form settings prevented');
  console.log('submit guess function');
}

function outOfRange(){
  description = "You must submit a number between " + document.querySelector('#guess').min + " and " + document.querySelector('#guess').max + ".";
  alert('Did we not explain the rules? Clear your guess and see the prompt inside the text box.');
}

function repeatedGuess(){
  for (i=0; i < guesses.length; i++){
    if (guess == guesses[i]){
      description = 'You already guessed that...';
    }
  }
  guesses.push(guess);
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
  repeatedGuess();
  describeGuess();
  gameOver();
  return description;
}

function generateNumber() {
  console.log('random number generated');
  if (numberOfGuesses === 0) {
    return ans = Math.floor((Math.random()*(userMax-userMin+1))+userMin);
  } else {
    return ans;
  }
}

function getGuess(){
  guess = parseInt(document.querySelector('#guess').value);
  console.log('obtained guess from user');
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
  guesses = [];
  invisElements(['#attempt', '#feedBack', '#const', '#reset'])
  clearInput(event);
  changeText('#const', 'Your last guess was');
  document.querySelector('#guess').disabled = true;
  document.querySelector('#minGuess').disabled = false;
  document.querySelector('#maxGuess').disabled = false;
  toggleButtonOn('#subMinMax');
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

// var submitMin = document.querySelector('#minGuess');

// submitMin.onBlur = subMin;

// function subMin(){
//   getMin();
//   userInput.min = userMin;
//   console.log('....user input min')
// }

// var submitMax = document.querySelector('#maxGuess');

// submitMax.onBlur = subMax;

// function subMax(){
//   getMax();
//   userInput.max = userMax;
//   console.log('....user input max')
// }

//update min/max inputs
//find a way to add event listener that doesn't run below functions when clicking buttons other than 'update min/max'.

var submitMinMax = document.querySelector('#subMinMax');

submitMinMax.addEventListener('click', updateMinMax, false);

function getMin(){
  userMin = parseInt(document.querySelector('#minGuess').value);
  return userMin;
}

function getMax(){
  userMax = parseInt(document.querySelector('#maxGuess').value);
  return userMax;
}

function updateMin(){
  getMin();
  userInput.min = userMin;
  document.querySelector('#maxGuess').min = userMin;
  console.log('updateMin() called');
  return userMin;
}

function updateMax(){
  if (document.selectQuery > getMax()){
    userInput.max = userMin;
    userInput.min = userMax;
    console.log('userMin > userMax')
    return userMax;
  } else {
    userInput.max = userMax;
    console.log('updateMax() called');
  }
  return userMax;
}

function updateMinMax(event){
  event.preventDefault();
  // reset(event);
  updateMax();
  updateMin();
  document.querySelector('#guess').disabled = false;
  document.querySelector('#guess').placeholder = 'Guess a number between ' + userMin + ' and ' + userMax + '.';
}