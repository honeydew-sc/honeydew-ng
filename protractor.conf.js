exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['test/e2e/*_test.js'],
  baseUrl: 'http://localhost:9000'
}
