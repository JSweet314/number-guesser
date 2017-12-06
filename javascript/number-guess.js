var min = 1;
var max = 100; 
var userGuess = 0;
var numberOfGuesses = 0;
var numberOfWins = 0;
var ans = 0;
var description = '';
var winCase = 'You Win!<br />Press Reset to<br /> PLAY AGAIN';
var guesses = [];
var userMin = 1;
var userMax = 100;
var description = "Your Guess is Out of Bounds";

var settings = document.querySelector('#settings');

var guess = document.querySelector('#guess');

guess.onkeydown = restrictNegatives;

guess.addEventListener('click', selectInput);

guess.addEventListener('input', readyGuess);

function readyGuess() {
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
    invisElement('#const');
    changeHTML('#const', 'Your last guess was');
    document.querySelector('#guess').disabled = false;
    console.log('value isNaN');
    break;  
  }
  while ((this.value < userMin) || (this.value > userMax)){ // prevents guess out of range. 
    toggleButtonOff('#submit');
    changeHTML('#const', 'Your Guess is Outside the Range');
    if (this.value != ''){
      visElement('#const');
      console.log('input < min or input > max');
    }
    break;
  }
  while ((this.value >= userMin) && (this.value <= userMax)){
    invisElement('#const');
    break;
  }
  return true;
}

var sub = document.querySelector('#submit');

sub.addEventListener('click', submitGuess);

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

var minChange = document.querySelector('#minGuess');

minChange.onkeydown = restrictNegatives;

minChange.addEventListener('click', selectInput);

var maxChange = document.querySelector('#maxGuess');

maxChange.onkeydown = restrictNegatives;

maxChange.addEventListener('click', selectInput);

var submitMinMax = document.querySelector('#subMinMax');

submitMinMax.addEventListener('click', submitRange);

function submitRange(event){
  event.preventDefault();
  // reset(event);
  userMin = parseInt(minChange.value);
  userMax = parseInt(maxChange.value);
  if (userMin > userMax){
    var ph = userMax;
    userMax = userMin;
    userMin = ph;
    maxChange.value = userMax;
    minChange.value = userMin;
  }
  guess.max = userMax;
  guess.min = userMin;
  minChange.disabled = true;
  maxChange.disabled = true;
  guess.disabled = false;
  document.querySelector('#guess').placeholder = 'Guess a number between ' + guess.min + ' and ' + guess.max;
  invisElements(['#subMinMax', '#settings']);
  visElements(['#guess', '#submit', '#clearText', '#reset']);
  changeAttribute('#guess', 'autocomplete', 'off');
  console.log('Range Updated ' + guess.min + ' - ' + guess.max);
  console.log('.............');
}

function selectInput(){
  this.select();
}

var cl = document.querySelector('#clearText');

cl.addEventListener('click', clearInput);

function clearInput(event) {
  event.preventDefault();
  document.querySelector('#guess').value = '';
  toggleButtonOff('#clearText');
  toggleButtonOff('#submit');
  document.querySelector('#guess').disabled = false;
  invisElements(['#const', '#attempt', '#feedBack']);
  console.log('..........................');
  console.log('clearInput() called')
  console.log('Default form settings prevented');
  console.log('text box set to \'\'');
}

var res = document.querySelector('#reset');

res.addEventListener('click', reset);

function reset(event) {
  numberOfGuesses = 0;
  guesses = [];
  invisElements(['#attempt', '#feedBack', '#const', '#reset', '#guess', '#clearText', '#submit'])
  visElements(['#subMinMax', '#settings']);
  clearInput(event);
  changeText('#const', 'Your last guess was');
  document.querySelector('#guess').disabled = true;
  document.querySelector('#minGuess').disabled = false;
  document.querySelector('#maxGuess').disabled = false;
  toggleButtonOn('#subMinMax');
  console.log('.............');
  console.log('reset() called');
}

function restrictNegatives(event){// adds 'onkeydown' event listener and references keycode to restrict which keyboard keys are alowed. effectively removes ability for user to input negative numbers. to be applied to min and max inputs as well.
  if(!((event.keyCode > 95 && event.keyCode < 106) || (event.keyCode > 35 && event.keyCode < 41) || (event.keyCode > 47 && event.keyCode < 58) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 13)){
    return false;
  }
}

function getGuess(){
  userGuess = parseInt(document.querySelector('#guess').value);
  console.log('obtained guess from user');
  return userGuess;
}

function numberGuesser(){
  ans = generateNumber();
  getGuess();
  numberOfGuesses += 1;
  console.log('numberOfGuesses = ' + numberOfGuesses);
  console.log('guess = ' + userGuess);
  console.log('ans = ' + ans);
  if ((userGuess > document.querySelector('#guess').max)|| (userGuess < document.querySelector('#guess').min)){
    outOfRange();
  } else if (userGuess === ans){
    description = 'BOOM!';
  } else if (userGuess < ans){
    description = 'That is too low<br>Clear Guess and Try Again'
  } else if (userGuess > ans){
    description = 'That is too high<br>Press Clear and Guess Again';
  }
  repeatedGuess();
  describeGuess();
  gameOver();
  return description;
}

function generateNumber() {
  if (numberOfGuesses === 0) {
    console.log('random number generated');
    return ans = Math.floor((Math.random()*(userMax-userMin+1))+userMin);
  } else {
    return ans;
  }
}

function outOfRange(){
  description = "You must submit a number between " + document.querySelector('#guess').min + " and " + document.querySelector('#guess').max + ".";
  alert('Did we not explain the rules? Clear your guess and see the prompt inside the text box.');
}

function repeatedGuess(){
  for (i=0; i < guesses.length; i++){
    if (userGuess == guesses[i]){
      description = 'You already guessed that...<br>Press Clear and Guess Again';
    }
  }
  guesses.push(userGuess);
}

function describeGuess(){
  console.log('guess described');
  visElements(['#feedBack']);
  changeHTML('#feedBack', description);
  presentGuess();
}

function presentGuess() {
  console.log('guess presented');
  if (isNaN(userGuess)){
    changeText('#attempt', '');
    changeText('#const', 'WHOA!');
    changeText('#feedBack', 'Your must input a whole number!');
  } else {
    changeText('#attempt', userGuess)
  }
  visElements(['#attempt', '#const', '#reset']);
}

function gameOver(){
  if (description === 'BOOM!'){
    toggleButtonOff('#submit');
    toggleButtonOff('#clearText');
    console.log('gameOver disabled submit and clear buttons');
    changeText('#const', 'BOOM!');
    changeHTML('#feedBack', winCase);
    document.querySelector('#guess').disabled = true;
    console.log('Game Over - Play Wins!');
    var settings = document.querySelector('#settings');
    if (settings.value === 'add10'){
      guess.max += 10;
      maxChange.value = userMax + 10;
      minChange.value = userMin;
      console.log('added 10 to userMax for win');
    } else if(settings.value === 'minus10'){
      guess.max -= 10;
      maxChange.value = userMax - 10;
      minChange.value = userMin;
      if (maxChange.value < userMin){
        alert('You beat the game! Congratulations!');
        maxChange.value = 100;
      }
      console.log('minus 10 from userMax for win');
    }
    document.querySelector('#guess').placeholder = 'Guess a number between ' + guess.min + ' and ' + guess.max;
    return true;
  } else {
    return false;
    console.log('Still Playing');
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

function changeText(selector, text){
  document.querySelector(selector).innerText = text;
}

function changeHTML(selector, text){
  document.querySelector(selector).innerHTML = text;
}

function visElements(elArray){
  var test = 'vis Elements: ';
  for (i=0; i < elArray.length; i++){
    document.querySelector(elArray[i]).style.display = 'inline-block';
    test += elArray[i] + ' ';
  }
  console.log(test);
}

function invisElements(elArray){
  var test = 'invis Elements: ';
  for (i=0; i < elArray.length; i++){
    document.querySelector(elArray[i]).style.display = 'none';
    test += elArray[i] + ' ';
  }
  console.log(test);
}

function visElement(element){
  console.log('visElement: ' + element);
  document.querySelector(element).style.display = 'inline-block';
}

function invisElement(element){
  console.log('invisElement: ' + element);
  document.querySelector(element).style.display = 'none';
}