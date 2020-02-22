const jsdom = require('mocha-jsdom');
const assert = require('assert');

describe('Store', function() {
    jsdom({
        url: 'http://dev.com'
    })
    before(function() {
        require('../store.js')
    })

    describe('#findAll()', function() {
        it('should return empty list when there is no todos', function() {
            const store = new window.app.Store('todos')
            const result = store.findAll()
            assert.equal(result.length, 0)
        });
    });

    describe('#add()', function() {
        after(function() {
            window.localStorage.clear();
        })
    
        it('should add 2 entries on todo list', function() {
            const store = new window.app.Store('todos')
            store.add({
                id: 'abc1',
                description: 'todo-1',
                completed: false,
            });
    
            store.add({
                id: 'abc2',
                description: 'todo-2',
                completed: false,
            })
    
            const result = store.findAll();
            assert.equal(result.length, 2);
        })
    });

    describe('#remove()', function() {
        after(function() {
            window.localStorage.clear();
        })
    
        it('should remove item matching id', function() {
            const store = new window.app.Store('todos')
            store.add({
                id: 'abc1',
                description: 'todo-1',
                completed: false,
            });
    
            store.add({
                id: 'abc2',
                description: 'todo-2',
                completed: false,
            })

            assert.equal(store.findAll().length, 2);
            store.remove('abc1');
            assert.equal(store.findAll().length, 1);
        })
    })
});