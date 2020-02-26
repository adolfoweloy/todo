(function() {
    'use strict'

    const Model = function(store) {
        this.store = store;
    };

    Model.prototype.create = function(_description, _callback) {
        const description = _description || '';
        const callback = _callback || function() {};

        const todo = this.store.save({
            description: description,
            completed: false,
        });

        callback.call(null, todo);
    };

    window.app = window.app || {}
    window.app.Model = Model;
})();