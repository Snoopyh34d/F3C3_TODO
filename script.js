const itemName = document.getElementById('item_name');
const deadline = document.getElementById('deadline');
const priority = document.getElementById('priority');
const addBtn = document.getElementById('add_item');


let todoData = {};

addBtn.addEventListener('click', ()=>{

    let iName = itemName.value;
    let dLine = deadline.value;
    let prty = priority.value;

    todoData = {
        'iName' : iName,
        'dLine' : dLine,
        'prty' : prty
    };

    addData(todoData);
    itemName.value = '';
    deadline.value = '';
    priority.value = '';

})

function addData(todoData){
    let todo = JSON.parse(localStorage.getItem('todo')) || [];
    todo.push(todoData);
    localStorage.setItem('todo', JSON.stringify(todo))
    // showTodo();
}


function showTodo(){
    const todaysContainer = document.getElementById('todays_todo_list');
    let todoList = JSON.parse(localStorage.getItem('todo')) || [];

    for(let i=0; i<todoList.length; i++){
      let todo = todoList[i]; 
      let todoElement = document.createElement("div");
    todoElement.classList.add('todaysListContainer')
     const menuChildren = `
     <span>${todo.iName}</span>
     <span>${todo.dLine}</span>
     <span>${todo.prty}</span>
     <div>
     <span><button>M</button></span>
     <span><button>D</button></span>
     </div>
     `;
     todoElement.innerHTML = menuChildren;
     todaysContainer.append(todoElement);
  }
  }





// window.onload = ()=>{
//     showTodo();
// }
showTodo();