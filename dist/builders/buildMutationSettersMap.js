"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMutationSettersMap;

var _buildMutationName = _interopRequireDefault(require("./buildMutationName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Mutation setters provide a mapping for use by the mapMutation functions to prevent name collections between state property names and mutation types.
 *
 * @example 'foo' becomes 'setFoo'
 * @param stateKeys
 * @returns {*}
 */
function buildMutationSettersMap(stateKeys) {
  var mutationSettersMap = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = stateKeys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var stateKey = _step.value;
      mutationSettersMap[(0, _buildMutationName.default)(stateKey)] = stateKey;
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

  return Object.freeze(mutationSettersMap);
}