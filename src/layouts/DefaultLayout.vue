<script setup lang="ts">
import NavDrawer from '../components/NavDrawer.vue'
import AppBar from '../components/AppBar.vue'
</script>

<template>
  <v-responsive class="border rounded">
    <v-app>
      <AppBar />
      <NavDrawer />
      <v-main>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style scoped></style>
