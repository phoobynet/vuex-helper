"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var builtModules = new Set();
var builtModulesNormalized = new Set();

function normalize(namespace) {
  return namespace.trim().toLowerCase();
}

function has(namespace) {
  return builtModules.has(namespace);
}

function add(namespace) {
  var normalizedNamespace = normalize(namespace);

  if (!builtModules.has(namespace) && builtModulesNormalized.has(normalizedNamespace)) {
    throw Error("Case-insensitive namespace error. ".concat(namespace, " has already been added, but with a different case"));
  }

  builtModules.add(namespace);
  builtModulesNormalized.add(normalize(namespace));
}

function remove(namespace) {
  builtModules.delete(namespace);
  builtModulesNormalized.delete(normalize(namespace));
}

function clear() {
  builtModules.clear();
  builtModulesNormalized.clear();
}

function count() {
  return builtModules.size;
}

var _default = {
  has: has,
  add: add,
  remove: remove,
  clear: clear,
  count: count
};
exports.default = _default;