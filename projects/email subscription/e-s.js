const scriptURL = 'https://script.google.com/macros/s/AKfycbwZEBYT4HsYvFiU7FNHo57OcSv6xZAJHYDzUMFVMzwkfhiOOtNw5x0MhANizvDrPKH8aA/exec'
const form = document.forms['submit-to-google-sheet']
const spanElement = document.querySelector('span');
spanElement.style.display = 'none';

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then((response) => {
      spanElement.style.display = 'block';

      setTimeout(() => {
        spanElement.style.display = 'none';
      },5000);
      form.reset();
    })
    .catch(error => console.error('Error!', error.message)) 
})
