'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _hlp = require('hlp');

var _hlp2 = _interopRequireDefault(_hlp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Class1 = function () {
    function Class1() {
        (0, _classCallCheck3.default)(this, Class1);

        this.var1 = 'variable1';
        this.var2 = 'variable2';
    }

    (0, _createClass3.default)(Class1, [{
        key: 'init',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.loadScripts();

                            case 2:
                                this.addEnvironment();

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function init() {
                return _ref.apply(this, arguments);
            }

            return init;
        }()
    }, {
        key: 'loadScripts',
        value: function loadScripts() {
            var tplurl = _hlp2.default.url(); // if wordpress, this is set in header
            // some libs need to be loaded dynamically and not concatenated via gulp
            // return hlp.loadJs([
            //     tplurl+'/_plugins/library2/script.min.js'
            // ]);
        }
    }, {
        key: 'addEnvironment',
        value: function addEnvironment() {
            document.documentElement.classList.add(_hlp2.default.getOs());
            document.documentElement.classList.add(_hlp2.default.getDevice());
            document.documentElement.classList.add(_hlp2.default.getBrowser());
        }
    }]);
    return Class1;
}();

exports.default = Class1;