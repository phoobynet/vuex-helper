"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildStateResetter;

var _isObjectLike = _interopRequireDefault(require("lodash/isObjectLike"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function StateResetter
 * @param {Function} commit - Vuex commit function
 * @param {Option} options - Vuex commit options
 */

/**
 * Higher order function can be used to reset a state back to it's default state.
 * @param {Array} stateKeys - State object keys
 * @param {Object} defaultState - The default or initial state of the module
 * @returns {StateResetter} - Calling this function
 */
function buildStateResetter(_ref) {
  var stateKeys = _ref.stateKeys,
      defaultState = _ref.defaultState;

  if (!Array.isArray(stateKeys)) {
    throw Error("Expected stateKeys argument to be an array of strings");
  }

  if (!(0, _isObjectLike.default)(defaultState)) {
    throw Error("Expected defaultState argument to be a object");
  }

  return function (commit) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = stateKeys.map(function (x) {
        return x + '';
      })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var stateKey = _step.value;
        commit(stateKey, defaultState[stateKey], options);
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
  };
}