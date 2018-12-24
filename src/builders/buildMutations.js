import isObjectLike from 'lodash/isObjectLike'
/**
 * @typedef {Object} MutationsArg
 * @property {Array} stateKeys - Array of keys obtained from the original state
 * @property {Object} defaultState - The vuex modules default state
 */

/**
 * Creates default mutation functions based on the state.
 * When a mutator encounters an object, it is copied and assigned
 * When a mutator encounters an array, it is copied and assigned
 * When a mutator encounters a scalar value it is assigned
 * @param stateKeys
 * @param defaultState
 * @returns {Object} - Mutations object
 */
export default function buildMutations ({ stateKeys, defaultState }) {
  const mutations = {}

  for (const stateKey of stateKeys) {
    mutations[stateKey] = makeMutator(stateKey, defaultState[stateKey])
  }

  return mutations

  function makeMutator (stateKey, defaultStateForKey) {
    return function (state, newValue = defaultStateForKey) {
      let v = newValue

      if (Array.isArray(newValue)) {
        v = [ ...newValue ]
      } else if (isObjectLike(newValue)) {
        v = { ...newValue }
      }

      state[stateKey] = v
    }
  }
}
