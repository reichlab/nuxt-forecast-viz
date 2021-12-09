// functions to interact with the store

// function to handle if no store, or no store module
// with our namespace exists
const storeModuleExists = ({ state }) => {
  if (!state || !state['forecastViz']) {
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
export const target_variables = ({ state }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // return the counter vale from the store
  return state['forecastViz'].target_variables
}

// function to return the locations
export const locations = ({ state }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // return the counter vale from the store
  return state['forecastViz'].locations
}

// function to return the intervals
export const intervals = ({ state }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // return the counter vale from the store
  return state['forecastViz'].intervals
}

// function to return the models
export const models = ({ state }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // return the counter vale from the store
  return state['forecastViz'].models
}

// function to return the colours
export const colours = ({ state }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // return the counter vale from the store
  return state['forecastViz'].colours
}

// function to return the data
export const data = ({ state }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // return the counter vale from the store
  return state['forecastViz'].data
}

// function to return the current_models
export const current_models = ({ state }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // return the counter vale from the store
  return state['forecastViz'].current_models
}

// function to return the forecasts
export const forecasts = ({ state }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // return the counter vale from the store
  return state['forecastViz'].forecasts
}

// function to return the current_truth
export const current_truth = ({ state }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // return the counter vale from the store
  return state['forecastViz'].current_truth
}

// function to return the truth_as_of
export const truth_as_of = ({ state }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // return the counter vale from the store
  return state['forecastViz'].truth_as_of
}

// function to return the all_models
export const all_models = ({ state }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // return the counter vale from the store
  return state['forecastViz'].all_models
}

// function to return the plot_layout
export const plot_layout = ({ state }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // return the counter vale from the store
  return state['forecastViz'].plot_layout
}

// function to return the plot_data
export const plot_data = ({ state }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // return the counter vale from the store
  return state['forecastViz'].plot_data
}


///////////////////////////////////////////////////////////////////////////////
// mutations
///////////////////////////////////////////////////////////////////////////////

// function to set the target_var
export const set_target_var = ({ state, store, new_target_var }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/set_target_var', new_target_var)
}

// function to set the location
export const set_location = ({ state, store, new_location }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/set_location', new_location)
}

// function to set the interval
export const set_interval = ({ state, store, new_interval }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/set_interval', new_interval)
}

// function to increment the as_of
export const increment_as_of = ({ state, store }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/increment_as_of')
}

// function to decrement the as_of
export const adjust = ({ state, store }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/decrement_as_of')
}

// function to set the current_truth
export const set_current_truth = ({ state, store, new_truth }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/set_current_truth', new_truth)
}

// function to set the as_of_truth
export const set_as_of_truth = ({ state, store, new_truth }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/set_as_of_truth', new_truth)
}

// function to set the forecasts
export const set_forecasts = ({ state, store, new_forecasts }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/set_forecasts', new_forecasts)
}

// function to remove a model from current_models
export const remove_from_current_model = ({ state, store, item }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/remove_from_current_model', item)
}

// function to add a model to current_models
export const add_to_current_model = ({ state, store, val }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/add_to_current_model', val)
}

// function to add a data item to data list
export const add_to_data = ({ state, store, val }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/add_to_data', val)
}

// function to remove a data item from data list
export const remove_from_data = ({ state, store, item }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/remove_from_data', item)
}

// function to shuffle colours assigned to models
export const shuffle_colours = ({ state, store }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/shuffle_colours')
}

// function to select all models
export const select_all_models = ({ state, store }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/select_all_models')
}

// function to unselect all models other than defaults
export const adjust = ({ state, store, new_target_var }) => {
  // handle no store:
  if (!storeModuleExists({ state })) return undefined
  // adjust the data value using a store mutation
  return store.commit('forecastViz/unselect_all_models')
}
