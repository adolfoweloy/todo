const assert = require('assert');

describe('Store', function() {
    describe('#findAll()', function() {
        it('should return empty list when there is no todos', function() {
            const store = new window.app.Store('todos')
            const result = store.findAll()
            assert.equal(result.length, 0)
        });
    });

    describe('#save()', function() {
        afterEach(function() {
            window.localStorage.clear();
        })
    
        it('should add 2 entries on todo list', function() {
            const store = new window.app.Store('todos')
            store.save({
                description: 'todo-1',
                completed: false,
            });
    
            store.save({
                description: 'todo-2',
                completed: false,
            })
    
            const result = store.findAll();
            assert.equal(result.length, 2);
        });

        it('should update 1 entry on todo list', function() {
            const store = new window.app.Store('todos')
            const first = store.save({
                description: 'todo-1',
                completed: false,
            });
    
            const second = store.save({
                description: 'todo-2',
                completed: false,
            });

            store.save({
                id: second.id,
                description: 'todo-2',
                completed: true,
            });

            const found = store.findAll().filter((todo) => todo.id === second.id)[0];
            assert.equal(found.completed, true);
        });
    });

    describe('#remove()', function() {
        after(function() {
            window.localStorage.clear();
        })
    
        it('should remove item matching id', function() {
            const store = new window.app.Store('todos')
            let first = store.save({
                description: 'todo-1',
                completed: false,
            });
    
            let second = store.save({
                description: 'todo-2',
                completed: false,
            })

            assert.equal(store.findAll().length, 2);
            store.remove(first.id);
            assert.notEqual(first.id, second.id);
            assert.equal(store.findAll().length, 1);
        })
    })
});