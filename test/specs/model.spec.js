const assert = require('assert');

describe('Model', function() {

    describe('#create()', function() {
        afterEach(function() {
            window.localStorage.clear();
        })

        it('should create a new todo entry', function() {
            const store = new window.app.Store('todos');
            const model = new window.app.Model(store);

            model.create('item 1', function(todo) {
                assert.equal(todo.description, 'item 1');
                assert.equal(todo.completed, false);
            });
        });
    });

    describe('#clear()',  function() {
        this.afterEach(function() {
            window.localStorage.clear();
        })

        it('should clear all items', function() {
            const store = new window.app.Store('todos');
            const model = new window.app.Model(store);

            model.create('item 1', function(todo) {
                assert.equal(store.findAll().length, 1);
            });
            model.clear(function() {
                assert.equal(store.findAll().length, 0);
            });
        })
    })
});
