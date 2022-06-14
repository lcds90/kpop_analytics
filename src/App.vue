<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { onMounted } from 'vue';
import { usePlaylistStore } from 'src/stores/Playlist';

const $q = useQuasar();
const storePlaylist = usePlaylistStore();
const { fetchPlaylists } = storePlaylist;
const { playlists } = storeToRefs(storePlaylist);

onMounted(async () => {
  await fetchPlaylists();
  if (playlists.value.length > 0) {
    console.log('ok', playlists.value);

    $q.notify({
      message: 'Bem vindo',
      color: 'positive',
      textColor: 'white',
      caption: 'As playlists já foram carregadas com sucesso! 😀',
      position: 'top',
    });
  }
});

</script>

<template>
  <router-view />
</template>
