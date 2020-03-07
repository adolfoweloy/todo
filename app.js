(function(window) {
    const Todo = function(model, view) { 
        this.model = model;
        this.view = view;
    }
    
    Todo.prototype.loadEvents = function() {
        const self = this;

        self.view.bind('newItem', function(description, clearStateCallback) {
            self.newItem(description, clearStateCallback);
        });

        self.view.bind('clear', function() {
            self.clearList();
        });

        self.view.bind('deleteOrTick', function() {
            self.deleteOrTick(event);
        });
    };

    Todo.prototype.newItem = function(description, clearStateCallback) {
        const self = this;
        if (description != '') {
            self.model.create(description, function(todo) {
                self.view.addItem(todo);
                clearStateCallback.call(null);
            });
        }
    };
    
    Todo.prototype.clearList = function() {
        const self = this;
        self.model.clear(function() {
            self.view.clearAll();
        });
    };
        
    Todo.prototype.deleteOrTick = function(event) {
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
