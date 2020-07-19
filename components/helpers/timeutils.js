import moment from "moment-timezone";

export default {
  to_local_tz (time) {
    //
    //  1.  Guess the browser timezone.
    //
    let tz = moment.tz.guess();
    //
    //  2. Convert the original event time to the user's timezone.
    //
    let localized_time = moment.tz(time, tz);

    //
    //  3. Return the formatted localized time.
    //
    return localized_time.format("YYYY-MM-DD  HH:mm A");
  }
}
