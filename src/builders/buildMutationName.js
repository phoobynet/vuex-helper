import isString from 'lodash/isString'

/**
 * Creates a string based on a given state key, e.g. given a state key of 'fetching', this function would return a value 'setFetching'
 * @param stateKey
 * @returns {string}
 */
export default function buildMutationName (stateKey) {
  if (!isString(stateKey)) {
    throw Error('stateKey argument must be a string')
  }

  const cleanStateKey = stateKey.trim()

  if (cleanStateKey.length === 0) {
    throw Error('stateKey argument was an empty string')
  }

  return `set${cleanStateKey.charAt(0).toUpperCase()}${cleanStateKey.substring(1)}`
}
