import buildTypes from './buildTypes'
import buildMutations from './buildMutations'
import buildMutationSettersMap from './buildMutationSettersMap'
import buildStateResetter from './buildStateResetter'
import buildMixin from './buildMixin'
import builtModules from './builtModules'

import isString from 'lodash/isString'
import isObjectLike from 'lodash/isObjectLike'

export default function buildModule (namespace, state) {
  if (!isString(namespace)) {
    throw TypeError('namespace must be a string')
  }

  if (namespace.trim().length === 0) {
    throw TypeError('namespace cannot be an empty string')
  }

  if (builtModules.has(namespace)) {
    throw Error(`Module called ${ namespace } already exists in this application`)
  }

  if (!isObjectLike(state)) {
    throw TypeError('state argument invalid')
  }

  builtModules.add(namespace)

  const stateKeys = Object.keys(state)
  const defaultState = { ...state }
  const namespaced = true
  const types = buildTypes(stateKeys)
  const mutations = buildMutations({ stateKeys, defaultState })
  const mutationSettersMap = buildMutationSettersMap(stateKeys)
  const resetState = buildStateResetter({ stateKeys, defaultState })
  const mixin = buildMixin({ stateKeys, namespace, mutationSettersMap })

  return {
    state,
    namespace,
    namespaced,
    stateKeys,
    defaultState,
    types,
    mutations,
    mutationSettersMap,
    resetState,
    mixin
  }
}
