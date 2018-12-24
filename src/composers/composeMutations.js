import isObjectLike from 'lodash/isObjectLike'
import { mapMutations } from 'vuex'

export default function composeMutations (customMutations) {
  if (!isObjectLike(customMutations)) {
    throw TypeError('customMutations arg must be an object')
  }

  return function (moduleObject) {
    return {
      ...moduleObject,
      mutations: {
        ...moduleObject.mutations,
        ...customMutations
      },
      mixin: {
        ...moduleObject.mixin,
        methods: {
          ...moduleObject.mixin.methods,
          ...mapMutations(moduleObject.moduleName, Object.keys(customMutations))
        }
      }
    }
  }
}
