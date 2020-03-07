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

        self.view.bind('tick', function(id, event) {
            self.tickTask(id, event);
        });
    };

    Todo.prototype.newItem = function(description, clearStateCallback) {
        const self = this;
        if (description != '') {
            // callback hell! :D
            self.model.create(description, function(todo) {
                self.view.addItem(todo, function(newItem) {
                    self.view.bind('delete', function(id) {
                        self.deleteTask(id);
                    }, newItem);
                    clearStateCallback.call(null);
                });
            });
        }
    };
    
    Todo.prototype.clearList = function() {
        const self = this;
        self.model.clear(function() {
            self.view.clearAll();
        });
    };
        
    Todo.prototype.deleteTask = function(id) {
        const self = this;
        self.model.remove(id, function() {
            self.view.remove(id);
        });
    };

    Todo.prototype.tickTask = function(id, event) {
        const self = this;
        self.model.find(id, 
            function(todo) { // success
                self.model.toggle(todo, function(newTodo) {
                    self.view.completed(newTodo);
                });
            },
            function(id) { // todo not found
                console.log(`${id} not found`);
            }
        );
    };

    const model = new window.app.Model(new window.app.Store('todo'));
    const view = new window.app.View();

    window.app = window.app || {};
    window.app.todo = new Todo(model, view);
    window.app.todo.loadEvents();

})(window);
