"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = composeActions;

var _isObjectLike = _interopRequireDefault(require("lodash/isObjectLike"));

var _vuex = require("vuex");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Higher order function that composes actions and the module, returning a module with an actions property.
 * @param actions
 * @returns {function(*): {[p: string]: *}}
 */
function composeActions(actions) {
  if (!(0, _isObjectLike.default)(actions)) {
    throw Error('composeActions actions invalid');
  }

  return function (moduleObject) {
    var actionsKeys = Object.keys(actions);
    return _objectSpread({}, moduleObject, {
      actions: actions,
      actionsKeys: actionsKeys,
      mixin: _objectSpread({}, moduleObject.mixin, {
        methods: _objectSpread({}, moduleObject.mixin.methods, {}, (0, _vuex.mapActions)(moduleObject.namespace, actionsKeys))
      })
    });
  };
}