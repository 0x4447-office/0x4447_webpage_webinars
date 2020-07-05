import AWS from 'aws-sdk'

let BUCKET = "webinars.0x4447.com.db.events"
let EVENT_KEY = "latest_description.json"
let EVENT_TIME_KEY = "latest_time.json"

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
//  4.  Export a helper function to get the time of the latest event.
//
export function get_time (callback) {
  //
  //  1.  Build the params of the time object we want.
  //
  let params = {
    Bucket: BUCKET,
    Key: EVENT_TIME_KEY
  }

  //
  //  2.  Get the object we want.
  //
  s3.getObject(params, callback)
}
