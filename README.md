# WORK IN PROGRESS - DANGER HERE!

I don't recommend using this at the moment.  It needs some tests, documentations, and possibly even some type definition files.

# Vuex Helper

Creates namespaced Vuex modules based on a given state object.

## Motivation

I built this as a time saver.  I was writing a Vue.js application for a large legacy CRM and Life & Pensions system.

Due to the large volume of complex data and continually changing requirements, I wanted a simple way of adding data to state within a module, and not have to worry about add new types, mutations and mappings to components.

## Conventions (that I use)

* Vuex modules are always namespaced.
* Each value of `state` has a matching `type`
* Each `type` has a matching mutation function that has the same name as the type and therefore the `state` property.

### Example

The following is a very simple module with no actions or getters.

```javascript
import { buildModule } from '@phooby/vuex-helper'

const state = {
  fetching: false,
  items: []
}

// create the module based on the above state
const fooModule = buildModule('fooModule', state)

export default fooModule
```

`buildModule` takes the module name, and the `state` and returns a `fooModule` with the following properties.

* `state` - the state passed into `buildModule`
* `moduleName` - the `moduleName` argument passed into `buildModule`
* `namespaced` - set to `true`.  See [Vuex Namespacing](https://vuex.vuejs.org/guide/modules.html#namespacing)
* `stateKeys` - array of keys obtained from the `state` objects.  Useful for creating mixins.
* `defaultState` - copy of `state` that can be used to set a state property back to the original value.
* `types` - object where each property and value matches a property of `state`.  Useful when using `commit`. An error is thrown if an attempt is made to access a property that does not exist.
* `mutations` - object where each function matches a property of `types` and therefore `state`.  When mapping mutations onto a component use the value of `mutationSettersMap`
* `mutationSettersMap` - object where each property is prefixed with `set*` but the value matches a property of `types` and therefore `state`, e.g. `setFetching` maps to the `fetching` mutation function.  Very useful for avoiding collisions when mapping modules onto components.
* `resetState` - function that takes the `context.commit` vuex function to reset the module `state` back to `defaultState`.
* `mixin` - object that can be mixed into components using `{ mixins: [] }` property.


```
{
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
```

### Preventing name collisions

Calling mutation functions the same name as a state property would cause problems when mapping values and methods onto a component.

###
* To avoid naming collisions using Vuex `mapState` and `mapMutations`, the a module object exports a `mutationSettersMap` object, where each property is prefix with `set`, e.g. `setFetching` is mapped to ``fetching` mutation.

It assumes you are developing using babel.

## Getting started

### Installation

#### NPM

```
npm i --save @phoobynet/vuex-helper
```

#### Yarn

```
yarn add @phoobynet/vuex-helper
```

## Usage


### Before Vuex Helper

```javascript
// my module
import axios from 'axios'

const state = {
  fetching: false,
  items: []
}

const types = {
  fetching: 'fetching',
  items: 'items'  
}

const mutations = {
  fetching (state, value = false) {
    state.fetching = value
  },
  items (state, value = []) {
    state.items = [ ...value ]
  },
  appendItem (state, newItem) {
  	state.items = [ ...state.items, newItem ]
  }
}

const getters = {
  itemCount (state) {
    return state.items.length
  } 
}

const actions = {
  async getItems ({ commit }) {
    commit(types.fetching, true)
    
    try {
      const response = await axios.get('http://items')
      
	  commit(types.items, response.data)
    }
    catch (err) {
      console.error(err)
    }
    finally {	
      commit(types.fetching, false)
    }
  }
}

export default {
  state,
  types,
  mutations,
  getters,
  actions,
  namespaced: true
}

```

### After Vuex Helper

```javascript
import axios from 'axios'
import { 
  buildModule, 
  compose, 
  composeActions, 
  composeGetters, 
  composeMutations
} from '@phoobynet/vuex-helper'


const state = {
  fetching: false,
  items: []
}

const { types, ...myModule } = buildModule('myModule', state)

const getters = {
  itemCount (state) {
    return state.items.length
  } 
}

const actions = {
  async getItems ({ commit }) {
    commit(types.fetching, true)
    
    try {
      const response = await axios.get('http://items')
      
	  commit(types.items, response.data)
    }
    catch (err) {
      console.error(err)
    }
    finally {	
      commit(types.fetching, false)
    }
  }
}

const customMutations = {
  appendItem (state, newItem) {
    state.items = [ ...items, newItem ]
  }
}

export default compose(
  composeActions(actions), 
  composeGetters(getters),
  composeMutations(customMutations))(myModule)
```




Don't use this yet.

Work in progress.

Tests not written.