const builtModules = new Set()
const builtModulesNormalized = new Set()

function normalize (namespace) {
  return namespace.trim().toLowerCase()
}

function has (namespace) {
  return builtModules.has(namespace)
}

function add (namespace) {
  const normalizedNamespace = normalize(namespace)

  if (!builtModules.has(namespace) && builtModulesNormalized.has(normalizedNamespace)) {
    throw Error(`Case-insensitive namespace error. ${ namespace } has already been added, but with a different case`)
  }

  builtModules.add(namespace)

  builtModulesNormalized.add(normalize(namespace))
}

function remove (namespace) {
  builtModules.delete(namespace)
  builtModulesNormalized.delete(normalize(namespace))
}

function clear () {
  builtModules.clear()
  builtModulesNormalized.clear()
}

function count () {
  return builtModules.size
}

export default {
  has,
  add,
  remove,
  clear,
  count
}
