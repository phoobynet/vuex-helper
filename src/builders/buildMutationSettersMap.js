import buildMutationName from './buildMutationName'

/**
 * Mutation setters provide a mapping for use by the mapMutation functions to prevent name collections between state property names and mutation types.
 *
 * @example 'foo' becomes 'setFoo'
 * @param stateKeys
 * @returns {*}
 */
export default function buildMutationSettersMap (stateKeys) {
  const mutationSettersMap = {}

  for (const stateKey of stateKeys) {
    mutationSettersMap[buildMutationName(stateKey)] = stateKey
  }

  return Object.freeze(mutationSettersMap)
}
