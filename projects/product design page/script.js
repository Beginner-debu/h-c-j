const imageChangeButtons = document.querySelectorAll('.button-container button');
const image = document.querySelector('.img-container img');
const spanElement = document.querySelectorAll('p span');
console.log(spanElement);
const colorButtons = document.querySelectorAll('.preference-container button');

imageChangeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.id;
    imageChangeButtons.forEach((btn) => {
      if(btn.classList.contains('clicked')){
        btn.classList.remove('clicked');
      }
    });
    if(id === '2'){
      image.src = './432 product-img/image2.png';
    }
    else if(id === '3'){
      image.src = './432 product-img/image3.png';
    }
    else{
      image.src = './432 product-img/image1.png';
    }
    btn.classList.add('clicked');
  });
});

spanElement.forEach((span) => {
  span.addEventListener('click', () => {
    spanElement.forEach((span) => {
      if(span.classList.contains('span-click')){
        span.classList.remove('span-click');
      }
    })
    span.classList.add('span-click');
  });

});

colorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    colorButtons.forEach((button) => {
      if(button.classList.contains('color-click')){
        button.classList.remove('color-click');
      }
    });
    button.classList.add('color-click');
  })
});