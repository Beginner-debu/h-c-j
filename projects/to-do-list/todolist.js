


document.addEventListener('DOMContentLoaded', () => {
    const inputElement = document.querySelector('.task-container input');
    console.log(inputElement);
    const listElement = document.querySelector('.todolist');
    console.log(listElement);
    const buttonElement = document.querySelector('.task-container button');
    

    buttonElement.addEventListener('click', () => {
      if(inputElement.value === ''){
        alert('So, you plan to do nothing huh lazybum');
      }
      else{
        const li = document.createElement('li');
        li.innerHTML = inputElement.value;
        listElement.appendChild(li);
        const span = document.createElement('span');
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    
        saveData();
        
        document.querySelector('.todolist').addEventListener('click', function (e) {
          const target = e.target;
        
          if (target.tagName === 'LI') {
            target.classList.toggle('active');
            saveData();
          } else if (target.tagName === 'SPAN') {
            target.parentElement.remove();
            saveData();
          }
        });
        
    
      }
      inputElement.value = '';
    });
    
    function saveData(){
      localStorage.setItem('lists', listElement.innerHTML);
    }
    
    function displayData() {
      listElement.innerHTML = localStorage.getItem('lists');
    }
    
    function init() {
      displayData();
    }
    
    init();
    
});
