<template>
  <b-container>
    <b-row>
      <b-col sm="12" md="7" class="pr-5">
        <span class="mx-2 text-center">
          <logo />
          <p class="lead text-muted">Free Webinar</p>
        </span>
      </b-col>
      <b-col>
        <div class="ml-2 text-left">
          <p>The event starts at</p>
          <h3>{{ time_info || "loading ..." }}</h3>
          <p class="small">Your local time</p>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col order-md="1" order-sm="2" sm="12" md="7" class="pr-5 formborder">
        <registration-form :event="event" />
      </b-col>
      <b-col order-md="2" order-sm="1">
        <event-about :event="event" />
      </b-col>
    </b-row>
    <page-footer text="1H of open questions about the product and AWS over text" />
  </b-container>
</template>

<script>
import RegistrationForm from "~/components/registration-form";
import EventAbout from "~/components/event-about";
import PageFooter from "~/components/page-footer";
import { get_time, get_event } from "~/components/helpers/storage";
import moment from "moment-timezone";
import logo from "~/components/logo";

export default {
  transition: "slide-right",

  components: {
    RegistrationForm,
    EventAbout,
    PageFooter,
    logo
  },

  data() {
    return {
      event: {},
      time_info: null
    };
  },

  async fetch() {
    get_time(this.set_time_callback);
    get_event(this.set_event_callback);
  },

  methods: {
    set_time_callback(err, data) {
      //
      //  1.  Check for internal erros.
      //
      if (err) {
        return console.log(err);
      }

      //
      //  2.  Set the time object in our data.
      //
      let time_info = JSON.parse(data.Body);

      //
      //  3.  Guess the browser timezone.
      //
      let tz = moment.tz.guess();

      //
      //  4. Convert the original event time to the user's timezone.
      //
      let localized_time_info = moment.tz(time_info.time, tz);

      //
      //  5. Format the localized time to what we want and set it in our data.
      //
      this.time_info = localized_time_info.format("YYYY-MM-DD  HH:mm");
    },
    set_event_callback(err, data) {
      //
      //  1.  CHeck for internal erros.
      //
      if (err) {
        return console.log(err);
      }

      //
      //  2.  Check if the image of the event is valid.
      //
      let event = JSON.parse(data.Body);
      fetch(event.image, { method: "HEAD" })
        .then(response => {
          if (!response.ok) {
            event.image = null;
          }
        })
        .catch(err => {
          event.image = null;
        });

      //
      //  3. Define the event object.
      //
      this.event = event;
    }
  }
};
</script>
<style scoped>
.formborder {
  border: none;
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 768px) {
  .formborder {
    border-right: 1px solid lightgray;
    height: 100%px;
  }
}
</style>
