const imageElement = document.querySelector('.image-container');
const backButton = document.getElementById('back-button');
const nextButton = document.getElementById('next-button');



imageElement.addEventListener('wheel', (e) => {
  e.preventDefault();
  //console.log(e.deltaY);
  imageElement.scrollLeft += e.deltaY;
});

backButton.addEventListener('click', () => {
  imageElement.style.scrollBehavior = 'smooth';
  imageElement.scrollLeft -= 860;
});
nextButton.addEventListener('click', () => {
  imageElement.style.scrollBehavior = 'smooth';
  imageElement.scrollLeft += 860;
});