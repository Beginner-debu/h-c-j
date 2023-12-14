const popUp = document.querySelector('.js-pop-up');
const submitButton = document.querySelector('.outer-container button');
const okButton = document.querySelector('.js-pop-up button');

submitButton.addEventListener('click', () => {
  openPopUp();
})

function openPopUp(){
  popUp.classList.add('open-pop-up');
  console.log(popUp.classList);
}
okButton.addEventListener('click', () => {
  popUp.classList.remove('open-pop-up');
});