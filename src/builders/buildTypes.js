/**
 * Creates an object where each key represents a type of state change.
 * @param {Array} stateKeys - State keys obtained from the original state
 * @returns {Object} - types object
 */
export default function buildTypes (stateKeys) {
  const types = {}

  for (const stateKey of stateKeys) {
    types[stateKey] = stateKey
  }

  return new Proxy(types, {
    get (typeObject, prop) {
      if (prop in typeObject) {
        return typeObject[prop]
      } else {
        throw Error(
          `Unrecognised commit type '${ prop }'. Check the type being committed is one of the following [${ JSON.stringify(stateKeys, null, 2) }]`)
      }
    }
  })
}
