const appAddInput = document.querySelector('.newItem'),
      appAddButton = document.querySelector('.app__input-add'),
      appList = document.querySelector('.app__list'),
      buttons = document.querySelectorAll('.button');
      


document.addEventListener('DOMContentLoaded', () => {
    getTodos()
    const appItems = document.querySelectorAll('.app__todo__div');
    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const currentCategory = button.dataset.filter;
            filter(currentCategory, appItems);
        })
    })

    function filter(category, items) {
        items.forEach((item) => {
            const isItemFiltered = item.classList.contains(category);
            const isShowAll = category.toLowerCase() === 'all';
            if (!isItemFiltered && !isShowAll) {
                item.classList.add('hide');
            } else {
                item.classList.remove('hide')
            }
        })
    }
})


appAddButton.addEventListener('click', addItem);
appList.addEventListener('click', deleteOrCheck)


function addItem(e) {
    e.preventDefault();

    const toDoDiv = document.createElement('div');
    toDoDiv.classList.add('app__todo__div');

    const toDoList = document.createElement('li');
    toDoList.innerText = appAddInput.value;
    toDoList.classList.add('app__todo__list');
    toDoDiv.appendChild(toDoList);

    saveTodos(appAddInput.value);

    const checkButton = document.createElement('button');
    checkButton.classList.add('app__todo__check')
    checkButton.innerHTML = '<i class="fa fa-check"></i>';
    toDoDiv.appendChild(checkButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('app__todo__trash')
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
    toDoDiv.appendChild(deleteButton);

    appList.appendChild(toDoDiv);

    appAddInput.value = '';
}

function deleteOrCheck(e) {
    const target = e.target;

    if (target.classList[0] === 'app__todo__trash') {
        const todo = target.parentElement;
        todo.classList.add('delete');
        removeFromLocal(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove()
        });
    }

    if (target.classList[0] === 'app__todo__check') {
        const todo = target.parentElement;
        todo.classList.toggle('done')
    }
}




function saveTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const toDoDiv = document.createElement('div');
        toDoDiv.classList.add('app__todo__div');

        const toDoList = document.createElement('li');
        toDoList.innerText = todo;
        toDoList.classList.add('app__todo__list');
        toDoDiv.appendChild(toDoList);


        const checkButton = document.createElement('button');
        checkButton.classList.add('app__todo__check')
        checkButton.innerHTML = '<i class="fa fa-check"></i>';
        toDoDiv.appendChild(checkButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('app__todo__trash')
        deleteButton.innerHTML = '<i class="fa fa-trash"></i>';
        toDoDiv.appendChild(deleteButton);

        appList.appendChild(toDoDiv);
    });
}

function removeFromLocal(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}