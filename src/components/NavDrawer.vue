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
  { title: 'All tickets', icon: 'mdi-ticket', route: '/all-tickets' },
  { title: 'Shipment Locator', icon: 'mdi-map-marker', route: '/shipment-locator' },
  { title: 'Customers', icon: 'mdi-account', route: '/customers' },
  { title: 'Products', icon: 'mdi-cube', route: '/products' }
]
</script>
