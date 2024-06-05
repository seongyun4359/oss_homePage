const host = "http://127.0.0.1:8080";
const todosContainer = document.querySelector('.todos-container');

function getTodos() {
    console.log(`Requesting todos from: ${host}/todo`);
    axios.get(`${host}/todo`)
        .then(response => {
            console.log('Response received:', response.data);
            renderTodos(response.data.todos);
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });
}

function renderTodos(todos) {
    todosContainer.innerHTML = '';
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');

        const todoContent = document.createElement('span');
        todoContent.classList.add('todo-name-input');
        todoContent.innerHTML = `작성자: ${todo.writer}<br>내용: ${todo.item}<br>작성시간: ${new Date(todo.time).toLocaleString()}`;
        todoDiv.appendChild(todoContent);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'x';
        deleteBtn.addEventListener('click', function () {
            deleteTodo(todo.id);
        });
        todoDiv.appendChild(deleteBtn);

        todosContainer.appendChild(todoDiv);
    });
}

window.addEventListener('DOMContentLoaded', function () {
    getTodos();
});

const todoInput = document.querySelector('#content');
const todoNameInput = document.querySelector('#writer');

todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});
todoNameInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    const title = todoInput.value.trim();
    const name = todoNameInput.value.trim();

    let todoData = {
        id: 0,
        item: title,
        writer: name,
        time: new Date().toISOString()
    };

    if (title === '' || name === '') return;

    axios.post(`${host}/todo`, todoData)
        .then(response => {
            todoInput.value = '';
            todoNameInput.value = '';
            getTodos();
        })
        .catch(error => {
            console.error('Error adding todo:', error);
        });
}

function deleteTodo(id) {
    axios.delete(`${host}/todo/${id}`).then(response => {
        getTodos();
    }).catch(error => {
        console.error('Error deleting todo:', error);
    });
}