loadEvents();

function loadEvents() {
    document.querySelector('form').addEventListener('submit', submit);
    document.querySelector('#clear').addEventListener('click', clearList);
    document.querySelector('ul').addEventListener('click', deleteOrTick);
}

function submit(e) {
    e.preventDefault();
    let input = document.querySelector('input');
    if (input.value != '') {
        addTask(input.value);
        input.value = '';
    }
}

function addTask(task) {
    let ul = document.querySelector('ul');
    let item = document.createElement('li');
    item.innerHTML = `<label>${task}</label><span class="delete">×</span>`;
    ul.appendChild(item);
    document.querySelector('.tasksBoard').style.display = 'block';
}

function clearList() {
    document.querySelector('ul').innerHTML = '';
}

function deleteOrTick(e) {
    if (e.target.className == 'delete') {
        deleteTask(e);
    } else {
        tickTask(e);
    }
}

function deleteTask(event) {
    event.target.parentElement.remove();
}

function tickTask(event) {
    const task = event.target;
    if (task.style.textDecoration === 'line-through') {
        task.style.textDecoration = 'none';        
        task.style.color = "#2f4f4f";
    } else {
        task.style.textDecoration = 'line-through';
        task.style.color = "#ff0000";
    }
}