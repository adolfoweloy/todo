(function() {
    'use strict'

    const Model = function(store) {
        this.store = store;
    };

    Model.prototype.create = function(_description, _callback) {
        const description = _description || ''; // thrown an exception or provide an error callback?
        const callback = _callback || function() {};

        //  what if something bad happens?
        const todo = this.store.save({
            description: description,
            completed: false,
        });

        callback.call(null, todo);
    };

    Model.prototype.find = function(_id, _callback) {
        const id = _id || undefined; // thrown an exception or provide an error callback?
        const callback = _callback || function() {};

        // what should happen when the item can't be found?
        const todo = this.store
            .findAll()
            .filter(todo => todo.id === _id)[0]; // this doesn't sound safe
        
        callback.call(null, todo);
    };

    Model.prototype.update = function(_todo, _callback) {
        if (!_todo) {
            throw 'Todo must be an object';
        }
        const todo = _todo;
        const callback = _callback || function() {};

        const newTodo = this.store.save(todo);

        callback.call(null, newTodo);
    };

    Model.prototype.remove = function(_id, _callback) {
        const id = _id || undefined; // thrown an exception or provide an error callback?
        const callback = _callback || function() {};

        this.store.remove(id);

        callback.call(null);
    };

    Model.prototype.clear = function(_callback) {
        this.store.clear();
        const callback = _callback || function() {};

        callback.call(null);
    };

    window.app = window.app || {}
    window.app.Model = Model;
})();