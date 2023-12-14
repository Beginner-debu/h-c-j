const divElement = document.querySelector('.js-snack-container');
const buttons = document.querySelectorAll('.button-container button');


const successExplaination = `<i class="fa-solid fa-circle-check"></i>Successfully Completed!`;
const errorExplaination = '<i class="fa-regular fa-circle-xmark"></i>Please fix the error';
const invalidExplaination = '<i class="fa-solid fa-circle-exclamation"></i>Invalid input, check agian';
buttons.forEach((button) => {
button.addEventListener('click', (e) => {
  if(e.currentTarget.id === 'success')
  {
    showBar(successExplaination);
    console.log(successExplaination);
  }
  else if (e.currentTarget.id === 'error'){
    showBar(errorExplaination);
  }
  else{
    showBar(invalidExplaination);
  }

})
});

function showBar(data){
  const container = document.createElement('div');
  container.classList.add('alert-container');
  container.innerHTML = data;

  if(data.includes('error')){
    container.classList.add('error');
  }
  else if(data.includes('Invalid')){
    container.classList.add('invalid');
  }
  divElement.appendChild(container);

  setTimeout(() => {
    container.remove();
  }, 5000);
}