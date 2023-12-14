const imgElement = document.querySelector('.outer-container img');
const inputElement = document.querySelector('.outer-container input');
console.log(inputElement);

imgElement.addEventListener('click', () => {
  if(!imgElement.classList.contains('password-image')){
    imgElement.src = './eye-icons/eye-open.png';
    imgElement.classList.add('password-image');
    inputElement.type = 'text';
    
  }
  else{
    imgElement.src = './eye-icons/eye-close.png';
    imgElement.classList.remove('password-image');
    inputElement.type = 'password';
  }
  console.log(inputElement.type);

});