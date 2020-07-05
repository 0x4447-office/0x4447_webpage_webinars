<template>
  <b-card class="border-0 text-left">
    <b-card-title>
      <h1>About the event</h1>
    </b-card-title>
    <b-media>
      <template v-slot:aside>
        <b-img v-if="event.image" :src="event.image" width="64" alt="event image"></b-img>
        <b-img v-else blank blank-color="#ccc" width="64" alt="placeholder"></b-img>
      </template>
      <p>
        {{event.title }}
      </p>
      <p>
        {{event.description || "loading..." }}
      </p>
    </b-media>
  </b-card>
</template>

<script>
export default {
  props: ['event']
}
</script>

<style>

</style>
