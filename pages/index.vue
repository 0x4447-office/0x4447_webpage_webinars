<template>
  <b-container style="width: 80%" fluid class="p-5">
    <b-row>
      <b-col>
        <event-info />
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="7">
        <registration-form />
      </b-col>
      <b-col>
        <event-about />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <page-footer />
        <div v-if="debug">
          {{time}}
          {{event}}
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import RegistrationForm from '~/components/registration-form'
import EventInfo from '~/components/event-info'
import EventAbout from '~/components/event-about'
import PageFooter from '~/components/page-footer'

import { get_time, get_event } from '~/components/helpers/storage'


import { get_time, get_event } from '~/components/helpers/storage'


export default {
  transition: 'slide-right',

  components: {
    RegistrationForm,
    EventInfo,
    EventAbout,
    PageFooter
  },

  data () {
    return {
      event: null,
      time: null,
      debug: true
    }
  },

  async fetch () {
    get_time(this.set_time_callback)
    get_event(this.set_event_callback)
  },

  methods: {
    set_time_callback (err, data) {
        //
        //  1.  CHeck for internal erros.
        //
        if(err)
        {
          return console.log(err)
        }

        //
        //  2.  Set the time object in our data.
        //
        this.time = JSON.parse(data.Body)
    },
    set_event_callback (err, data) {
        //
        //  1.  CHeck for internal erros.
        //
        if(err)
        {
          return console.log(err)
        }

        //
        //  2.  Set event object in our data
        //
        this.event = JSON.parse(data.Body)
    },
  }


}
</script>
