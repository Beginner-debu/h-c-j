const todolist = [{
  name:'make dinner',
  dueDate:'2023-10-24'
 } ,{
  name: 'wash dishes',
  dueDate:'2023-10-24'
 } ];

renderTodoList();

function renderTodoList(){
    let todoListHTML = '';
    for(let i = 0;i < todolist.length;i++){
      const todoObject = todolist[i];
      //const name = todoObject.name;
      ///const dueDate = todoObject.dueDate;
      const { name, dueDate} = todoObject;
      const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button onclick="
        todolist.splice(${i}, 1)
        renderTodoList();
      " class="delete-button">Delete</button>  
      `
      todoListHTML += html;
  }
document.querySelector('.js-todo-list')
  .innerHTML = todoListHTML;
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


