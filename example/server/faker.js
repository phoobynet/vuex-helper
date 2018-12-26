const faker = require('faker')

module.exports = () => {
  const data = {
    customers: []
  }

  // build customers
  for (let i = 0; i < 10; i++) {
    data.customers.push({
      id: i + 1,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      companyName: faker.company.companyName(),
      department: faker.commerce.department(),
      jobTitle: faker.name.jobTitle(),
      phone: faker.phone.phoneNumber(),
      email: faker.internet.email()
    })
  }

  return data
}
