const inputElement = document.querySelector('.input-container input');
const imageElement = document.querySelector('.input-container img');
const buttonElement = document.querySelector('button');
const paraElement = document.querySelector('p');

const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCaseLetters = upperCaseLetters.toLowerCase();
const numbers = '0123456789';
const specialCharacters = '~!@#$%^&*()<>?|}{][';
const totalChars = upperCaseLetters + lowerCaseLetters + numbers + specialCharacters;
const passwordAmount = 12;

function generatePassword(){
  let password = '';
  password += upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)];
  password += lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

  while(passwordAmount > password.length){
    password += totalChars[Math.floor(Math.random() * totalChars.length)];
  }
  inputElement.value = password;
}
buttonElement.addEventListener('click', () => {
  generatePassword();
});

imageElement.addEventListener('click', () => {
  inputElement.select();
  document.execCommand('copy');
  paraElement.classList.add('done');
  setTimeout(() => {
    paraElement.classList.remove('done');
  },1000);
});