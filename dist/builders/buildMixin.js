"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMixin;

var _vuex = require("vuex");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @typedef {Object} BuildMixinArgs
 * @property {String} namespace - the namespace name as defined on store creation
 * @property {Array} stateKeys - array of state keys derived from the initial state object
 * @property {Object} mutationSettersMap - object that provides mapping from mutation function names that cannot be mixed in due to collisions to no colliding names, e.g. 'setFetching' maps to 'fetching'
 */

/**
 * @typedef {Object} Mixin
 * @property {Object} computed - Vue computed object
 * @property {Object} methods - Vue methods object
 */

/**
 * Builds a mixin that can be included using the mixins property of a component
 * @param {BuildMixinArgs}
 * @returns {Mixin}
 */
function buildMixin(_ref) {
  var namespace = _ref.namespace,
      stateKeys = _ref.stateKeys,
      mutationSettersMap = _ref.mutationSettersMap;
  return {
    computed: _objectSpread({}, (0, _vuex.mapState)(namespace, stateKeys)),
    methods: _objectSpread({}, (0, _vuex.mapMutations)(namespace, mutationSettersMap))
  };
}