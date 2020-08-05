<template>
  <b-container>
    <b-row>
      <b-col sm="12" md="7" class="pr-5">
        <span class="mx-2 text-center">
          <logo />
        </span>
      </b-col>
      <b-col>
        <div class="ml-2 text-left">
          <p>The event starts at:</p>
          <h3>{{ event.time.localized_start || "loading ..." }}</h3>
          <p class="small">Your local time.</p>
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
    <page-footer text="One hour of open questions after the webinar." />
  </b-container>
</template>

<script>
import RegistrationForm from "~/components/registration-form";
import EventAbout from "~/components/event-about";
import PageFooter from "~/components/page-footer";
import { get_event, get_image_asset_url } from "~/components/helpers/storage";
import timeutils from "~/components/helpers/timeutils";

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
      event: {
        time: {}
      }
    };
  },

  async fetch() {
    get_event(this.set_event_callback);
  },

  methods: {
    set_event_callback(err, data) {
      //
      //  1.  CHeck for internal erros.
      //
      if (err) {
        return console.log(err);
      }

      //
      //  2.  Check if the image of the event is valid and set it to null if its not.
      //
      let event = JSON.parse(data.Body);

      //
      //  3. Localize the time info.
      event.time.localized_start = timeutils.to_local_tz(event.time.start);
      event.time.localized_end = timeutils.to_local_tz(event.time.end);

      //
      //  4. Define the event image url.
      //
      event.image_url = get_image_asset_url(event.image);

      //
      //  5. Define the event object.
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
