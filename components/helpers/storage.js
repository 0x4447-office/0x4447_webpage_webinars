import AWS from 'aws-sdk'

let TEST = true
let TEST_REGION = "us-east-2"
let TEST_BUCKET = "cognito-teste"
let TEST_POOL_ID = "us-east-2:4fb6f5d4-3388-4da5-b4d2-2bedca19f11b"


let REGION = TEST ? TEST_REGION : "us-east-1"
let BUCKET = TEST ? TEST_BUCKET : "webinars.0x4447.com.db.events"
let POOL_ID = TEST ? TEST_POOL_ID : "us-east-1:619639e5-f742-4d8a-a190-850c65bb344e"

let EVENT_KEY = "latest_description.json"
let EVENT_TIME_KEY = "latest_time.json"
let API_VERSION = '2006-03-01'

//
//  1.  Generate the AWS object with the Unuthorized Cognito credentials.
//
AWS.config.region = REGION
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: POOL_ID,
})

//
//  2.  Initialize S3 Object.
//
let s3 = new AWS.S3({
  apiVersion: API_VERSION
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
