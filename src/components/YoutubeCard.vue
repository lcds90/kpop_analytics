<script setup lang="ts">
defineProps({
  src: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="q-pa-md">
    <q-card class="my-card">
      <q-parallax
        :src="src"
        :height="150"
      />

      <q-card-section>
        <div class="text-h6">
          Our Changing Planet
        </div>
        <div class="text-subtitle2">
          by John Doe
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
