<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePlaylistStore } from 'src/stores/Playlist';

const { playlists } = storeToRefs(usePlaylistStore());

</script>

<template>
  <q-page class="full-width row inline wrap justify-center items-center content-center q-gutter-sm">
    <q-card
      v-for="playlist in playlists"
      :key="playlist.id"
      class="my-card col-xs-8 col-sm-8 col-md-4 col-lg-2 q-gutter-xs"
    >
      <q-img :src="playlist.snippet?.thumbnails.high.url">
        <div class="absolute-bottom text-subtitle2 text-center">
          {{ playlist.snippet?.title }}
        </div>
      </q-img>
      <q-card-section>
        <div class="text-h6">
          {{ playlist.snippet?.channelTitle }}
        </div>
        <div class="text-subtitle2">
          Upload realizado em:
          {{ new Date(playlist.snippet?.publishedAt as string).toLocaleDateString() }}
        </div>
        <q-btn
          round
          color="secondary"
          icon="navigation"
          :to="`/playlist/${playlist?.id}`"
        />
      </q-card-section>
    </q-card>
    <q-ajax-bar
      ref="bar"
      position="bottom"
      color="secondary"
      size="10px"
    />
  </q-page>
</template>
