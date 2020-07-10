<template>
  <div class="ml-2 text-left">
    <b-card-title>
      <h1>About the event</h1>
    </b-card-title>
    <b-media>
      <template v-slot:aside>
        <b-img v-if="event.image" :src="event.image" width="64" alt="event image"></b-img>
        <b-spinner v-else></b-spinner>
      </template>
      <p>
        {{ event.title }}
      </p>
      <p>
        {{ event.description || "loading..." }}
      </p>
    </b-media>
  </div>
</template>

<script>
export default {
  props: ['event']
}
</script>

<style>

</style>
