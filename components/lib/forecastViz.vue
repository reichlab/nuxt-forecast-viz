<template>
  <div id="forecastViz_vizualisation">
    <div id="forecastViz_vizualizations" class="container-fluid">
      <div class = "row">
        <div id="forecastViz_options" class="col-sm-12 col-md-3">
          <form>
            <div class="row forecastViz_var">
              <label for = "target_variable" class="col-md-5">Outcome:</label>
              <b-form-select name = "target_variable"
                            v-model="target_var"
                            :options="target_variables"
                            @change="handle_select_target_variable"
                            class="col-md-7">
              </b-form-select>
            </div>
            <div class="row forecastViz_var">
              <label for = "location" class="col-md-5">Location:</label>
              <b-form-select name = "location"
                            v-model="location"
                            :options="locations"
                            @change="handle_select_location"
                            class="col-md-7">
              </b-form-select>
            </div>
            <div class="row forecastViz_var">
              <label for = "interval" class="col-md-5">Interval:</label>
              <b-form-select name = "interval"
                            v-model="interval"
                            :options="intervals"
                            @change="handle_select_interval"
                            class="col-md-7">
              </b-form-select>
            </div>
          </form>

          <label for = "data">Select Truth Data:</label>
          <div class="form-group form-check forecastViz_select_data ">
            <input type="checkbox" id="forecastViz_Current_Truth" value="Current Truth" checked @click="handle_data('forecastViz_Current_Truth')" >&nbsp; Current ({{current_date}}) &nbsp;<span class="forecastViz_dot" style="background-color: lightgrey; "></span>&nbsp;&nbsp;&nbsp;
            <br>
            <input type="checkbox" id="forecastViz_Truth_as_of" value="Truth as of" checked @click="handle_data('forecastViz_Truth_as_of')">&nbsp; As of {{as_of_date}}&nbsp;<span class="forecastViz_dot" style="background-color: black;"></span>
          </div>
          <button type="button" class="btn xwwbtn-outline-dark btn-sm rounded-pill" style="float: right;" @click="shuffle_colours()">Shuffle Colours</button>
          <label class="forecastViz_label" for = "model">Select Models:</label>
          <input type="checkbox" id="forecastViz_all" :value="0" @click="select_all_models()" >

          <div id="forecastViz_select_model" v-bind:key="current_models">
            <div class="form-group form-check" style="min-height:0px; margin-bottom: 5px" v-for="(item, index) in models" v-bind:key="index" >
              <div v-if="forecasts.hasOwnProperty(item)" v-bind:key="forecasts">
                <div v-if="current_models.includes(item)" >
                  <label><input type="checkbox" :id="item" :value="item" @click="handle_models(item,index)" checked>&nbsp; {{item}}&nbsp;<span class="forecastViz_dot" v-bind:style="{ backgroundColor: colours[index]}"></span></label>
                </div>
                <div v-else >
                  <label><input type="checkbox" :id="item" :value="item" @click="handle_models(item,index)" >&nbsp; {{item}}&nbsp;<span class="forecastViz_dot" v-bind:style="{ backgroundColor: colours[index]}"></span></label>
                </div>
              </div>
              <div v-else style="margin:0, padding:0">
              </div>
            </div>
            <div class="form-group form-check" style="min-height:0px; margin-bottom: 5px" v-for="(item, index) in models" v-bind:key="index+100" >
              <div v-if="!forecasts.hasOwnProperty(item)" style="color: lightgrey">
                <label><input type="checkbox" :id="item" :value="item" disabled="disabled" >&nbsp; {{item}}&nbsp;<span class="forecastViz_dot" style="backgroundColor: grey"></span></label>
              </div>
            </div>
          </div>
        </div>

        <div id="forecastViz_viz" class="col-sm-12 col-md-9">
          <p class="forecastViz_disclaimer" >
            <b>{{disclaimer}}</b>
          </p>
          <client-only class="col-sm-12 col-md-12">
            <vue-plotly :data="plot_data" :layout="plot_layout" :style="plot_style"></vue-plotly>
          </client-only>
          <div class="container">
            <div class="col-md-12 text-center">
                <button type="button" class="btn btn-primary" @click="key_press(0)">&lt;</button>
                <button type="button" class="btn btn-primary" @click="key_press(1)">&gt;</button>
            </div>
          </div>
          <p style="text-align:center">
            <small>Note: You can navigate to forecasts from previous weeks with the left and right arrow keys</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  data() {
    return {
      plot_style: {
        width: "100%",
        height:"72vh"
      }
    }
  },
  computed: {
    target_variables () {
      return this.$forecastViz.target_variables()
    },
    target_var(){
      return this.$forecastViz.target_var()
    },
    locations () {
      return this.$forecastViz.locations()
    },
    location(){
      return this.$forecastViz.location()
    },
    intervals () {
      return this.$forecastViz.intervals()
    },
    interval(){
      return this.$forecastViz.interval()
    },
    current_date() {
      return this.$forecastViz.current_date()
    },
    as_of_date() {
      return this.$forecastViz.as_of_date()
    },
    models() {
      return this.$forecastViz.models()
    },
    current_models() {
      return this.$forecastViz.current_models()
    },
    forecasts() {
      return this.$forecastViz.forecasts()
    },
    plot_data () {
      return this.$forecastViz.plot_data()
    },
    plot_layout() {
      return this.$forecastViz.plot_layout()
    },
    disclaimer () {
      return this.$forecastViz.disclaimer()
    },
    colours() {
      return this.$forecastViz.colours()
    },
    all_models() {
      return this.$forecastViz.all_models()
    }
  },
  methods: {
    keydown_handler: function(event) {
      if (event.keyCode == 37) {
        this.$forecastViz.decrement_as_of()
      } else if (event.keyCode == 39) {
        this.$forecastViz.increment_as_of()
      }
    },
    key_press: function(val) {
      if (val == 0) {
        this.$forecastViz.decrement_as_of()
      } else if (val == 1) {
        this.$forecastViz.increment_as_of()
      }
    },
    handle_select_target_variable: function(val) {
      this.$forecastViz.set_target_var(val)
      if(this.all_models) {
        this.$forecastViz.select_all_models()
      }
    },
    handle_select_location: function(val) {
      this.$forecastViz.set_location(val)
      if(this.all_models){
        this.$forecastViz.select_all_models()
      }
    },
    handle_select_interval: function(val) {
      this.$forecastViz.set_interval(val)
    },
    shuffle_colours() {
      this.$forecastViz.shuffle_colours()
    },
    handle_models(item,index) {
      var checkbox = document.getElementById(item);
      if (checkbox.checked != true) {
        this.$forecastViz.remove_from_current_model(item)
      } else {
        this.$forecastViz.add_to_current_model(item)
      }
    },
    select_all_models() {
      var checkbox = document.getElementById("forecastViz_all");
      if (checkbox.checked === true) {
        this.$forecastViz.select_all_models()
      } else {
        this.$forecastViz.unselect_all_models()
      }
      this.$forceUpdate()
    },
    handle_data(item) {
      var checkbox = document.getElementById(item);
      if (checkbox.checked != true) {
        this.$forecastViz.remove_from_data(checkbox.value)
      } else {
        this.$forecastViz.add_to_data(checkbox.value)
      }
    }
  },
  async mounted() {
    window.addEventListener('keydown', this.keydown_handler);
    await this.$forecastViz.init()
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keydown_handler);
  }
}
</script>

<style>

html,body
{
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    overflow-x: hidden !important; 
}

#forecastViz_vizualisation {
  width: 100% !important;
  margin: 0;
}

.forecastViz_dot {
  height: 15px;
  width: 15px;
  border-radius: 50%;
  border: 1px solid black;
  display: inline-block;
}

.forecastViz_disclaimer{
  text-align:center;
  margin-left: 3%;
  margin-right: 3%;
  font-size: 18px
}

.forecastViz_var{
  margin-bottom: 10px;
}

.forecastViz_select_data{
  font-size: 14px;
}

#forecastViz_vizualizations {
  padding: 1% 3%;
  border: none;
}
#forecastViz_select_model{
  height: 48vh;
  overflow-y: scroll;
  margin-top: 20px;
  font-size: 14px;

}
.forecastViz_label{
  margin-top: 5px;
  margin-bottom: 0px ;
}

#forecastViz_options {
  background: #fff;
}

select{
  font-size: 14px !important;
}

label{
  font-size: 15.5px;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: grey;
  border-radius: 5px;
}

/* small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  html,body
  {
      width: 100%;
      height: 100%;
      margin: 0px;
      padding: 0px;
      overflow-x: hidden !important; 
  }
  .forecastViz_select_data{
    margin: 2%;
  }

  .forecastViz_disclaimer{
    margin: 2%;
  }
  #forecastViz_options {
  margin: 2%;
}
}
/* Medium devices (ipads, 768px and up) */
@media only screen and (min-width: 768px) {
  html,body
  {
      width: 100%;
      height: 100%;
      margin: 0px;
      padding: 0px;
      overflow-x: hidden !important; 
  }
} 
/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  html,body
  {
      width: 100%;
      height: 100%;
      margin: 0px;
      padding: 0px;
      overflow-x: hidden !important; 
  }
} 

</style>
