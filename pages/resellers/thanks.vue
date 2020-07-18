<template>
  <b-container>
    <h1>Thank You!</h1>
    <br />
    <b-button variant="primary" @click="go_back">Go Back</b-button>
  </b-container>
</template>

<script>
export default {
  transition: 'slide-left',
  methods: {
    go_back () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

