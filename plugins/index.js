import forecastViz from "../store/modules/forecastViz"

class ForecastViz {
  // class providing functions to interact with the store
  constructor (store, state) {
    this.store = store
    this.state = state
  }

  // function to handle if no store, or no store module
  // with our namespace exists
  storeModuleExists () {
    if (!this.state || !this.state['forecastViz']) {
      console.error('forecastViz nuxt module error: store not initialized')
      return false
    } else {
      return true
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  // getters
  ///////////////////////////////////////////////////////////////////////////////

  // function to return the target_variables
  target_variables () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // return the value from the store
    return this.state['forecastViz'].target_variables
  }

  // function to return the locations
  locations () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // return the value from the store
    return this.state['forecastViz'].locations
  }

  // function to return the intervals
  intervals () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // return the value from the store
    return this.state['forecastViz'].intervals
  }

  // function to return the models
  models () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // return the value from the store
    return this.state['forecastViz'].models
  }

  // function to return the colours
  colours () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // return the value from the store
    return this.state['forecastViz'].colours
  }

  // function to return the data
  data () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // return the value from the store
    return this.state['forecastViz'].data
  }

  // function to return the current_models
  current_models () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // return the value from the store
    return this.state['forecastViz'].current_models
  }

  // function to return the forecasts
  forecasts () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // return the value from the store
    return this.state['forecastViz'].forecasts
  }

  // function to return the current_date
  current_date () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // return the value from the store
    return this.state['forecastViz'].current_date
  }

  // function to return the truth_as_of
  as_of_date () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // return the value from the store
    return this.state['forecastViz'].as_of_date
  }

  // function to return the all_models
  all_models () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // return the value from the store
    return this.state['forecastViz'].all_models
  }

  // function to return the plot_layout
  plot_layout () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // return the value from the store
    return this.store.getters['forecastViz/plot_layout']
  }

  // function to return the plot_data
  plot_data () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // return the value from the store
    return this.store.getters['forecastViz/plot_data']
  }


  ///////////////////////////////////////////////////////////////////////////////
  // mutations
  ///////////////////////////////////////////////////////////////////////////////

  // function to set the target_var
  set_target_var (new_target_var) {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/set_target_var', new_target_var)
  }

  // function to set the location
  set_location (new_location) {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/set_location', new_location)
  }

  // function to set the interval
  set_interval (new_interval) {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/set_interval', new_interval)
  }

  // function to increment the as_of
  increment_as_of () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/increment_as_of')
  }

  // function to decrement the as_of
  decrement_as_of () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/decrement_as_of')
  }

  // function to set the current_truth
  set_current_truth (new_truth) {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/set_current_truth', new_truth)
  }

  // function to set the as_of_truth
  set_as_of_truth (new_truth) {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/set_as_of_truth', new_truth)
  }

  // function to set the forecasts
  set_forecasts (new_forecasts) {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/set_forecasts', new_forecasts)
  }

  // function to remove a model from current_models
  remove_from_current_model (item) {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/remove_from_current_model', item)
  }

  // function to add a model to current_models
  add_to_current_model (val) {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/add_to_current_model', val)
  }

  // function to add a data item to data list
  add_to_data (val) {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/add_to_data', val)
  }

  // function to remove a data item from data list
  remove_from_data (item) {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/remove_from_data', item)
  }

  // function to shuffle colours assigned to models
  shuffle_colours () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/shuffle_colours')
  }

  // function to select all models
  select_all_models () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/select_all_models')
  }

  // function to unselect all models other than defaults
  unselect_all_models () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    return this.store.commit('forecastViz/unselect_all_models')
  }

  // function to fetch initial data
  async init () {
    // handle no store:
    if (!this.storeModuleExists()) return undefined
    // adjust the data value using a store mutation
    await this.store.dispatch('forecastViz/fetch_current_truth');
    await this.store.dispatch('forecastViz/fetch_as_of_truth');
    await this.store.dispatch('forecastViz/fetch_forecasts');
  }
}

// create the plugin
export default ({ store }, inject) => {
  // get options
  const options = JSON.parse(`<%= JSON.stringify(options) %>`)

  // get a reference to the vuex store's state
  const { state } = store

  // inject a ForecastVis object with store access functions into the app
  inject('forecastViz', new ForecastViz(store, state))
}
