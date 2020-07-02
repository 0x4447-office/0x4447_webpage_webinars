<template>
  <b-container fluid class="p-5">
    <b-row>
      <b-col>
        <event-info />
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="5">
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

export default {
  transition: 'slide-right',

  components: {
    RegistrationForm,
    EventInfo,
    EventAbout,
    PageFooter
  }

}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
