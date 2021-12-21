# nuxt-forecast-viz
A Nuxt module for infectious disease forecast visualization

## Using the module in other projects

To add the module to the project that uses the module, enter the following command in the working directory of that project:

```
yarn add https://github.com/reichlab/nuxt-forecast-viz
```

You also need to add the module and an options object in your project's `nuxt.config.js` file:

```
export default {
  ...

  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
    ['nuxt-forecast-viz',
      {
        // list of target variables.
        // "value" is a key, "text" is used in menus, and
        // "plot_text" is used in plot labels
        target_variables: [
          {
            "value": "death",
            "text": "Deaths",
            "plot_text": "Incident weekly deaths"
          },
          {
            "value": "hosp",
            "text": "Hospitalizations",
            "plot_text": "Incident daily hospitalizations"
          },
          {
            "value": "case",
            "text": "Cases",
            "plot_text": "Incident weekly cases"
          }],
        // initial target variable to use
        init_target_var: 'death',
        // set of locations
        // "value" is an internal identifier and "text" is used in menus and
        // plot labels
        locations: [
          {
            "value": "US",
            "text": "US"
          },
          {
            "value": "01",
            "text": "Alabama"
          },
          {
            "value": "02",
            "text": "Alaska"
          }],
        // initial location to use
        init_location: 'US',
        // options for forecast interval levels
        intervals: ['0%', '50%', '95%'],
        // initial value for interval level
        init_interval: '95%',
        // available as_of dates. Note: we plan to rename this to available_ref_dates
        // an object with one entry for each "value" in the target_variables,
        // listing available reference dates for that target variable
        available_as_ofs: {
          "case": [
            "2020-08-01",
            "2020-08-08"],
          "hosp": [
            "2020-08-01",
            "2020-08-08"],
          "death": [
            "2020-08-01",
            "2020-08-08"],
        },
        // initial value for as_of date. Note: we plan to rename this to init_ref_date
        init_as_of_date: "2020-08-08",
        current_date: "2020-08-08",
        // an ordered list of all models that may be displayed.
        models: ["COVIDhub-ensemble","COVIDhub-baseline","AIpert-pwllnod", ...],
        // a list of models that are selected initially and when the
        // "all models" checkbox is unselected
        default_models: ['COVIDhub-ensemble'],
        // initial value for the all_models checkbox.
        // I think this is not actually currently used.
        all_models: false
        // A disclaimer about the predictions. Switches to the default one if not provided.
        disclaimer: 'Your disclaimer here'
      }
    ]
  ],

  ...
}
```

Finally, you will need to create a `store/index.js` file and export an action called `forecastViz_fetch_data`. This should be an `async function` that fetches either truth data or forecasts data. Here is an example of the contents of `store/index.js` for retrieving data from json files:

```
// store/index.js
import axios from 'axios';

export const actions = {
  // fetch data by reading from a json file
  // if process.server is True, we're doing a server-side render,
  // so we load from a local json file.
  // otherwise, issue an http request using axios
  async forecastViz_fetch_data(_, {is_forecast, target_var, location, ref_date}) {
    var target_path;
    var data;
    if (is_forecast) {
      target_path = `data/forecasts/${target_var}_${location}_${ref_date}.json`;
    } else {
      target_path = `data/truth/${target_var}_${location}_${ref_date}.json`;
    }
    if (process.server) {
      target_path = './static/' + target_path;
      data = JSON.parse(require('fs').readFileSync(target_path, 'utf8'));
    } else {
      const response = await axios.get(target_path);
      data = response.data;
    }
    return data;
  }
}
```



## Module development

I have found that to get module changes to reliably propagate to the project that's using the module, I need to actually uninstall and reinstall the module on that project. Additionally, it's helpful to install the module from your local clone with the changes, so that you can try things out before committing them. With your working directory set to the project that uses `nuxt-forecast-viz`, enter the following commands:

```
yarn remove nuxt-forecast-viz
yarn add file:path/to/your/local/clone/of/nuxt-forecast-viz/
yarn build
yarn generate
yarn start
```

For instance, on my computer the second line above is `add file:../../tools/nuxt-forecast-viz/`.
