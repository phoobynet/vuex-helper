<template>
  <table
    class="table"
  >
    <thead>
    <tr>
      <th>
        #
      </th>
      <th>
        First name
      </th>
      <th>
        Last name
      </th>
      <th>
        Company
      </th>
      <th>
        Department
      </th>
      <th>
        Job title
      </th>
      <th></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="customer in customers">
      <td>
        {{ customer.id }}
      </td>
      <td>
        {{ customer.firstName }}
      </td>
      <td>
        {{ customer.lastName }}
      </td>
      <td>
        {{ customer.companyName }}
      </td>
      <td>
        {{ customer.department }}
      </td>
      <td>
        {{ customer.jobTitle }}
      </td>
      <td>
        <button
          class="btn btn-danger btn-sm"
          @click="onRemoveCustomer(customer.id)"
        >Remove
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'CustomerList',
  props: {
    customers: {
      type: Array,
      required: true
    }
  },
  methods: {
    onRemoveCustomer (id) {
      this.$emit('removeCustomer', id)
    }
  }
}
</script>