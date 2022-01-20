const { resolve, join } = require('path')
const { readdirSync } = require('fs')

export default function(moduleOptions) {
  // assemble options passed in from nuxt.config.js in the project using the
  // nuxt-forecast-vis module
  const options = {
    ...moduleOptions,
    ...this.options.forecastViz
  }

  if (!options.disclaimer) options.disclaimer = ''
  const { disclaimer } = options
  // add plugins for the forecastViz vue component, vuex store, and
  // plugin providing functions to access the store
  //  - src is the current location of the file relative to module.js
  //  - fileName is the path to the file that will be built by nuxt,
  // in the nuxt build folder (I think)
  //  - options are the above module options, pulled in from nuxt.config.js
  this.addPlugin({
    src: resolve(__dirname, 'components/index.js'),
    fileName: 'forecastViz/components/index.js'
  })
  this.addPlugin({
    src: resolve(__dirname, 'store/index.js'),
    fileName: 'forecastViz/store/index.js',
    options: options
  })
  this.addPlugin({
    src: resolve(__dirname, 'plugins/index.js'),
    fileName: 'forecastViz/plugins/index.js'
  })

  // sync all relevant files and folders to the nuxt build dir (.nuxt/)
  const foldersToSync = ['plugins/helpers', 'store/modules', 'components/lib']
  for (const pathString of foldersToSync) {
    const path = resolve(__dirname, pathString)
    for (const file of readdirSync(path)) {
      this.addTemplate({
        src: resolve(path, file),
        fileName: join('forecastViz', pathString, file),
        options
      })
    }
  }
}

module.exports.meta = require('./package.json')
