<template>
  <span class="text-h6 ml-4">User Information</span>

  <v-list class="responsive-grid" dense>
    <v-list-item
      class="grid-item"
      v-for="(item, i) in userInfoItems"
      :key="i"
      :subtitle="item.value"
      :title="item.title"
    >
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          <v-icon color="white">{{ item.icon }}</v-icon>
        </v-avatar>
      </template>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

type UserInfoItem = {
  title: string;
  value: string;
  icon: string;
};

const props = defineProps<{
  userInfoItems: UserInfoItem[];
}>();
</script>

<style scoped>
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 10px;
}

@media (min-width: 600px) {
  /* Adjust breakpoint as needed */
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns in desktop */
  }
}

@media (max-width: 599px) {
  /* Adjust breakpoint as needed */
  .responsive-grid {
    grid-template-columns: 1fr; /* 1 column in mobile */
  }
}
</style>
