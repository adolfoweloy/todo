(function(window) {
    const Todo = function(model, view) { 
        this.model = model;
        this.view = view;
    }
    
    Todo.prototype.loadEvents = function() {
        $on(qs('form'), 'submit', (e) => this._submit(e));
        $on(qs('#clear'), 'click', () => this._clearList());
        $on(qs('ul'), 'click', (e) => this._deleteOrTick(e));
    };

    Todo.prototype._submit = function(e) {
        e.preventDefault();
        const input = qs('input');
        if (input.value != '') {
            this._addTask(input.value);
            input.value = '';
        }
    };

    Todo.prototype._addTask = function(task) {
        const that = this;
        this.model.create(task, function(todo) {
            that.view.renderItem(todo);
        });
    };

    Todo.prototype._clearList = function() {
        this.model.clear(function() {
            qs('ul').innerHTML = '';
        });
    };
        
    Todo.prototype._deleteOrTick = function(event) {
        const element = event.target.parentElement;
        if (!(element instanceof HTMLLIElement)) return;

        const id = element.dataset.id;
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
    const view = new window.app.View();

    window.app = window.app || {};
    window.app.todo = new Todo(model, view);
    window.app.todo.loadEvents();

})(window);
