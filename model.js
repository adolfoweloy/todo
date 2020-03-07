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

    Model.prototype.find = function(_id, _callback, _not_found_callback) {
        const id = _id || undefined; // thrown an exception or provide an error callback?
        const callback = _callback || function() {};
        const callbackNotFound = _not_found_callback || function() {};

        // what should happen when the item can't be found?
        const todo = this.store
            .findAll()
            .filter(todo => todo.id === _id)[0]; // this doesn't sound safe
        
        if (todo) {
            callback.call(null, todo);
        } else {
            callbackNotFound.call(null, id);
        }
    };

    Model.prototype.toggle = function(_todo, _callback) {
        if (!_todo) {
            throw 'Todo must be an object';
        }
        const todo = _todo;
        const callback = _callback || function() {};

        todo.completed = !todo.completed;
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