let currentDisplay = '';
let firstNumber = 0;
let secondNumber = 0;
let operationClicked = '+';
let firstClick=true;
let canDot=true
const keyboard = document.querySelector('#gridContainer');
const display = document.querySelector('.focused');
const history = document.querySelector('.history');
const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operator');
const deleteKey = document.querySelector('.delete');
const deleteAll = document.querySelector('.deleteall');
const equal = document.querySelector('.equal');
const dot = document.querySelector('.dot');

keyboard.addEventListener('click', () => {
  display.innerHTML = currentDisplay;
});
//DEL
deleteKey.addEventListener('click', ()=>{
  currentDisplay=currentDisplay.slice(0,-1)
})
dot.addEventListener('click',() =>{
  if (canDot){
  currentDisplay += dot.innerHTML;
canDot=false}
})
// RESETS ALL PARAMETERS 
deleteAll.addEventListener('click', ()=>{
  currentDisplay=''
  firstClick=true
  firstNumber=0
  secondNumber=0
  history.innerHTML=''
})
// ADD CLICKED NUMBER TO DISPLAY
numbers.forEach((e) =>
  e.addEventListener('click', () => {
    currentDisplay += e.innerHTML;
  })
);

operations.forEach((e) =>
  e.addEventListener('click', () => {
   if (firstClick){
     firstTime(e)
     canDot=true
   }
   else{
     secondTime(e)
     canDot=true
   }
  })
);
equal.addEventListener('click',()=>{
  firstNumber=parseFloat(currentDisplay.split(' ')[0]);
  secondNumber=parseFloat(currentDisplay.split(' ')[2]);
  operationClicked=currentDisplay.split(' ')[1];
  historyDisplay();
  currentDisplay = operate();
  firstClick=true
})
function secondTime(e){
  let operatorText = e.innerHTML;
  firstNumber=parseFloat(currentDisplay.split(' ')[0])
  secondNumber=parseFloat(currentDisplay.split(' ')[2]);
  historyDisplay();
  currentDisplay = operate();
  operationClicked = operatorText;
  currentDisplay += ` ${operatorText} `;

}
function firstTime(e){
  firstNumber = parseFloat(currentDisplay);
  let operatorText = e.innerHTML;
  operationClicked = operatorText;
  currentDisplay += ` ${operatorText} `;
  firstClick= false;
}
function historyDisplay(){
  if(history.innerHTML){
    history.innerHTML+=' '+currentDisplay.split(' ').slice(1).join(' ')}
  else{
    history.innerHTML+=currentDisplay
   
  }
}
function operate() {
  result = undefined;
  switch (operationClicked) {
    case '+':
      result = firstNumber + secondNumber;
      break;
    case '-':
      result = firstNumber - secondNumber;
      break;
    case '/':
      result = firstNumber / secondNumber;
      break;
    case '*':
      result = firstNumber * secondNumber;
      break;
    case '^':
      result = firstNumber ** secondNumber;
      break;
  }
  result= Math.round(result*1000)/1000
  return result.toString();
}
