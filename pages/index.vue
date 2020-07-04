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
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

import RegistrationForm from '~/components/registration-form'
import EventInfo from '~/components/event-info'
import EventAbout from '~/components/event-about'
import PageFooter from '~/components/page-footer'
import AWS from 'aws-sdk';

export default {
  transition: 'slide-right',

  components: {
    RegistrationForm,
    EventInfo,
    EventAbout,
    PageFooter
  },

  async fetch () {

    //
    //  1.  Create the params of the object we want in S3
    //
    let params = {
      Bucket: "webinars.0x4447.com.db.events",
      Key: "latest_description.json"
    }

    //
    //  2.  Generate the AWS object with the Unuthorized Cognito credentials.
    //
    AWS.config.update({
      region: "us-east-1",
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "us-east-1:619639e5-f742-4d8a-a190-850c65bb344e"
      })
    })

    //
    //  3.  Initialize S3 Object
    //
    var s3 = new AWS.S3();

    //
    //  4.  Get the object we want
    //
    s3.getObject(params, function(err, data) {
      debugger
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    })
  }

}
</script>
