import axios from 'axios'

async function getCustomers () {
  const response = await axios.get('/api/customers')

  return response.data
}

export default {
  getCustomers
}