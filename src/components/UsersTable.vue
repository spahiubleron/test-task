<template>
  <v-card flat>
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-account-group"></v-icon> &nbsp;
      Users
      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>

    <v-divider></v-divider>
    <v-data-table-server
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="serverItems"
      :items-length="totalItems"
      :loading="loading"
      :search="search"
      item-value="name"
      @update:options="loadItems"
      mobile-breakpoint="600"
      dense
      hover
    >
      <template v-slot:item="{ item, props }">
        <tr v-bind="props" @click="openDetails(item)" style="cursor: pointer">
          <td>{{ item.name }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.company?.name }}</td>
        </tr>
      </template>
    </v-data-table-server>
  </v-card>
</template>

<script lang="ts" setup>
import router from "@/router";
import { ref, watch, onMounted, toRaw } from "vue";
import { UsersService } from "../services/users.service";
import RouteNameEnum from '../common/route'

const usersService = new UsersService();
const itemsPerPage = ref(10);
const serverItems = ref([]);
const totalItems = ref(0);
const loading = ref(false);
const search = ref("");

const headers = ref([
  { title: "Name", align: "start", value: "name", sortable: true },
  { title: "Email", value: "email", sortable: true },
  { title: "Phone", value: "phone", sortable: false },
  { title: "Company", value: "company.name", sortable: false }
]);

const loadItems = async (options: any) => {
  const rawSortBy = toRaw(options.sortBy);
  loading.value = true;
  try {
    const data = await usersService.getAll({
      page: options.page,
      itemsPerPage: options.itemsPerPage,
      search: search.value,
      sortBy: rawSortBy
    });
    serverItems.value = data;

    if (totalItems.value === 0) {
      totalItems.value = await usersService.fetchTotalCount();
    }
  } catch (error) {
    console.error("Failed to fetch items:", error);
  } finally {
    loading.value = false;
  }
};

const openDetails = (item: any) => {
  console.log('Opening details for:', item);
  if (item && item.id) {
    router.push({ name: RouteNameEnum.UsersDetails, params: { id: item.id } });
  }
}

// Initial fetch for total count
onMounted(async () => {
  await loadItems({ page: 1, itemsPerPage: itemsPerPage.value, sortBy: [], sortDesc: [], search: '' });
});
</script>
