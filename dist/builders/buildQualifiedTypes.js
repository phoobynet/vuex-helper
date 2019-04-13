"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildQualifiedTypes;

/**
 * Creates an object where each key represents a type of state change.
 * @param {Array} stateKeys - State keys obtained from the original state
 * @param {String} namespace- Namespace/module name
 * @returns {Object} - types object
 */
function buildQualifiedTypes(stateKeys, namespace) {
  var qualifiedTypes = {};
  var qualifiedStateKeys = stateKeys.map(function (stateKey) {
    return "".concat(namespace, "/").concat(stateKey);
  });
  qualifiedStateKeys.forEach(function (q) {
    qualifiedTypes[q] = q;
  });
  return new Proxy(qualifiedTypes, {
    get: function get(typeObject, prop) {
      if (prop in typeObject) {
        return typeObject[prop];
      } else {
        throw Error("Unrecognised commit type '".concat(prop, "'. Check the type being committed is one of the following [").concat(JSON.stringify(qualifiedStateKeys, null, 2), "]"));
      }
    }
  });
}