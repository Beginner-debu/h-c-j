function turnButton(buttonName){
  const buttonElement = document.querySelector(`.${buttonName}`);
if(!buttonElement.classList.contains('on-click')  ){
  turnOffPreviousButton();
  buttonElement.classList.add('on-click');
}
else{
  buttonElement.classList.remove('on-click');
}
}

function turnOffPreviousButton(){
  const buttonElement = document.querySelector('.on-click');
  if(buttonElement){
    buttonElement.classList.remove('on-click');
  }

}