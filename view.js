(function(window) {
    'use strict'

    function View() {
    }

    View.prototype.renderItem = function(todo) {
        let ul = qs('ul');
        let item = document.createElement('li');
        item.dataset['id'] = todo.id;
        item.innerHTML = `<label>${todo.description}</label><span class="delete">×</span>`;
        ul.appendChild(item);
    };

    window.app = window.app || {};
    window.app.View = View;

})(window);