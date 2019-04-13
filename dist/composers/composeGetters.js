"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = composeGetters;

var _isObjectLike = _interopRequireDefault(require("lodash/isObjectLike"));

var _vuex = require("vuex");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function composeGetters(getters) {
  if (!(0, _isObjectLike.default)(getters)) {
    throw Error('composeGetters getters invalid');
  }

  return function (moduleObject) {
    var gettersKeys = Object.keys(getters);
    return _objectSpread({}, moduleObject, {
      getters: getters,
      gettersKeys: gettersKeys,
      mixin: _objectSpread({}, moduleObject.mixin, {
        computed: _objectSpread({}, moduleObject.mixin.computed, (0, _vuex.mapGetters)(moduleObject.namespace, gettersKeys))
      })
    });
  };
}