const itemName = document.getElementById('item_name');
const deadline = document.getElementById('deadline');
const priority = document.getElementById('priority');
const addBtn = document.getElementById('add_item');

addBtn.addEventListener('click', () => {
    let iName = itemName.value;
    let dLine = deadline.value;
    let prty = priority.value;

    if (iName && dLine && prty) {
        let todoData = {
            'iName': iName,
            'dLine': dLine,
            'prty': prty,
            'completed': false  // By default, a newly added task is not completed
        };

        addData(todoData);
        showTodo(); // Call showTodo function after adding a new task
        itemName.value = '';
        deadline.value = '';
        priority.value = '';
    } else {
        alert("Please fill in all fields.");
    }
});

function addData(todoData) {
    let todo = JSON.parse(localStorage.getItem('todo')) || [];
    todo.push(todoData);
    localStorage.setItem('todo', JSON.stringify(todo));
}

function showTodo() {
    const todaysContainer = document.getElementById('todays_todo_list');
    const futureContainer = document.getElementById('future_todo_list');
    const completedContainer = document.getElementById('completed_todo_list');
    let todoList = JSON.parse(localStorage.getItem('todo')) || [];

    // Clear existing content in containers
    todaysContainer.innerHTML = '';
    futureContainer.innerHTML = '';
    completedContainer.innerHTML = '';

    // Loop through the todo list
    for (let i = 0; i < todoList.length; i++) {
        let todo = todoList[i];
        let todoElement = document.createElement("div");
        todoElement.classList.add('todaysListContainer');

        let menuChildren = `
            <span>${todo.iName}</span>
            <span>${todo.dLine}</span>
            <span>${todo.prty}</span>
        `;

        // Check the completion status and deadline of each task
        if (todo.completed) {
            // If the task is completed, display it in the completed container
            completedContainer.appendChild(todoElement);
            menuChildren += `<div><span><button>M</button></span><span><button>D</button></span></div>`;
        } else {
            // If the task is not completed, check its deadline
            let today = new Date().toISOString().split('T')[0];
            if (todo.dLine <= today) {
                // If the deadline has passed, display it in the today's container
                todaysContainer.appendChild(todoElement);
            } else {
                // If the deadline is in the future, display it in the future container
                futureContainer.appendChild(todoElement);
            }
            // Add buttons for marking as completed and deleting the task
            menuChildren += `<div><span><button onclick="markAsCompleted(${i})">Mark as Completed</button></span><span><button onclick="deleteTask(${i})">Delete</button></span></div>`;
        }

        // Set the innerHTML of todoElement
        todoElement.innerHTML = menuChildren;
    }
}

// Function to mark a task as completed
function markAsCompleted(index) {
    let todoList = JSON.parse(localStorage.getItem('todo')) || [];
    todoList[index].completed = true; // Mark the task as completed
    localStorage.setItem('todo', JSON.stringify(todoList));
    showTodo(); // Update the todo list display
}

// Function to delete a task
function deleteTask(index) {
    let todoList = JSON.parse(localStorage.getItem('todo')) || [];
    todoList.splice(index, 1); // Remove the task from the todo list
    localStorage.setItem('todo', JSON.stringify(todoList));
    showTodo(); // Update the todo list display
}

// Call showTodo when the page loads
showTodo();
