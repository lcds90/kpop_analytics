import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

export interface Playlist {
  etag: string;
  id: string;
  kind: string;
  snippet: {
    channelId: string;
    channelTitle: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      default: {
        height: number;
        url: string;
        width: number;
      };
      high: {
        height: number;
        url: string;
        width: number;
      };
      medium: {
        height: number;
        url: string;
        width: number;
      };
    };
    title: string;
  };
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

/*
SECTION IDs do canal
    LINK https://commentpicker.com/youtube-channel-id.php
    NOTE randomk: UCzSIRGuUOwj6lTucIIh7h5Q
    NOTE statsk: UC571Os97Ct2Or3yLiP1WZgQ
!SECTION
*/

const key = process.env.YOUTUBE_API || 'AIzaSyDapLsxCY2_mYSOmnloFBFGfljFm7Gmk24';
const channelId = 'UCzSIRGuUOwj6lTucIIh7h5Q';
const youtube = axios.create({ baseURL: 'https://www.googleapis.com/youtube/v3/', params: { part: 'snippet', key } });

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = youtube;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

const fetchPlaylists = async () => {
  try {
    const params = {
      channelId,
      maxResults: 50,
    };

    const res = await youtube.get('/playlists', { params });
    const items = res.data.items as Playlist[];

    const playlists = items.filter((playlist) => !playlist.snippet.title
      .toLowerCase()
      .includes('distribution'));
    return playlists;
  } catch (error) {
    return 'error';
  }
};

const fetchMusics = async (playlistId: string) => {
  try {
    const params = {
      playlistId,
      maxResults: 50,
    };

    const res = await youtube.get('/playlistItems', { params });
    const { items } = res.data;
    return items;
  } catch (error) {
    return error;
  }
};

export { youtube, fetchMusics, fetchPlaylists };
