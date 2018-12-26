import { mapState, mapMutations } from 'vuex'

/**
 * @typedef {Object} BuildMixinArgs
 * @property {String} namespace - the namespace name as defined on store creation
 * @property {Array} stateKeys - array of state keys derived from the initial state object
 * @property {Object} mutationSettersMap - object that provides mapping from mutation function names that cannot be mixed in due to collisions to no colliding names, e.g. 'setFetching' maps to 'fetching'
 */

/**
 * @typedef {Object} Mixin
 * @property {Object} computed - Vue computed object
 * @property {Object} methods - Vue methods object
 */

/**
 * Builds a mixin that can be included using the mixins property of a component
 * @param {BuildMixinArgs}
 * @returns {Mixin}
 */
export default function buildMixin ({ namespace, stateKeys, mutationSettersMap }) {
  return {
    computed: {
      ...mapState(namespace, stateKeys)
    },
    methods: {
      ...mapMutations(namespace, mutationSettersMap)
    }
  }
}
