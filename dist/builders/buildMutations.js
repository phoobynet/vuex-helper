"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMutations;

var _isObjectLike = _interopRequireDefault(require("lodash/isObjectLike"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/**
 * @typedef {Object} MutationsArg
 * @property {Array} stateKeys - Array of keys obtained from the original state
 * @property {Object} defaultState - The vuex modules default state
 */

/**
 * Creates default mutation functions based on the state.
 * When a mutator encounters an object, it is copied and assigned
 * When a mutator encounters an array, it is copied and assigned
 * When a mutator encounters a scalar value it is assigned
 * @param stateKeys
 * @param defaultState
 * @returns {Object} - Mutations object
 */
function buildMutations(_ref) {
  var stateKeys = _ref.stateKeys,
      defaultState = _ref.defaultState;
  var mutations = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = stateKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var stateKey = _step.value;
      mutations[stateKey] = makeMutator(stateKey, defaultState[stateKey]);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return mutations;

  function makeMutator(stateKey, defaultStateForKey) {
    return function (state) {
      var newValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultStateForKey;
      var v = newValue;

      if (Array.isArray(newValue)) {
        v = _toConsumableArray(newValue);
      } else if ((0, _isObjectLike.default)(newValue)) {
        v = _objectSpread({}, newValue);
      }

      state[stateKey] = v;
    };
  }
}