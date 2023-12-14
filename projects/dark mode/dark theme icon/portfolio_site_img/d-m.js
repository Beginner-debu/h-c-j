const moonImage = document.getElementById('moon');

moonImage.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  if(document.body.classList.contains('dark-theme')){
    moonImage.src = '../sun.png';
  }
  else{
    moonImage.src='../moon.png';
  }

});