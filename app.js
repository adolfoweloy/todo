(function(window) {
    const Todo = function(model) { 
        this.model = model;
    }
    
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
        this.model.create(task, function(todo) {
            // all view
            let ul = qs('ul');
            let item = document.createElement('li');
            item.setAttribute('id', todo.id);
            item.innerHTML = `<label>${todo.description}</label><span class="delete">×</span>`;
            ul.appendChild(item);
            qs('.tasksBoard').style.display = 'block';
        });
    };

    Todo.prototype._clearList = function() {
        this.model.clear(function() {
            qs('ul').innerHTML = '';
        });
    };
        
    Todo.prototype._deleteOrTick = function(event) {
        const element = event.target.parentElement;
        const id = element.getAttribute('id');
        if (event.target.className == 'delete') {
            this._deleteTask(id, event);
        } else {
            this._tickTask(id, event);
        }
    };

    Todo.prototype._deleteTask = function(id, event) {
        this.model.remove(id, function() {
            event.target.parentElement.remove();
        });
    };

    Todo.prototype._tickTask = function(id, event) {
        const that = this;
        that.model.find(id, function(todo) {
            const task = event.target;

            // this code still looks terrible!
            if (todo.completed) {
                todo.completed = false;
                that.model.update(todo, function() {
                    task.style.textDecoration = 'none';        
                    task.style.color = "#2f4f4f";
                });
            } else {
                todo.completed = true;
                that.model.update(todo, function() {
                    task.style.textDecoration = 'line-through';
                    task.style.color = "#ff0000";
                });
            }
        });
    };

    const model = new window.app.Model(new window.app.Store('todo'));

    window.app = window.app || {};
    window.app.todo = new Todo(model);
    window.app.todo.loadEvents();

})(window);
