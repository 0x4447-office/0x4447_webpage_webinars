<template>


    <b-form
      @submit.prevent="save"
    >
      <b-form-group>
        <b-form-input
          id="input-1"
          v-model="form.full_name"
          required
          placeholder="Full Name"
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input
          id="input-2"
          v-model="form.email"
          type="email"
          required
          placeholder="Email"
        ></b-form-input>
      </b-form-group>
        <b-form-group>
        <b-form-input
          id="input-3"
          v-model="form.company"
          required
          placeholder="Company"
        ></b-form-input>
      </b-form-group>
        <b-form-group>
        <b-form-input
          id="input-1"
          v-model="form.job_title"
          required
          placeholder="Job Title"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label-align="left"
        label="Company Size"
      >
        <vue-slider v-model="form.company_size" :min="1"/>
        <b-form-input
          id="input-1"
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
