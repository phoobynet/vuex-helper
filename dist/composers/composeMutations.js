"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = composeMutations;

var _isObjectLike = _interopRequireDefault(require("lodash/isObjectLike"));

var _vuex = require("vuex");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function composeMutations(customMutations) {
  if (!(0, _isObjectLike.default)(customMutations)) {
    throw TypeError('customMutations arg must be an object');
  }

  return function (moduleObject) {
    return _objectSpread({}, moduleObject, {
      mutations: _objectSpread({}, moduleObject.mutations, customMutations),
      mixin: _objectSpread({}, moduleObject.mixin, {
        methods: _objectSpread({}, moduleObject.mixin.methods, (0, _vuex.mapMutations)(moduleObject.namespace, Object.keys(customMutations)))
      })
    });
  };
}