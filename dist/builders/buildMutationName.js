"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMutationName;

var _isString = _interopRequireDefault(require("lodash/isString"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a string based on a given state key, e.g. given a state key of 'fetching', this function would return a value 'setFetching'
 * @param stateKey
 * @returns {string}
 */
function buildMutationName(stateKey) {
  if (!(0, _isString.default)(stateKey)) {
    throw Error('stateKey argument must be a string');
  }

  var cleanStateKey = stateKey.trim();

  if (cleanStateKey.length === 0) {
    throw Error('stateKey argument was an empty string');
  }

  return "set".concat(cleanStateKey.charAt(0).toUpperCase()).concat(cleanStateKey.substring(1));
}