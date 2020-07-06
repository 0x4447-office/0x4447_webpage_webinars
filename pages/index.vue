<template>
  <b-container style="width: 80%" fluid class="p-5">
    <b-row>
      <b-col>
        <event-info :time="time_info" />
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="7">
        <registration-form :event="event" />
      </b-col>
      <b-col>
        <event-about :event="event" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <page-footer />
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
import moment from 'moment-timezone'

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
      event: {},
      time_info: null
    }
  },

  async fetch () {
    get_time(this.set_time_callback)
    get_event(this.set_event_callback)
  },

  methods: {
    set_time_callback (err, data) {
        //
        //  1.  Check for internal erros.
        //
        if(err)
        {
          return console.log(err)
        }

        //
        //  2.  Set the time object in our data.
        //
        let time_info = JSON.parse(data.Body)

        //
        //  3.  Guess the browser timezone.
        //
        let tz = moment.tz.guess()

        //
        //  4. Convert the original event time to the user's timezone.
        //
        let localized_time_info = moment.tz(time_info.time, tz)

        //
        //  5. Format the localized time to what we want and set it in our data.
        //
        this.time_info = localized_time_info.format('YYYY-MM-DD  HH:mm')
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
        //  2.  Set event object in our data.
        //
        this.event = JSON.parse(data.Body)
    },
  }


}
</script>
