import isObjectLike from 'lodash/isObjectLike'

/**
 * @function StateResetter
 * @param {Function} commit - Vuex commit function
 * @param {Option} options - Vuex commit options
 */

/**
 * Higher order function can be used to reset a state back to it's default state.
 * @param {Array} stateKeys - State object keys
 * @param {Object} defaultState - The default or initial state of the module
 * @returns {StateResetter} - Calling this function
 */
export default function buildStateResetter ({ stateKeys, defaultState }) {
  if (!Array.isArray(stateKeys)) {
    throw Error(`Expected stateKeys argument to be an array of strings`)
  }

  if (!isObjectLike(defaultState)) {
    throw Error(`Expected defaultState argument to be a object`)
  }

  return function (commit, options = {}) {
    for (const stateKey of stateKeys.map(x => x + '')) {
      commit(stateKey, defaultState[stateKey], options)
    }
  }
}
