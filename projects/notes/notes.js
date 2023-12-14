const divElement = document.querySelector('.outer-container');
const buttonElement = document.querySelector('.outer-container button');




function getItems(article){
  article.innerHTML = localStorage.getItem('notes');
}
buttonElement.addEventListener('click', () => {
  const article =  document.createElement('div');
  const image = document.createElement('img');
  const inputBox = document.createElement('p');
  inputBox.setAttribute('contenteditable', 'true');
  article.classList.add('notes-container');
  image.src='./images/delete.png';
  divElement.appendChild(article);
  article.appendChild(inputBox);
  article.appendChild(image);
  image.addEventListener('click', () => {
    divElement.removeChild(article);

  });

  article.addEventListener('click', (e) => {
    if(e.target.tagName === 'p'){
      notes = document.querySelectorAll('p');
      notes.forEach((note) => {
        note.onkeyup = function () {
  
        }
      });
    }
  })

});


