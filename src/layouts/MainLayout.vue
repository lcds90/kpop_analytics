<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      reveal
      bordered
      class="bg-primary text-white"
      height-hint="98"
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title />
        <div>
          <q-avatar>
            <img src="https://cdn-icons-png.flaticon.com/512/4784/4784174.png">
          </q-avatar>
          <em class="q-ml-sm">k-pop analytics</em>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header>
          Aplicação
        </q-item-label>
        <q-tabs vertical>
          <EssentialLink
            v-for="link in internalLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-tabs>
      </q-list>
      <hr>
      <q-list>
        <q-item-label header>
          Links externos
        </q-item-label>
        <q-tabs vertical>
          <EssentialLink
            v-for="link in externalLinks"
            :key="link.title"
            v-bind="link"
          />
        </q-tabs>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <q-page-sticky
        position="bottom-right"
        :offset="[14, 14]"
      >
        <q-fab
          color="amber"
          text-color="black"
          icon="keyboard_arrow_left"
          direction="left"
        >
          <q-fab-action
            color="amber"
            text-color="black"
            icon="mail"
          />
          <q-fab-action
            color="amber"
            text-color="black"
            icon="alarm"
          />
        </q-fab>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const internalLinks = [
  {
    title: 'Home',
    caption: 'Homepage',
    icon: 'home',
    link: '/',
    isExternal: false,
  },
];

const externalLinks = [
  {
    title: 'Github',
    caption: 'Meu github pessoal',
    icon: 'code',
    link: 'https://github.com/lcds90',
    isExternal: true,
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      externalLinks,
      internalLinks,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
