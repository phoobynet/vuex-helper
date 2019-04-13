"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildModule;

var _buildTypes = _interopRequireDefault(require("./buildTypes"));

var _buildMutations = _interopRequireDefault(require("./buildMutations"));

var _buildMutationSettersMap = _interopRequireDefault(require("./buildMutationSettersMap"));

var _buildStateResetter = _interopRequireDefault(require("./buildStateResetter"));

var _buildMixin = _interopRequireDefault(require("./buildMixin"));

var _builtModules = _interopRequireDefault(require("./builtModules"));

var _isString = _interopRequireDefault(require("lodash/isString"));

var _isObjectLike = _interopRequireDefault(require("lodash/isObjectLike"));

var _buildQualifiedTypes = _interopRequireDefault(require("./buildQualifiedTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function buildModule(namespace, state) {
  if (!(0, _isString.default)(namespace)) {
    throw TypeError('namespace must be a string');
  }

  if (namespace.trim().length === 0) {
    throw TypeError('namespace cannot be an empty string');
  }

  if (_builtModules.default.has(namespace)) {
    throw Error("Module called ".concat(namespace, " already exists in this application"));
  }

  if (!(0, _isObjectLike.default)(state)) {
    throw TypeError('state argument invalid');
  }

  _builtModules.default.add(namespace);

  var stateKeys = Object.keys(state);

  var defaultState = _objectSpread({}, state);

  var namespaced = true;
  var types = (0, _buildTypes.default)(stateKeys);
  var qualifiedTypes = (0, _buildQualifiedTypes.default)(stateKeys, namespace);
  var mutations = (0, _buildMutations.default)({
    stateKeys: stateKeys,
    defaultState: defaultState
  });
  var mutationSettersMap = (0, _buildMutationSettersMap.default)(stateKeys);
  var resetState = (0, _buildStateResetter.default)({
    stateKeys: stateKeys,
    defaultState: defaultState
  });
  var mixin = (0, _buildMixin.default)({
    stateKeys: stateKeys,
    namespace: namespace,
    mutationSettersMap: mutationSettersMap
  });
  return {
    state: state,
    namespace: namespace,
    namespaced: namespaced,
    stateKeys: stateKeys,
    defaultState: defaultState,
    types: types,
    qualifiedTypes: qualifiedTypes,
    mutations: mutations,
    mutationSettersMap: mutationSettersMap,
    resetState: resetState,
    mixin: mixin
  };
}