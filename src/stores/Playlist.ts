import { defineStore } from 'pinia';
import { fetchMusics, fetchPlaylists, Playlist } from 'boot/axios';

export const usePlaylistStore = defineStore('playlist', {
  state: () => ({
    counter: 0,
    musics: [],
    playlists: [] as Playlist[],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async fetchPlaylists() {
      const res = await fetchPlaylists();
      if (typeof res === 'object') {
        this.playlists = res;
      }
    },
  },
});
