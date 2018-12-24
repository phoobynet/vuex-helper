import flowRight from 'lodash/flowRight'

/**
 * Compose a module with actions, getters and additional or custom mutations.
 * @example return compose(composeActions(myActions), composeGetters(myGetters), composeMutations(myCustomMutations)(customModule)
 * @param fns
 * @returns {function(*=)}
 */
export default function compose (...fns) {
  return function (moduleObject) {
    return flowRight(...fns)(moduleObject)
  }
}
