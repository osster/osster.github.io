'use strict';

var _hlp = require('hlp');

var _hlp2 = _interopRequireDefault(_hlp);

var _page = require('./_page');

var _page2 = _interopRequireDefault(_page);

require('babel-polyfill');

require('../node_modules/popper.js/dist/umd/popper.js');

require('../node_modules/bootstrap/dist/js/bootstrap.js');

var _vue = require('vue/dist/vue.js');

var _vue2 = _interopRequireDefault(_vue);

var _store = require('../_vue/store/store.js');

var _store2 = _interopRequireDefault(_store);

var _App = require('../_vue/App.vue');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// use Array.includes etc. in IE11
document.addEventListener('DOMContentLoaded', function () {
    var page = new _page2.default();
    page.init();
    window.page = page;
});

window.addEventListener('load', function (e) {
    // console.log(hlp.getOs());
    // console.log(hlp.getDevice());
    // console.log(hlp.getBrowser());
}, false);
/* alert: when using the technique with loadCSS, use this instead */
_hlp2.default.waitUntil('.footer', 'position', 'relative').then(function () {});

/* Vue.js */
//import Vue from 'vue'; // import runtime only
// import runtime+template compiler

var vm = new _vue2.default({
    el: '#calc-app',
    store: _store2.default,
    template: '<App/>',
    components: { App: _App2.default }
});