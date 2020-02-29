(function(window) {
    'use strict'

    function Store(name) {
        this._dbName = name;
        let todos = {items: []};
        localStorage.setItem(name, JSON.stringify(todos));
    };

    Store.prototype.findAll = function() {
        return JSON.parse(localStorage.getItem(this._dbName)).items;
    };

    Store.prototype.save = function(todo) {
        const todos = JSON.parse(localStorage.getItem(this._dbName));
        
        if (!!todo.id) {
            for (let i=0; i<todos.items.length; i++) {
                if (todos.items[i].id === todo.id) {
                    todos.items[i] = todo; // replace
                }
            }
        } else {
            let r1 = Math.round(Math.random() * 10) | Math.round(Math.random() * 100);
            let id = '' + new Date().getTime() + '-' + r1;
            todo.id = id;
            todos.items.push(todo);
        }

        localStorage.setItem(this._dbName, JSON.stringify(todos));

        return todo;
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

    Store.prototype.clear = function() {
        localStorage.setItem(
            this._dbName,
            JSON.stringify({items: []})
        );
    };

    window.app = window.app || {};
    window.app.Store = Store;
})(window);