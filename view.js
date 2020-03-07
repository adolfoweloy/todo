(function(window) {
    'use strict'

    function View() {
        this.$form = qs('form');
        this.$input = qs('input');
        this.$clearButton = qs('#clear');
        this.$ul = qs('ul');
    }

    View.prototype.bind = function(eventType, handler) {
        const self = this;
        if (eventType === 'newItem') {
            $on(self.$form, 'submit', function() {
                event.preventDefault();
                handler(self.$input.value, () => self.$input.value = '');
            });
        }

        if (eventType === 'clear') {
            $on(self.$clearButton, 'click', function() {
                handler();
            });
        }

        if (eventType === 'deleteOrTick') {
            $on(self.$ul, 'click', handler);
        }
    };

    View.prototype.addItem = function(todo) {
        let ul = qs('ul');
        let item = document.createElement('li');
        item.dataset['id'] = todo.id;
        item.innerHTML = `<label>${todo.description}</label><button class="delete"></button>`;
        ul.appendChild(item);
    };

    View.prototype.clearAll = function() {
        qs('ul').innerHTML = '';
    };

    window.app = window.app || {};
    window.app.View = View;

})(window);