<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePlaylistStore } from '../stores/Playlist';

const { push } = useRouter();
const { params } = useRoute();
const { playlists } = storeToRefs(usePlaylistStore());
const playlist = playlists.value
  .find(({ id }) => id === params.id);
console.log(playlist);

const slide = ref('style');
onMounted(() => {
  if (!playlist) push('/');
});

</script>

<template>
  <div class="q-ma-lg">
    <div class="q-mb-md">
      <q-breadcrumbs>
        <q-breadcrumbs-el
          label="Home"
          icon="home"
          to="/"
          class="text-grey"
        />
        <q-breadcrumbs-el
          :label="playlist?.snippet.title"
          icon="playlist_add_check"
          exact
        />
      </q-breadcrumbs>
    </div>

    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      infinite
      animated
      control-color="white"
      navigation
      padding
      arrows
      height="300px"
      class="bg-primary text-white shadow-1 rounded-borders shadow-4"
    >
      <q-carousel-slide
        name="style"
        class="column no-wrap flex-center"
      >
        <q-icon
          name="style"
          size="56px"
        />
        <div class="q-mt-md text-center">
          <img
            src="~src/assets/images/newjeans/01_newjeans.jpg"
            alt=""
          >
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        name="tv"
        class="column no-wrap flex-center"
      >
        <q-icon
          name="live_tv"
          size="56px"
        />
        <div class="q-mt-md text-center">
          oi
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        name="layers"
        class="column no-wrap flex-center"
      >
        <q-icon
          name="layers"
          size="56px"
        />
        <div class="q-mt-md text-center">
          hahaha
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        name="map"
        class="column no-wrap flex-center"
      >
        <q-icon
          name="terrain"
          size="56px"
        />
        <div class="q-mt-md text-center">
          hahaha
        </div>
      </q-carousel-slide>
    </q-carousel>
    <q-separator inset="item" />

    <div>{{ JSON.stringify(playlist) }}</div>
  </div>
</template>
