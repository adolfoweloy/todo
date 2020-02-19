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
    item.innerHTML = `<span class="delete">×</span><input type="checkbox"><label>${task}</label>`;
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
        if (e.target.nodeName === 'INPUT')
        tickTask(e);
    }
}

function deleteTask(event) {
    event.target.parentElement.remove();
}

function tickTask(event) {
    const checkbox = event.target;
    const task = checkbox.nextSibling;
    if (checkbox.checked) {
        task.style.textDecoration = 'line-through';
        task.style.color = "#ff0000";
    } else {
        task.style.textDecoration = 'none';        
        task.style.color = "#2f4f4f";
    }
}