(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("source-map-support/register");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("ramda");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

var ResponseBuilder = __webpack_require__(9);
var buildIAMPolicy = __webpack_require__(12);
var Ramda = __webpack_require__(13);
var dynamodb = __webpack_require__(18);
var slackClient = __webpack_require__(20);

module.exports = {
  ResponseBuilder: ResponseBuilder,
  buildIAMPolicy: buildIAMPolicy,
  Ramda: Ramda,
  dynamodb: dynamodb,
  slackClient: slackClient
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("@slack/client");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends2 = __webpack_require__(10);

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = __webpack_require__(11);

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = __webpack_require__(7);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

__webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResponseBuilder = function () {
  function ResponseBuilder(callback) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var status = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
    (0, _classCallCheck3.default)(this, ResponseBuilder);

    this.callback = callback;
    this.status = status;
    this.params = params;
    this.message = 'Ok';
  }

  (0, _createClass3.default)(ResponseBuilder, [{
    key: 'addParams',
    value: function addParams(params) {
      (0, _assign2.default)(this.params, params);
    }
  }, {
    key: 'removeParam',
    value: function removeParam(key) {
      if (this.params[key]) {
        delete this.params[key];
      }
    }
  }, {
    key: 'setMessage',
    value: function setMessage(message) {
      this.message = message;
    }
  }, {
    key: 'setStatus',
    value: function setStatus(status) {
      this.status = status;
    }
  }, {
    key: 'buildResponse',
    value: function buildResponse() {
      return {
        statusCode: this.status,
        body: (0, _stringify2.default)((0, _extends3.default)({
          message: this.message
        }, this.params))
      };
    }
  }, {
    key: 'exec',
    value: function exec() {
      if (this.status === 200) {
        var response = this.buildResponse();
        return this.callback(null, response);
      }

      return this.callback(this.message !== 'Ok' ? this.message : 'Internal error');
    }
  }]);
  return ResponseBuilder;
}();

module.exports = ResponseBuilder;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/extends");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

module.exports = function (id, effect, resource, context) {
  return {
    principalId: id,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [{
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resource
      }]
    },
    context: context
  };
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

var splitCommas = __webpack_require__(14);
var joinCommas = __webpack_require__(15);
var transformChannels = __webpack_require__(16);

module.exports = {
  splitCommas: splitCommas,
  joinCommas: joinCommas,
  transformChannels: transformChannels
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

var R = __webpack_require__(1);

module.exports = R.split(',');

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

var R = __webpack_require__(1);

module.exports = R.join(',');

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _defineProperty2 = __webpack_require__(17);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = __webpack_require__(7);

var _assign2 = _interopRequireDefault(_assign);

__webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var R = __webpack_require__(1);

var buildChannels = R.reduce(function (acc, channel) {
  var id = channel.id,
      name = channel.name;

  return (0, _assign2.default)(acc, (0, _defineProperty3.default)({}, id, name));
}, {});

module.exports = buildChannels;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/defineProperty");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

/* eslint-disable import/no-extraneous-dependencies */
var AWS = __webpack_require__(19);

var options = {};

var isOffline = function isOffline() {
  return "production" === 'development';
};

if (isOffline()) {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  };
}

console.log({ options: options });
var client = new AWS.DynamoDB.DocumentClient(options);

module.exports = client;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("aws-sdk");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

var _require = __webpack_require__(8),
    WebClient = _require.WebClient;

module.exports = function (token) {
  if (token) {
    return new WebClient(token);
  }

  return new WebClient();
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

var SlackDAO = __webpack_require__(22);
var HistoryDAO = __webpack_require__(23);

module.exports = {
  SlackDAO: SlackDAO,
  HistoryDAO: HistoryDAO
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

__webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(8),
    WebClient = _require.WebClient;

var _require2 = __webpack_require__(4),
    Ramda = _require2.Ramda,
    slackClient = _require2.slackClient;

var splitCommas = Ramda.splitCommas,
    joinCommas = Ramda.joinCommas,
    transformChannels = Ramda.transformChannels;
var _process$env = process.env,
    CLIENT_ID = _process$env.CLIENT_ID,
    CLIENT_SECRET = _process$env.CLIENT_SECRET;

var SlackDAO = function () {
  function SlackDAO(token) {
    (0, _classCallCheck3.default)(this, SlackDAO);

    this.client = slackClient(token);
  }

  (0, _createClass3.default)(SlackDAO, [{
    key: 'isAuthorized',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var _ref2, ok;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.client.web.auth.test();

              case 3:
                _ref2 = _context.sent;
                ok = _ref2.ok;
                return _context.abrupt('return', ok);

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', false);

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      function isAuthorized() {
        return _ref.apply(this, arguments);
      }

      return isAuthorized;
    }()
  }, {
    key: 'authorize',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(code) {
        var params, data, slackToken, userId;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = {
                  client_id: CLIENT_ID,
                  client_secret: CLIENT_SECRET,
                  code: code
                };
                _context2.next = 3;
                return this.client.oauth.access(params);

              case 3:
                data = _context2.sent;
                slackToken = data.access_token;
                userId = data.user_id;
                return _context2.abrupt('return', { slackToken: slackToken, userId: userId });

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function authorize(_x) {
        return _ref3.apply(this, arguments);
      }

      return authorize;
    }()
  }, {
    key: 'getAllChannels',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;

        var _ref5, channels;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.client.conversations.list({
                  limit: limit,
                  types: 'public_channel,private_channel'
                });

              case 2:
                _ref5 = _context3.sent;
                channels = _ref5.channels;
                return _context3.abrupt('return', transformChannels(channels));

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAllChannels() {
        return _ref4.apply(this, arguments);
      }

      return getAllChannels;
    }()
  }, {
    key: 'getMutedChannels',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var _ref7, prefs, muted;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.client.users.prefs.get();

              case 2:
                _ref7 = _context4.sent;
                prefs = _ref7.prefs;
                muted = splitCommas(prefs.muted_channels);
                return _context4.abrupt('return', muted);

              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getMutedChannels() {
        return _ref6.apply(this, arguments);
      }

      return getMutedChannels;
    }()
  }, {
    key: 'setMutedChannels',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(idsList) {
        var prefs, response;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                prefs = { muted_channels: joinCommas(idsList) };
                _context5.next = 3;
                return this.client.users.prefs.set({ prefs: prefs });

              case 3:
                response = _context5.sent;
                return _context5.abrupt('return', response.prefs.muted_channels);

              case 5:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function setMutedChannels(_x3) {
        return _ref8.apply(this, arguments);
      }

      return setMutedChannels;
    }()
  }]);
  return SlackDAO;
}();

module.exports = SlackDAO;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(5);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(6);

var _createClass3 = _interopRequireDefault(_createClass2);

__webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(4),
    dynamodb = _require.dynamodb;

var HistoryDAO = function () {
  function HistoryDAO(uid) {
    (0, _classCallCheck3.default)(this, HistoryDAO);

    this.uid = uid;
  }

  (0, _createClass3.default)(HistoryDAO, [{
    key: 'appendUserHistory',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(muted) {
        var ts, value, params, _ref2, Attributes;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                ts = Date.now();
                value = { muted: muted, ts: ts };
                params = {
                  TableName: process.env.DYNAMODB_TABLE,
                  Key: {
                    uid: this.uid
                  },
                  ReturnValues: 'ALL_NEW',
                  UpdateExpression: 'set #history = list_append(if_not_exists(#history, :empty_list), :muted)',
                  ExpressionAttributeNames: {
                    '#history': 'history'
                  },
                  ExpressionAttributeValues: {
                    ':muted': [value],
                    ':empty_list': []
                  }
                };
                _context.next = 5;
                return dynamodb.update(params).promise();

              case 5:
                _ref2 = _context.sent;
                Attributes = _ref2.Attributes;

                if (!(Attributes && Attributes.history)) {
                  _context.next = 9;
                  break;
                }

                return _context.abrupt('return', { updated: Attributes.history });

              case 9:
                return _context.abrupt('return', { message: 'Could not save in hisotry' });

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function appendUserHistory(_x) {
        return _ref.apply(this, arguments);
      }

      return appendUserHistory;
    }()
  }, {
    key: 'getHisotry',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var params, _ref4, Item, history;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = {
                  TableName: process.env.DYNAMODB_TABLE,
                  Key: {
                    uid: this.uid
                  }
                };
                _context2.next = 3;
                return dynamodb.get(params).promise();

              case 3:
                _ref4 = _context2.sent;
                Item = _ref4.Item;
                history = Item.history;
                return _context2.abrupt('return', history);

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getHisotry() {
        return _ref3.apply(this, arguments);
      }

      return getHisotry;
    }()
  }, {
    key: 'removeFromHistory',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(index) {
        var params, _ref6, Attributes;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = {
                  TableName: process.env.DYNAMODB_TABLE,
                  Key: {
                    uid: this.uid
                  },
                  UpdateExpression: 'REMOVE history[' + index + ']',
                  ReturnValues: 'UPDATED_OLD'
                };
                _context3.next = 3;
                return dynamodb.update(params).promise();

              case 3:
                _ref6 = _context3.sent;
                Attributes = _ref6.Attributes;

                if (!(Attributes && Attributes.history)) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt('return', { removed: Attributes.history[index], index: index });

              case 7:
                return _context3.abrupt('return', { removed: [] });

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function removeFromHistory(_x2) {
        return _ref5.apply(this, arguments);
      }

      return removeFromHistory;
    }()
  }, {
    key: 'createUserIfNotExists',
    value: function () {
      var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var TableName, response, created;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                TableName = process.env.DYNAMODB_TABLE;
                _context4.prev = 1;
                _context4.next = 4;
                return dynamodb.get({
                  TableName: TableName,
                  Key: {
                    uid: this.uid
                  }
                }).promise();

              case 4:
                response = _context4.sent;

                if (response.Item) {
                  _context4.next = 9;
                  break;
                }

                created = Date.now();
                _context4.next = 9;
                return dynamodb.put({
                  TableName: TableName,
                  Item: {
                    uid: this.uid,
                    created: created,
                    history: []
                  }
                }).promise();

              case 9:
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4['catch'](1);
                throw new Error('Database problem');

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 11]]);
      }));

      function createUserIfNotExists() {
        return _ref7.apply(this, arguments);
      }

      return createUserIfNotExists;
    }()
  }]);
  return HistoryDAO;
}();

module.exports = HistoryDAO;

/***/ }),
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _regenerator = __webpack_require__(2);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(3);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

__webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(21),
    HistoryDAO = _require.HistoryDAO;

var _require2 = __webpack_require__(4),
    ResponseBuilder = _require2.ResponseBuilder;

module.exports.get = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event, context, callback) {
    var userId, historyDao, responseBuilder, history;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = event.requestContext.authorizer.userId;
            historyDao = new HistoryDAO(userId);
            responseBuilder = new ResponseBuilder(callback);
            _context.prev = 3;
            _context.next = 6;
            return historyDao.getHisotry();

          case 6:
            history = _context.sent;


            responseBuilder.addParams({ history: history });
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](3);

            responseBuilder.setStatus(500);
            responseBuilder.setMessage('Could not get');

          case 14:

            responseBuilder.exec();

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 10]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.delete = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(event, context, callback) {
    var userId, _JSON$parse, deleteIndex, historyDao, responseBuilder, res;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = event.requestContext.authorizer.userId;
            _JSON$parse = JSON.parse(event.body), deleteIndex = _JSON$parse.deleteIndex;
            historyDao = new HistoryDAO(userId);
            responseBuilder = new ResponseBuilder(callback);
            _context2.prev = 4;
            _context2.next = 7;
            return historyDao.removeFromHistory(deleteIndex);

          case 7:
            res = _context2.sent;

            responseBuilder.addParams(res);
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](4);

            responseBuilder.setStatus(500);
            responseBuilder.setMessage('Could not get');

          case 15:

            responseBuilder.exec();

          case 16:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[4, 11]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ })
/******/ ])));
//# sourceMappingURL=slack.history.js.map