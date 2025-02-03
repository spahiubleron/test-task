
<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="[icon, text, route] in links"
          :key="text"
          link
          :to="{ name: route }"
          exact
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Test task B.S</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import RouteNameEnum from '../common/route'
const drawer = ref(false);
const links = ref([["mdi-account-group", "Users", RouteNameEnum.Users]]);

const toggleDrawer = () => {
    drawer.value = !drawer.value;
}
</script>
