(function() {
    'use strict'

    const Store = function(name) {
        this._dbName = name;
        if (!localStorage.getItem(name)) {
            let todos = {items: []};
            localStorage.setItem(name, JSON.stringify(todos));
        }
    };

    Store.prototype.findAll = function() {
        return JSON.parse(localStorage.getItem(this._dbName)).items;
    };

    Store.prototype.add = function(todo) {
        const todos = JSON.parse(localStorage.getItem(this._dbName));
        todos.items.push(todo);
        localStorage.setItem(this._dbName, JSON.stringify(todos));
    };

    Store.prototype.remove = function(id) {
        const todos = JSON.parse(localStorage.getItem(this._dbName));
        localStorage.setItem(
            this._dbName, 
            JSON.stringify({ 
                items: todos.items.filter((item) => item.id !== id) 
            })
        );
    };

    window.app = window.app || {};
    window.app.Store = Store;
})();