<template>
  <b-nav card-header tabs>
    <router-link
      v-for="(route, idx) in routes"
      :key="idx"
      :to="route.path"
      custom
      v-slot="{ navigate, isActive }"
    >
      <b-nav-item
        v-if="idx < routes.length - 1"
        :active="isActive"
        @click="navigate"
      >
        {{ route.label }}
      </b-nav-item>
    </router-link>
  </b-nav>
</template>

<script>
import { routes } from "../../routes";
export default {
  name: "app-header",
  data() {
    return {
      routes,
    };
  },
};
</script>
