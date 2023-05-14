const { create } = require('mochawesome-merge')
const { removeSync } = require('fs-extra')
const { reporter } = require('cypress-multi-reporters')
const { addContext } = require('mochawesome/addContext')

module.exports = (on, config) => {
  on('after:run', async (results) => {
    const merged = await create()
    removeSync('./mochawesome-report')
    results.mergedResults = merged
  })

  on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
      const screenshot = `${Cypress.config('screenshotsFolder')}/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`
      if (Cypress.env('GENERATE_REPORT')) {
        addContext({ test }, screenshot)
      }
    }
  })

  return reporter(config, {
    reportName: 'mochawesome',
    reportDir: 'mochawesome-report',
    overwrite: false,
    htmlReporter: {
      namedFiles: true,
      pageTitle: 'Mochawesome Report',
      reportName: 'Mochawesome Report',
    },
  })
}
