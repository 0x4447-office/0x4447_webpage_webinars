<template>
  <div>
    <h1 class="text-left">Form</h1>
    <b-form @submit.prevent="save">
      <b-row>
        <b-col md="12" lg="6">
          <b-form-group
            id="input-group-1"
            label="Full Name:"
            label-for="input-1"
            label-align="left"
          >
            <b-form-input id="input-1" v-model="form.full_name" required placeholder="Enter name" />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="input-group-2" label="Email:" label-for="input-2" label-align="left">
            <b-form-input
              id="input-2"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" lg="6">
          <b-form-group id="input-group-3" label="Company:" label-for="input-3" label-align="left">
            <b-form-input id="input-3" v-model="form.company" required placeholder="Company name" />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-4"
            label="Job Title:"
            label-for="input-4"
            label-align="left"
          >
            <b-form-input
              id="input-4"
              v-model="form.job_title"
              required
              placeholder="Enter job title"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group id="input-group-5" label-for="input-5" label-align="left" label="Company Size">
        <VueSlider
          v-model="form.company_size"
          class="ml-2"
          :min="1"
          :max="103"
          :tooltip-formatter="company_size_value"
        />
        <b-form-input id="input-5" class="mt-1" readonly :placeholder="company_size_value" />
      </b-form-group>
      <b-button block type="submit" variant="primary">
        <b-spinner v-if="loading" small />
        {{ button_label }}
      </b-button>
    </b-form>
    <b-alert v-model="show_error" class="mt-4" variant="danger" dismissible>
      <span>{{ error }}</span>
    </b-alert>
  </div>
</template>

<script>
//
//  Import slider component and theme. See https://nightcatsama.github.io/vue-slider-component/#server-side-rendering-ssr
//
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";
import moment from "moment";
import { post_submission } from "~/components/helpers/storage";

export default {
  components: {
    VueSlider
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show_error: false,
      loading: false,
      error:
        "A problem ocorrured when submiting your subscription, please try again.",
      form: {
        email: "",
        full_name: "",
        company: "",
        job_title: "",
        company_size: 1
      }
    };
  },

  computed: {
    company_size_value() {
      let label = this.form.company_size.toString();
      if (this.form.company_size > 99) {
        label = "100 +";
      }
      if (this.form.company_size > 100) {
        label = "250 +";
      }
      if (this.form.company_size > 101) {
        label = "500 +";
      }
      if (this.form.company_size > 102) {
        label = "∞";
      }
      return label;
    },
    button_label() {
      return this.loading ? "Registering..." : "Register";
    }
  },

  methods: {
    //
    //  1. Method to save the form
    //  called once the user click on the 'Register' Buytton
    //
    save() {
      //
      //  1.  Build the object key in the following format:
      //
      //  "year-month-day-hh-mm-ss-name_of_the_event-email.json"
      //
      let timestamp = moment().format("YYYY-MM-DD-HH-mm-ss");
      let event_name = this.event.title.replace(/ /g, "_");
      let key = `${timestamp}-${event_name}-${this.form.email}.json`;

      //
      //  2. Update the 'company_size' to the normalized value (100+, 250+ and so on)
      //
      this.form.company_size = this.company_size_value;
      //
      //  3. Set the loading state.
      this.loading = true;
      //
      //
      //  4.  Submit the form with the s3 key and:
      //      - a callback function so we can redirect the user on success
      //      - a callback function to notify the user on error.
      //
      post_submission(this.form, key, this.on_succes, this.on_error);
    },

    //
    //  2.  Method to send the user to a 'thank you' page
    //
    on_succes() {
      //
      //  1.  Reset the loading state.
      this.loading = false;

      //
      //
      //  2.  Method to send the user to a 'thank you' page
      //
      this.$router.push({ path: "/thanks" });
    },

    //
    //  3.  Method to print the error if a problem ocurred
    //
    on_error(error) {
      //
      //  1.  Reset the loading state.
      //
      this.loading = false;

      //
      //  2.  Display the error message
      //
      this.show_error = true;
      //
      //  3.  Log the error object
      //
      console.log(error);
    }
  }
};
</script>
