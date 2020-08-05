<template>
  <div>
    <h1 class="text-left">Sing Up</h1>
    <b-form @submit.prevent="save">
      <b-row>
        <b-col md="12" lg="6">
          <b-form-group
            id="input-group-first-name"
            label="First Name:"
            label-for="input-first-name"
            label-align="left"
          >
            <b-form-input
              id="input-first-name"
              v-model="form.first_name"
              required
              placeholder="John"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-last-name"
            label="Last Name:"
            label-for="input-last-name"
            label-align="left"
          >
            <b-form-input
              id="input-last-name"
              v-model="form.last_name"
              required
              placeholder="Doe"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            id="input-group-email"
            label="Email:"
            label-for="input-email"
            label-align="left"
          >
            <b-form-input
              id="input-email"
              v-model="form.email"
              type="email"
              required
              placeholder="john.doe@example.com"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" lg="6">
          <b-form-group
            id="input-group-company"
            label="Company:"
            label-for="input-company"
            label-align="left"
          >
            <b-form-input
              id="input-company"
              v-model="form.company"
              required
              placeholder="Example LLC"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-job-title"
            label="Job Title:"
            label-for="input-job-title"
            label-align="left"
          >
            <b-form-input
              id="input-job-title"
              v-model="form.job_title"
              required
              placeholder="CEO, CTO, VP off... etc."
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-group
        id="input-group-company-size"
        label-for="input-company-size"
        label-align="left"
        label="Company Size"
      >
        <VueSlider
          v-model="form.company_size"
          class="ml-2"
          :min="1"
          :max="103"
          :tooltip-formatter="company_size_value"
        />
        <b-form-input
          id="input-company-size"
          class="mt-1"
          readonly
          :placeholder="company_size_value"
        />
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
      return this.loading ? "Signing Up..." : "Sing Up";
    }
  },

  methods: {
    //
    //  Method to save the form called once the user click on the 'Register'
    //  Buytton
    //
    save() {
      //
      //  1.  Make the S3 object name using Unix miliseconds, to ensure that
      //      the name is unique, and will make the triggering system perform
      //      a put event.
      //
      let key = Date.now() + ".json";

      //
      //  2. Update the 'company_size' to the normalized value (100+, 250+ and so on)
      //
      this.form.company_size = this.company_size_value;

      //
      //  3. Set the loading state.
      //
      this.loading = true;

      //
      //
      //  4.  Submit the form with the s3 key and:
      //      - a callback function so we can redirect the user on success
      //      - a callback function to notify the user off errors.
      //
      post_submission(this.form, key, this.on_succes, this.on_error);
    },

    //
    //  Method to send the user to a 'thank you' page
    //
    on_succes() {
      //
      //  1.  Reset the loading state.
      //
      this.loading = false;

      //
      //
      //  2.  Method to send the user to a 'thank you' page
      //
      this.$router.push({ path: "/thanks" });
    },

    //
    //  Method to print the error if a problem ocurred
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
