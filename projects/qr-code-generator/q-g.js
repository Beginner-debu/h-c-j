const inputElement = document.querySelector('.outer-container input');
const buttonElement = document.querySelector('.outer-container button');
const containerElement = document.querySelector('.js-container');




async function getQrCode(input){
  const qrCode = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${input}`);
  const imgElement = document.createElement('img');
  imgElement.src = `${qrCode.url}`;
  containerElement.appendChild(imgElement);
  containerElement.style.display = 'block';
}

buttonElement.addEventListener('click', () => {
  containerElement.innerHTML = '';
  const input = inputElement.value;
  getQrCode(`${input}`);
});

