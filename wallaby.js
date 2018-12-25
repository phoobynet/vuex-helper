module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.js'
    ],

    tests: [
      'test/**/*.test.js'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest',

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babelrc: true
      })
    },

    setup (wallaby) {
      const jestConfig = require('./package.json').jest

      wallaby.testFramework.configure(jestConfig)
    }
  }
}
