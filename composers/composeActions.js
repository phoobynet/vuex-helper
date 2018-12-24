import isObjectLike from 'lodash/isObjectLike'
import { mapActions } from 'vuex'

/**
 * Higher order function that composes actions and the module, returning a module with an actions property.
 * @param actions
 * @returns {function(*): {[p: string]: *}}
 */
export default function composeActions (actions) {
  if (!isObjectLike(actions)) {
    throw Error('composeActions actions invalid')
  }

  return function (moduleObject) {
    const actionsKeys = Object.keys(actions)

    return {
      ...moduleObject,
      actions,
      actionsKeys,
      mixin: {
        ...moduleObject.mixin,
        methods: {
          ...moduleObject.mixin.methods,
          ...mapActions(moduleObject.moduleName, actionsKeys)
        }
      }
    }
  }
}
