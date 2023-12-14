const date = document.querySelector('.left-section h1');
const day = document.querySelector('.day');
const month = document.querySelector('.month');
const year = document.querySelector('.year');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March','April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const currentDate = new Date();
date.innerHTML = (currentDate.getDate()<10)? '0' + currentDate.getDate():currentDate.getDate();
day.innerHTML = days[currentDate.getDay()];
month.innerHTML = months[currentDate.getMonth()];
year.innerHTML = currentDate.getFullYear();