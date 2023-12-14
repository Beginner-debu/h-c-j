const selectBar = document.getElementById('select');
const listItem = document.querySelector('ul');
const textToShow = document.querySelector('.select-element');
const optionsElement = document.querySelectorAll('ul li');
const iconElement = document.querySelector('#select img');

listItem.classList.add('hide');

selectBar.addEventListener('click', () => {
  listItem.classList.toggle('hide');
  iconElement.classList.toggle('rotate');
});

optionsElement.forEach((li) => {
  li.addEventListener('click', () => {
    textToShow.innerHTML = li.textContent;
    listItem.classList.toggle('hide');
    iconElement.classList.toggle('rotate');
  })
});