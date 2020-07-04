<template>
  <b-card class="border-top-0 border-left-0 border-bottom-0 text-left pr-2">
    <b-card-title>
      <h1>Form</h1>
    </b-card-title>

    <b-form
      @submit.prevent="save"
    >

      <b-form-group id="input-group-1" label="Full Name:" label-for="input-1" label-align="left">
        <b-form-input
          id="input-1"
          v-model="form.full_name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Email:" label-for="input-2" label-align="left">
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>
        <b-form-group id="input-group-3" label="Company:" label-for="input-3" label-align="left">
        <b-form-input
          id="input-3"
          v-model="form.company"
          required
          placeholder="Company name"
        ></b-form-input>
      </b-form-group>
        <b-form-group id="input-group-4" label="Job Title:" label-for="input-4" label-align="left">
        <b-form-input
          id="input-4"
          v-model="form.job_title"
          required
          placeholder="Enter job title"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-5" label-for="input-5"
        label-align="left"
        label="Company Size"
      >
        <vue-slider v-model="form.company_size" :min="1"/>
        <b-form-input
          id="input-5"
          readonly
          :placeholder="company_size_label"
        ></b-form-input>
      </b-form-group>
      <b-button
        block
        type="submit"
        variant="primary"
      >Register</b-button>
    </b-form>
  </b-card>
</template>

<script>
//
//  Import component and theme. See https://nightcatsama.github.io/vue-slider-component/#server-side-rendering-ssr
//
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'


export default {
  components: {
    VueSlider
  },
  data () {
    return {
      form: {
        email: '',
        full_name: '',
        company: '',
        job_title: '',
        company_size: 1
      }
    }
  },

  methods: {
    save() {
      this.$router.push({ path: '/thanks' })
    }
  },

  computed: {
    company_size_label() {
      return this.form.company_size > 99 ? '100+' : this.form.company_size.toString()
    }
  }
}
</script>
