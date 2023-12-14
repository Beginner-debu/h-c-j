const inputElement = document.querySelector('.input-container input');
const paraElement = document.querySelector('.text-container p');
const divElement = document.querySelector('.input-container');
//console.log(inputElement);
//console.log(paraElement);
//console.log(divElement);
paraElement.style.display = 'none';

inputElement.addEventListener('keyup', () => {
  let value = inputElement.value;
  if(value.length > 0){
    paraElement.style.display = 'block';
  }
  if(value.length <= 4){
    paraElement.textContent = 'Password is weak';
    paraElement.style.color = 'red';
    divElement.style.borderColor = 'red';
  }
  else if(value.length > 4 && value.length <= 8){
    paraElement.textContent = 'Password is intermediate';
    paraElement.style.color = 'yellow';
    divElement.style.borderColor = 'yellow';
  }
  else{
    paraElement.textContent = 'Password is strong';
    paraElement.style.color = 'green';
    divElement.style.borderColor = 'green';
  }
  if(value.length === 0){
    divElement.style.borderColor = 'white';
    paraElement.style.display = 'none';
  }
});
