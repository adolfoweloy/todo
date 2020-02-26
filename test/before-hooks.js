const jsdom = require('mocha-jsdom');

jsdom({
    url: 'http://dev.com'
})

before(function() {
    require('../store.js');
    require('../model.js');
})
