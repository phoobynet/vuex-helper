# WORK IN PROGRESS - DANGER HERE!

I don't recommend using this at the moment.  It needs some tests, documentation, examples and possibly even some type definition files.

# Vuex Helper

Creates namespaced Vuex modules based on a given state object.

### Installation

#### NPM

```
npm i --save @phoobynet/vuex-helper
```

#### Yarn

```
yarn add @phoobynet/vuex-helper
```

## Motivation

I built this as a time saver.  I was writing a Vue.js application for a large legacy CRM and Life & Pensions system and was getting a lot of change requests that had become a chore.  I wanted a simple way of adding data to state within a module, and not have to worry about add new types, mutations and mappings to components.

## Conventions (that I use)

* Vuex modules are always namespaced.
* Vuex module file names end with `Module.js`, but module names don't, e.g. 'fooModule.js' is registered with the store as 'foo'
* Vuex modules are kept smallish.
* Each value of `state` has a matching `type`
* Each `type` has a matching mutation function that has the same name as the `type` and therefore the `state` property.

### Example

The following is a very simple module with no actions or getters.

#### fooModule.js
```javascript
import { buildModule } from '@phooby/vuex-helper'

const state = {
  fetching: false,
  items: []
}

// create the module based on the above state
const fooModule = buildModule('foo', state)

export default fooModule
```

#### store.js
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
import foo from '@/components/foo/fooModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,
  modules: {
    foo
  }
})

export default store

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
* `resetState` - function that takes the `context.commit` action vuex function to reset the module `state` back to `defaultState`.
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

### Composing `actions`, `getters` and custom `mutations`

Our `fooModule` in the previous example is pretty dumb.  Let's add the following:

* An action to retrieve the `items`
* A getter that can tell us the number of `items` currently in state
* A custom or override mutation - remember, vuex-helper will create default mutation functions for each `state` property, but they can be overridden.  **NOTE: the `mutationSettersMap` is not updated.**

```javascript
import { 
  buildModule, 
  composeActions, 
  composeMutations, 
  composeGetters 
} from '@phooby/vuex-helper'
import axios from 'axios'

const state = {
  fetching: false,
  items: []
}

// create the module based on the above state
const { types, resetState, ...fooModule } = buildModule('foo', state)

const getters = {
  itemCount (state) {
    return state.items.length
  } 
}

const actions = {
   async cleanUp({ commit }) {
     resetState(commit)
   },
   
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
  composeMutations(customMutations))(fooModule)
```
To pull actions, getters and custom mutations into our `fooModule`, we compose them.

* `composeActions` adds the `actions` object to the module, along with a `actionsKeys` array.  The default `mixin.methods` is updated using `mapActions`.
* `composeGetters` adds the `getters` object to the module, along with a `gettersKeys` array.  The default `mixin.computed` is updated using `mapGetters`
* `composeMutation` overwrites default mutations or adds additional mutations to the module. The default `mixin.methods` is updated using `mapMutations`
* `compose` accepts `n` compose functions, returning a function that is executed with the result of `buildModule` (`fooModule` in this example)



### Preventing name collisions

Calling mutation functions the same name as a state property would cause problems when mapping values and methods onto a component.  Instead, when not using the generated `<module>.mixin`, do the following:

```javascript
import fooModule from './fooModule'
import { createNamespacedHelpers } from 'vuex'

const { mapMutations, mapState } = createNamespacedHelpers(fooModule.moduleName)

export default {
  name: 'Items',
  computed: {
    ...mapState(fooModule.stateKeys)
  },
  methods: {
    ...mapMutations(fooModule.mutationSettersMap),
    
    doSomething () {
      // maps to the mutation 'fetching'
      this.setFetching(true)
    }
  }
}
```

### Using `<module>.mixin`

Dead simple, just import the module, and use the `mixin` property.

```vue
<template>
  <div>
    <template v-if="fetching">
      <p>Please wait...</p>
    </template>
    <template v-else-if="itemCount === 0">
      <p>No items found</p>
    </template>
    <template v-else>
      <ul>
        <li v-for="item in items">
          {{ item.name }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import fooModule from './fooModule'

export default {
  name: 'Items',
  mixins: [fooModule.mixin],
  mounted () {
    this.getItems()
  },
  beforeDestroy () {
    this.cleanUp()
  }
}
</script>
```


