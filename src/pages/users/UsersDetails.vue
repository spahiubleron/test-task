<template>
  <div v-if="details">
    <v-row align="center" class="mb-1">
      <v-col cols="auto">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <div class="text-h4">{{ details.title }}</div>
      </v-col>
    </v-row>

    <v-card class="mx-auto" max-width="auto">

      <v-tabs v-model="tab" align-tabs="center" bg-color="primary" stacked>
        <v-tab value="tab-1">
          <v-icon icon="mdi-account-box"></v-icon>

          User Information
        </v-tab>

        <v-tab value="tab-2">
          <v-icon icon="mdi-cog"></v-icon>

          Company
        </v-tab>

      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item value="tab-1" class="mt-2">
          <user-info :user-info-items="userDataItems" />
        </v-tabs-window-item>
        <v-tabs-window-item value="tab-2" class="mt-2">
          <user-company :user-company-items="userCompanyItems" />
        </v-tabs-window-item>
      </v-tabs-window>

      <v-divider></v-divider>

    </v-card>
  </div>
  <div v-else>Loading details...</div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { UsersService } from "@/services/users.service";
import router from "@/router";
const usersService = new UsersService();
const route = useRoute();

const tab = ref(null);
const details: any = ref(null);
const userCompanyItems: any = ref([]);
const userDataItems: any = ref([]);

onMounted(async () => {
  const id = route.params.id;
  if (id) {
    try {
      const response = await usersService.getById(id);
      details.value = response;
      if (details.value && details.value.company) {
        const company = details.value.company;
        setupUserCompanyItems(company);
      }
      if (details.value && details.value) {
        const userData = details.value;
        setupUserDataItems(userData);
      }
    } catch (error) {
      console.error("Failed to load:", error);
    }
  }
});

const goBack = () => {
  router.go(-1);
};

function setupUserCompanyItems(company: any) {
  userCompanyItems.value = [
    { title: "Name", value: company.name, icon: "mdi-account" },
    { title: "Catch Phrase", value: company.catchPhrase, icon: "mdi-account" },
    { title: "BS", value: company.bs, icon: "mdi-email" },
  ];
}

function setupUserDataItems(userData: any) {
  userDataItems.value = [
    { title: "Full Name", value: userData.name, icon: "mdi-road" },
    { title: "Username", value: userData.username, icon: "mdi-road" },
    { title: "Street", value: userData.address.street, icon: "mdi-road" },
    { title: "City", value: userData.address.city, icon: "mdi-city" },
    { title: "Suite", value: userData.address.suite, icon: "mdi-map-marker" },
    { title: "Zip Code", value: userData.address.zipcode, icon: "mdi-zip-box" },
    { title: "Geo", value: userData.address.geo.lat + ", " + userData.address.geo.lng, icon: "mdi-flag" },
  ];
}
</script>
