const builtModules = []

function isModuleDuplicated (namespace) {
  return builtModules.indexOf(namespace) >= 0
}

function addModule (namespace) {
  builtModules.push(namespace)
}

export default {
  isModuleDuplicated,
  addModule
}
