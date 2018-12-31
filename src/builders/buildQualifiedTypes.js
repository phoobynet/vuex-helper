/**
 * Creates an object where each key represents a type of state change.
 * @param {Array} stateKeys - State keys obtained from the original state
 * @param {String} namespace- Namespace/module name
 * @returns {Object} - types object
 */

export default function buildQualifiedTypes (stateKeys, namespace) {
  const qualifiedTypes = {}

  const qualifiedStateKeys = stateKeys.map(stateKey => `${ namespace }/${ stateKey }`)

  qualifiedStateKeys.forEach(q => {
    qualifiedTypes[q] = q
  })

  return new Proxy(qualifiedTypes, {
    get (typeObject, prop) {
      if (prop in typeObject) {
        return typeObject[prop]
      } else {
        throw Error(
          `Unrecognised commit type '${ prop }'. Check the type being committed is one of the following [${ JSON.stringify(qualifiedStateKeys, null, 2) }]`)
      }
    }
  })
}
