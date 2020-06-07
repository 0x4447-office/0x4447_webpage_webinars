# 0x4447_webpage_webinar

On this page people can subscribe to company webinars

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

# How to set ENV variables to run the project

To set required environment variables for this project to run completely, you can either configure them 
inside nuxt.config.js e.g.

```
env:{
    COMPANY_NAME: '0x4447',
    ESTABLISHED: '2016',
    AWS_REGION: 'us-east-1',
    ...
  },
```
This would load all the variables to the process on server-side before nuxt renders the page.
Or you might as well use .env file which sets required variables' values before the process and they'll 
be automatically used by nuxt.

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
