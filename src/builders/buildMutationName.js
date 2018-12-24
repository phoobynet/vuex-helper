/**
 * Creates a string based on a given state key, e.g. given a state key of 'fetching', this function would return a value 'setFetching'
 * @param stateKey
 * @returns {string}
 */
export default function buildMutationName (stateKey) {
  return `set${stateKey.charAt(0).toUpperCase()}${stateKey.substring(1)}`
}
