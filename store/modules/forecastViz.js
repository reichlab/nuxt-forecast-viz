import moment from "moment"

export default moduleOptions => ({
  namespaced: true,
  state: () => ({
    target_variables: moduleOptions.target_variables,
    target_var: moduleOptions.init_target_var,
    locations: moduleOptions.locations,
    location: moduleOptions.init_location,
    intervals: moduleOptions.intervals,
    interval: moduleOptions.init_interval,
    available_as_ofs: moduleOptions.available_as_ofs,
    as_of_date: moduleOptions.init_as_of_date,
    as_of_truth: [],
    current_date: moduleOptions.current_date,
    current_truth: [],
    forecasts: {},
    models: moduleOptions.models,
    current_models: moduleOptions.default_models,
    default_models: moduleOptions.default_models,
    data: ['Current Truth', 'Truth As Of'],
    colours: ['#0d0887', '#46039f', '#7201a8', '#9c179e', '#bd3786', '#d8576b', '#ed7953', '#fb9f3a', '#fdca26', '#f0f921', '#0d0887', '#46039f', '#7201a8', '#9c179e', '#bd3786', '#d8576b', '#ed7953', '#fb9f3a', '#fdca26', '#f0f921', '#0d0887', '#46039f', '#7201a8', '#9c179e', '#bd3786', '#d8576b', '#ed7953', '#fb9f3a', '#fdca26', '#f0f921', '#0d0887', '#46039f', '#7201a8', '#9c179e', '#bd3786', '#d8576b', '#ed7953', '#fb9f3a', '#fdca26', '#f0f921', '#0d0887', '#46039f', '#7201a8', '#9c179e', '#bd3786', '#d8576b', '#ed7953', '#fb9f3a', '#fdca26', '#f0f921', '#0d0887', '#46039f', '#7201a8', '#9c179e', '#bd3786', '#d8576b', '#ed7953', '#fb9f3a', '#fdca26', '#f0f921', '#0d0887', '#46039f', '#7201a8', '#9c179e', '#bd3786', '#d8576b', '#ed7953', '#fb9f3a', '#fdca26', '#f0f921', '#0d0887', '#46039f', '#7201a8', '#9c179e', '#bd3786', '#d8576b', '#ed7953', '#fb9f3a', '#fdca26', '#f0f921'],
    all_models: moduleOptions.all_models
  }),
  mutations: {
    async set_target_var(state, new_target_var) {
      state.target_var = new_target_var;
      console.log("new target var:")
      console.log(state.target_var)
      console.log(this)
      await this.dispatch('forecastViz/fetch_current_truth');
      await this.dispatch('forecastViz/fetch_as_of_truth');
      await this.dispatch('forecastViz/fetch_forecasts')
      if (state.all_models === true) {
        await this.dispatch('forecastViz/update_models')
      }
    },
    async set_location(state, new_location) {
      state.location = new_location;
      await this.dispatch('forecastViz/fetch_current_truth');
      await this.dispatch('forecastViz/fetch_as_of_truth');
      await this.dispatch('forecastViz/fetch_forecasts');
      if (state.all_models === true) {
        await this.dispatch('forecastViz/update_models')
      }
    },
    set_interval(state, new_interval) {
      state.interval = new_interval;
    },
    increment_as_of(state) {
      const as_of_index = state.available_as_ofs[state.target_var].indexOf(state.as_of_date);
      if (as_of_index < state.available_as_ofs[state.target_var].length - 1) {
        state.as_of_date = state.available_as_ofs[state.target_var][as_of_index + 1];
      }
      this.dispatch('forecastViz/fetch_as_of_truth');
      this.dispatch('forecastViz/fetch_forecasts');
    },
    decrement_as_of(state) {
      const as_of_index = state.available_as_ofs[state.target_var].indexOf(state.as_of_date);
      if (as_of_index > 0) {
        state.as_of_date = state.available_as_ofs[state.target_var][as_of_index - 1];
      }
      this.dispatch('forecastViz/fetch_as_of_truth');
      this.dispatch('forecastViz/fetch_forecasts');
    },
    set_current_truth(state, new_truth) {
      state.current_truth = new_truth;
    },
    set_as_of_truth(state, new_truth) {
      console.log("in set_as_of_truth")
      console.log(state)
      console.log(new_truth)
      state.as_of_truth = new_truth;
    },
    set_forecasts(state, new_forecasts) {
      state.forecasts = new_forecasts;
    },
    remove_from_current_model(state, item) {
      const index = state.current_models.indexOf(item);
      state.current_models.splice(index, 1);
    },
    add_to_current_model(state, val) {
      state.current_models.push(val);
    },
    add_to_data(state, val) {
      state.data.push(val);
    },
    remove_from_data(state, item) {
      const index = state.data.indexOf(item);
      state.data.splice(index, 1);
    },
    shuffle_colours(state) {
      state.colours = state.colours.sort(() => 0.5 - Math.random());
    },
    select_all_models(state) {
      state.current_models = Object.keys(state.forecasts).map((model)=>{
        return model
      })
      state.all_models = true
    },
    unselect_all_models(state) {
      state.current_models = state.default_models;
      state.all_models = false
    }
  },
  actions: {
    async fetch_current_truth({ commit, state }) {
      try {
        // const target_path = `data/truth/${state.target_var}_${state.location}_${state.current_date}.json`;
        console.log("fetch_current_truth")
        console.log(moduleOptions)
        console.log(moduleOptions.fetch_data)
        // const data = await moduleOptions.fetch_data(target_path);
        const data = await this.dispatch('forecastViz_fetch_data',
          {
            is_forecast: false,
            target_var: state.target_var,
            location: state.location,
            ref_date: state.current_date
          });
        console.log("current truth data:")
        console.log(data)
        commit('set_current_truth', data);
        console.log(state.current_truth)
      } catch (error) {
        commit('set_current_truth', []);
        console.log(error);
      }
    },
    async fetch_as_of_truth({ commit, state }) {
      try {
        // const target_path = `data/truth/${state.target_var}_${state.location}_${state.as_of_date}.json`;
        // const data = await moduleOptions.fetch_data(target_path);
        const data = await this.dispatch('forecastViz_fetch_data',
          {
            is_forecast: false,
            target_var: state.target_var,
            location: state.location,
            ref_date: state.as_of_date
          });
        console.log("fetch_as_of_truth")
        console.log(data)
        commit('set_as_of_truth', data);
        console.log(state)
        console.log(state.as_of_truth)
      } catch (error) {
        commit('set_as_of_truth', []);
        console.log(error);
      }
    },
    async fetch_forecasts({ commit, state }) {
      try {
        // const target_path = `data/forecasts/${state.target_var}_${state.location}_${state.as_of_date}.json`;
        // const data = await moduleOptions.fetch_data(target_path);
        const data = await this.dispatch('forecastViz_fetch_data',
          {
            is_forecast: true,
            target_var: state.target_var,
            location: state.location,
            ref_date: state.as_of_date
          });
        commit('set_forecasts', data);
      } catch (error) {
        commit('set_forecasts', {});
        console.log(error);
      }
    },
    async update_models({ commit }) {
      commit('select_all_models')
    }
  },
  getters: {
    target_variables: (state) => state.target_variables,
    locations: (state) => state.locations,
    intervals: (state) => state.intervals,
    models: (state) => state.models,
    colours: (state) => state.colours,
    data: (state) => state.data,
    current_models: (state) => state.current_models,
    forecasts: (state) => state.forecasts,
    current_date: (state) => state.current_date,
    truth_as_of: (state) => state.as_of_date,
    all_models: (state) => state.all_models,
    plot_layout: (state) => {
      const variable = state.target_variables.filter((obj) => obj.value === state.target_var)[0].plot_text;
      const location = state.locations.filter((obj) => obj.value === state.location)[0].text;
      return {
        autosize: true,
        showlegend: false,
        title: { text: `Forecasts of ${variable} in ${location} as of ${state.as_of_date}` },
        xaxis: {
          title: { text: 'Date' },
        },
        yaxis: {
          title: { text: variable },
        },
      };
    },
    plot_data: (state) => {
      let pd = [];

      console.log("in plot_data, state.data:")
      console.log(state.data)

      if (state.data.includes('Current Truth')) {
        pd.push({
          x: state.current_truth.date,
          y: state.current_truth.y,
          type: 'scatter',
          mode: 'lines',
          name: 'Current Truth',
          marker: {
            color: 'darkgray',
          },
        });
      }
      if (state.data.includes('Truth As Of')) {
        pd.push({
          x: state.as_of_truth.date,
          y: state.as_of_truth.y,
          type: 'scatter',
          mode: 'lines',
          opacity: 0.5,
          name: `Truth as of ${state.as_of_date}`,
          marker: {
            color: 'black',
          },
        });
      }
      const pd0 = Object.keys(state.forecasts).map(
        (model) => {
          if (state.current_models.includes(model)) {
            const index = state.models.indexOf(model);
            var model_forecasts = state.forecasts[model]
            var date = model_forecasts["target_end_date"]
            var lq1 = model_forecasts["q0.025"]
            var lq2 = model_forecasts["q0.25"]
            var mid = model_forecasts["q0.5"]
            var uq1 = model_forecasts["q0.75"]
            var uq2 = model_forecasts["q0.975"]

            //1) combine the arrays:
            var list = [];
            for (var j = 0; j < date.length; j++) 
              list.push({'date': date[j],
                         'lq1': lq1[j],
                         'lq2': lq2[j],
                         'uq1': uq1[j],
                         'uq2': uq2[j],
                         'mid': mid[j] });

            //2) sort:
            list.sort(function(a, b) {
              return ((moment(a.date).isBefore(b.date)) ? -1  : 1);
              //Sort could be modified to, for example, sort on the age 
              // if the name is the same.
            });

            //3) separate them back out:
            for (var k = 0; k < list.length; k++) {
              model_forecasts.target_end_date[k] = list[k].date;
              model_forecasts["q0.025"][k] = list[k].lq1;
              model_forecasts["q0.25"][k] = list[k].lq2;
              model_forecasts["q0.5"][k] = list[k].mid;
              model_forecasts["q0.75"][k] = list[k].uq1;
              model_forecasts["q0.975"][k] = list[k].uq2;
            }

            return ({
              x: [state.as_of_truth.date.slice(-1)[0],model_forecasts.target_end_date.slice(0)[0]],
              y: [state.as_of_truth.y.slice(-1)[0], model_forecasts['q0.5'].slice(0)[0]],

              mode: 'lines',
              type: 'scatter',
              name: model,
              hovermode: false,
              opacity: 0.7,
              line: { color: state.colours[index] },
              hoverinfo:'none'
            });
          }
          return [];
        },
      );

      pd = pd.concat(...pd0);
      const pd1 = Object.keys(state.forecasts).map(
        (model) => {
          if (state.current_models.includes(model)) {
            const index = state.models.indexOf(model);
            const is_hosp = state.target_var === 'hosp'
            const mode = is_hosp? 'lines':'lines+markers'
            const model_forecasts = state.forecasts[model];
            let upper_quantile; 
            let lower_quantile;
            const plot_line = {
              // point forecast
              x: model_forecasts.target_end_date,
              y: model_forecasts['q0.5'],
              type: 'scatter',
              name: model,
              opacity: 0.7,
              mode: mode,
              line: { color: state.colours[index] },
            };

            if (state.interval === '50%') {
              lower_quantile = 'q0.25';
              upper_quantile = 'q0.75';
            }
            else if (state.interval === '95%') {
              lower_quantile = 'q0.025';
              upper_quantile = 'q0.975';
            }
            else{
              return [plot_line]
            }

            var x = state.as_of_truth.date.slice(-1).concat(model_forecasts.target_end_date)
            var y1 = state.as_of_truth.y.slice(-1).concat(model_forecasts[lower_quantile])
            var y2 =  state.as_of_truth.y.slice(-1).concat(model_forecasts[upper_quantile])

            return [
              plot_line,
              {
                // interval forecast -- currently fixed at 50%
                x: [].concat(
                  x,
                  x.slice().reverse(),
                ),
                y: [].concat(
                  y1,
                  y2.slice().reverse(),
                ),
                fill: 'toself',
                fillcolor: state.colours[index],
                opacity: 0.3,
                line: { color: 'transparent' },
                type: 'scatter',
                name: model,
                showlegend: false,
                hoverinfo: 'skip',
              },
            ];
          }

          return [];
        },
      );
      pd = pd.concat(...pd1);

      console.log("pd:")
      console.log(pd)

      return pd;
    }
  }
})
