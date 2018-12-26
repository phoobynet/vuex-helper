<template>
  <div class="mt-2">
    <template v-if="fetching">
      <div class="row">
        <div class="col">
          <div class="text-center mt-5">
            <i class="fa fa-spinner fa-spin fa-3x"></i>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="hasCustomers">
      <div class="row">
        <div class="col">
          <header>
            <h1>Customers</h1>
          </header>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <customer-list
            @removeCustomer="onRemoveCustomer"
            :customers="customers"
          />
        </div>
      </div>
    </template>
    <template v-else-if="hasError">
      <pre>{{ JSON.stringify(error, null, 2) }}</pre>
      <button
        class="btn btn-warning btn-sm"
        @click="clearLastError"
      >Clear last error
      </button>
    </template>
    <template v-else-if="!hasCustomers">
      <div class="text-center">
        <p class="text-muted">
          No customers here.
        </p>
        <button
          class="btn btn-primary btn-sm text-justify"
          @click="refreshCustomers"
        >Refresh customers
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import CustomerList from './components/CustomerList'
import customersModule from './customersModule'

export default {
  name: 'Customers',
  components: {
    CustomerList
  },
  mixins: [ customersModule.mixin ],
  mounted () {
    this.getCustomers()
  },
  beforeDestroy () {
    this.cleanUp()
  },
  methods: {
    refreshCustomers () {
      this.getCustomers()
    },
    onRemoveCustomer (id) {
      // custom mutation
      this.removeCustomer(id)
    }
  }
}
</script>