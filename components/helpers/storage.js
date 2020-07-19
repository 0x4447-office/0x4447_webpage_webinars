import AWS from 'aws-sdk'
let BUCKET = "webinars.0x4447.com.db.events"
let EVENT_KEY = "event.json"

//
//  1.  Generate the AWS object with the Unuthorized Cognito credentials.
//
AWS.config.update({
  region: "us-east-1",
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "us-east-1:619639e5-f742-4d8a-a190-850c65bb344e"
  })
});

//
//  2.  Initialize S3 Object.
//
let s3 = new AWS.S3({
  apiVersion: '2006-03-01'
})

//
//  3.  Export a helper function to get the time of the latest event.
//
export function get_event (callback) {
  //
  //  1.  Build the params of the event object we want.
  //
  let params = {
    Bucket: BUCKET,
    Key: EVENT_KEY
  }

  //
  //  2.  Get the event object we want.
  //
  s3.getObject(params, callback)
}

//
//  1. Helper function to encode forms that will be sent to AWS.
//
function encode_form (form) {
    //
    //  1.  Stringify form
    //
    let data = JSON.stringify(form)

    //
    //  2.  Convert form string to an ArrayBuffer and return it.
    //
    let encoder = new TextEncoder()
    let array_buffer = encoder.encode(data)
    return array_buffer
}


//
//  1. Helper function to handle the process of sending an object to a bucket.
//
function handle_upload (params, on_success, on_error) {
  try {
    //
    //  1.  Prepare parameters for putObject function
    //


    //
    //  2.  Call putObject to send json to S3 Bucket
    //
    s3.putObject(params, function(error, data) {
      //
      //  1.  Check for internal erros and
      //  call the error callback if needed.
      //
      if(error) {
        return on_error(error)
      }
      //
      //  2.  Exec the callback function.
      //
      on_success()

    })

  //
  //  2. Catch any error in the submission process and
  //  call the callback error if needed.
  //
  } catch (error) {
    //
    //  1. Catch any error in the submission process
    //
    return on_error(error)
  }
}

export function post_submission (form, key, on_success, on_error) {
  //
  //  1.  Create the S3 params.
  //
  let params = {
    Body: encode_form(form),
    Bucket: "webinars.0x4447.com.db.form.signups",
    Key: key
  }

  //
  //  2.  Submit the object to S3.
  //
  handle_upload(params, on_success, on_error)
}

export function post_reseller_submission (form, key, on_success, on_error) {
   //
  //  1.  Create the S3 params.
  //
  let params = {
    Body: encode_form(form),
    Bucket: "webinars.0x4447.com.db.form.resellers",
    Key: key
  }

  //
  //  2.  Submit the object to S3.
  //
  handle_upload(params, on_success, on_error)
}
