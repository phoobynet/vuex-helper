import buildTypes from './buildTypes'
import buildMutations from './buildMutations'
import buildMutationSettersMap from './buildMutationSettersMap'
import buildStateResetter from './buildStateResetter'
import buildMixin from './buildMixin'

import isString from 'lodash/isString'
import isObjectLike from 'lodash/isObjectLike'

const moduleNames = []

export default function buildModule (moduleName, state) {
  if (!isString(moduleName)) {
    throw TypeError('moduleName must be a string')
  }

  if (moduleNames.includes(moduleName)) {
    throw Error(`Module called ${moduleName} already exists in this application`)
  }

  if (!isObjectLike(state)) {
    throw TypeError('buildModule state argument invalid')
  }

  moduleNames.push(moduleName)
  const stateKeys = Object.keys(state)
  const defaultState = { ...state }
  const namespaced = true
  const types = buildTypes(stateKeys)
  const mutations = buildMutations({ stateKeys, defaultState })
  const mutationSettersMap = buildMutationSettersMap(stateKeys)
  const resetState = buildStateResetter({ stateKeys, defaultState })
  const mixin = buildMixin({ stateKeys, moduleName, mutationSettersMap })

  return {
    state,
    moduleName,
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
