// store/index.js
import forecastViz from './modules/forecastViz'

// create the plugin
export default ({ store }, inject) => {
  // get the options out using lodash templates
  const options = <%= serialize(options) %>

  // register the module using forecastViz as the name.
  // forecastViz module takes the options object and returns an object that is a
  // vuex store definition
  store.registerModule('forecastViz', forecastViz(options), {
    preserveState: Boolean(store.state['forecastViz']) // if the store module already exists, preserve it
  })
}
