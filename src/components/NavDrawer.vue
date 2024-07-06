<template>
  <v-navigation-drawer app permanent color="primary-lighten-1">
    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :prepend-icon="item.icon"
        :to="item.route"
        :title="item.title"
        :value="item.title.toLowerCase()"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const items = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
  { title: 'Customers', icon: 'mdi-account', route: '/customers' }
]
</script>
