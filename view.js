(function(window) {
    'use strict'

    function View() {
        this.$form = qs('form');
        this.$input = qs('input');
        this.$clearButton = qs('#clear');
        this.$ul = qs('ul');
    }

    View.prototype.bind = function(eventType, handler, target) {
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

        if (eventType === 'delete') {
            const $delete = qs('.delete', target);
            $on($delete, 'click', function() {
                handler($delete.dataset.id);
            }, true);
        }

        if (eventType === 'tick') {
            $on(self.$ul, 'click', function() {
                const element = event.target.parentElement;
                const id = element.dataset.id;
                handler(id, event);
            });
        }
    };

    View.prototype.addItem = function(todo, callback) {
        const ul = qs('ul');
        const item = document.createElement('li');
        item.dataset['id'] = todo.id;

        let template = `<label>{{description}}</label><button data-id="{{id}}" class="delete"></button>`;
        template = template.replace('{{description}}', todo.description);
        template = template.replace('{{id}}', todo.id);
        item.innerHTML = template;

        ul.appendChild(item);

        callback.call(null, item);
    };

    View.prototype.completed = function(todo) {
        const $li = qs(`[data-id="${todo.id}"]`);
        if (todo.completed) {
            $li.style.textDecoration = 'line-through';
            $li.style.color = "#ff0000";
        } else {
            $li.style.textDecoration = 'none';        
            $li.style.color = "#2f4f4f";
        }
    };

    View.prototype.clearAll = function() {
        qs('ul').innerHTML = '';
    };

    View.prototype.remove = function(id) {
        qs(`[data-id="${id}"]`).remove();
    };

    window.app = window.app || {};
    window.app.View = View;

})(window);