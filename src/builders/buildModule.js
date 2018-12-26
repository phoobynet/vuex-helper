import buildTypes from './buildTypes'
import buildMutations from './buildMutations'
import buildMutationSettersMap from './buildMutationSettersMap'
import buildStateResetter from './buildStateResetter'
import buildMixin from './buildMixin'

import isString from 'lodash/isString'
import isObjectLike from 'lodash/isObjectLike'

const namespaces = []

export default function buildModule (namespace, state) {
  if (!isString(namespace)) {
    throw TypeError('namespace must be a string')
  }

  if (namespaces.includes(namespace)) {
    throw Error(`Module called ${namespace} already exists in this application`)
  }

  if (!isObjectLike(state)) {
    throw TypeError('buildModule state argument invalid')
  }

  namespaces.push(namespace)
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
