
let todolist = JSON.parse(localStorage.getItem('todoList')) || [];


renderTodoList();



function renderTodoList(){
    let todoListHTML = '';
    todolist.forEach((todoObject,index) => {
      //const name = todoObject.name;
      ///const dueDate = todoObject.dueDate;
      const { name, dueDate} = todoObject;
      const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="
        todolist.splice(${index}, 1)
        renderTodoList();
      " class="delete-button">Delete</button>  
      `
      todoListHTML += html;
    })
document.querySelector('.js-todo-list')
  .innerHTML = todoListHTML;

  localStorage.setItem('todoList',JSON.stringify(todolist));


 
}


function addTodo(){
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dueDateElement = document.querySelector('.js-date-input');
  const dueDate = dueDateElement.value;

  todolist.push({
    //name: name,
    //dueDate: dueDate,
    name ,
    dueDate});

  inputElement.value = '';

  renderTodoList();
}


