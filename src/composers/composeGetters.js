import isObjectLike from 'lodash/isObjectLike'
import { mapGetters } from 'vuex'

export default function composeGetters (getters) {
  if (!isObjectLike(getters)) {
    throw Error('composeGetters getters invalid')
  }

  return function (moduleObject) {
    const gettersKeys = Object.keys(getters)

    return {
      ...moduleObject,
      getters,
      gettersKeys,
      mixin: {
        ...moduleObject.mixin,
        computed: {
          ...moduleObject.mixin.computed,
          ...mapGetters(moduleObject.namespace, gettersKeys)
        }
      }
    }
  }
}
