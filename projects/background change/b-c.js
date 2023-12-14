const behindContainer = document.querySelector('.behind-img-container');
const frontContainer = document.querySelector('.front-img-container');
const frontImage = document.querySelector('.front-img-container img');

console.log(behindContainer);
console.log(frontContainer);

const leftGap = behindContainer.offsetLeft;
frontImage.style.width = behindContainer.offsetWidth + 'px';
behindContainer.onmousemove = function(e){
  frontContainer.style.width = (e.pageX - leftGap) + 'px';
  console.log(e.pageX - leftGap);
  console.log(frontContainer.style.width);
}

