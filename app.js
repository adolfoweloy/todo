(function(window) {
    const Todo = function() { }
    
    Todo.prototype.loadEvents = function() {
        $on(qs('form'), 'submit', (e) => this._submit(e));
        $on(qs('#clear'), 'click', () => this._clearList());
        $on(qs('ul'), 'click', (e) => this._deleteOrTick(e));
    };

    Todo.prototype._submit = function(e) {
        e.preventDefault();
        let input = qs('input');
        if (input.value != '') {
            this._addTask(input.value);
            input.value = '';
        }
    };

    Todo.prototype._addTask = function(task) {
        let ul = qs('ul');
        let item = document.createElement('li');
        item.innerHTML = `<label>${task}</label><span class="delete">×</span>`;
        ul.appendChild(item);
        qs('.tasksBoard').style.display = 'block';
    };
        
    Todo.prototype._clearList = function() {
        qs('ul').innerHTML = '';
    };
        
    Todo.prototype._deleteOrTick = function(e) {
        if (e.target.className == 'delete') {
            this._deleteTask(e);
        } else {
            this._tickTask(e);
        }
    };
        
    Todo.prototype._deleteTask = function(event) {
        event.target.parentElement.remove();
    };
        
    Todo.prototype._tickTask = function(event) {
        const task = event.target;
        if (task.style.textDecoration === 'line-through') {
            task.style.textDecoration = 'none';        
            task.style.color = "#2f4f4f";
        } else {
            task.style.textDecoration = 'line-through';
            task.style.color = "#ff0000";
        }
    };

    window.app = window.app || new Todo();
    $on(window, 'load', window.app.loadEvents());

})(window);
