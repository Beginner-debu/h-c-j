
const buttonElement = document.querySelector('.input-container button');
const paraElement = document.querySelector('p');

console.log(buttonElement);
console.log(paraElement);

const currentDate = new Date();
const currentDateMs = currentDate.getTime();

buttonElement.addEventListener('click', () => {
  const inputElement = document.querySelector('.input-container input');
  const inputDate = new Date(inputElement.value);
  const inputDateMs = inputDate.getTime();
  const difference = currentDateMs - inputDateMs
  

  const year = 365 * 86400 * 1000;
  const month = year/12;
  const days = month / 30;

  const calculatedYears = Math.floor(difference/year);
  const calculatedMonths = Math.floor((difference % year) / month);
  const calculatedDays = Math.floor((difference % month) / days);

  paraElement.innerHTML = `You are ${calculatedYears} years, ${calculatedMonths} months and ${calculatedDays} days old`;
});