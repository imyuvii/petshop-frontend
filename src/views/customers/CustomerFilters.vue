<template>
  <v-row v-if="showFilters" class="absolute-filters grey lighten-3 pa-4">
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        v-model="filters.name"
        label="Customer Name"
        append-inner-icon="mdi-magnify"
        density="compact"
        variant="solo"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        v-model="filters.email"
        label="Customer Email"
        append-inner-icon="mdi-magnify"
        density="compact"
        variant="solo"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        v-model="filters.phone"
        label="Customer Phone"
        append-inner-icon="mdi-magnify"
        density="compact"
        variant="solo"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="4">
      <v-text-field
        v-model="filters.address"
        label="Customer Address"
        append-inner-icon="mdi-magnify"
        density="compact"
        variant="solo"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="2">
      <v-date-input
        v-model="filters.created_at"
        label="Created Date"
        variant="solo"
        density="compact"
      ></v-date-input>
    </v-col>
    <v-col cols="12" sm="6" md="2">
      <v-select
        v-model="filters.marketing_preferences"
        :items="[
          { title: 'Yes', value: 1 },
          { title: 'No', value: 0 }
        ]"
        label="Marketing"
        density="compact"
        variant="solo"
      ></v-select>
    </v-col>
    <v-col cols="12" sm="6" md="2">
      <v-btn @click="$emit('resetFilters')">Reset</v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { VDateInput } from 'vuetify/labs/VDateInput'

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({})
  },
  showFilters: Boolean
})


const { filters, showFilters } = toRefs(props)
</script>

<style scoped>
.absolute-filters {
  background-color: #f5f5f5; /* Match the v-card header color */
}
</style>
