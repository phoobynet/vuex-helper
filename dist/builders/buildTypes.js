"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildTypes;

/**
 * Creates an object where each key represents a type of state change.
 * @param {Array} stateKeys - State keys obtained from the original state
 * @returns {Object} - types object
 */
function buildTypes(stateKeys) {
  var types = {};
  stateKeys.forEach(function (stateKey) {
    return types[stateKey] = stateKey;
  });
  return new Proxy(types, {
    get: function get(typeObject, prop) {
      if (prop in typeObject) {
        return typeObject[prop];
      } else {
        throw Error("Unrecognised commit type '".concat(prop, "'. Check the type being committed is one of the following [").concat(JSON.stringify(stateKeys, null, 2), "]"));
      }
    }
  });
}