(function (window) {
    'use strict'

    window.qs = function(selector, scope) {
        return (scope || document).querySelector(selector);
    };

    window.$on = function(target, event, callback) {
        target.addEventListener(event, callback);
    }
})(window);