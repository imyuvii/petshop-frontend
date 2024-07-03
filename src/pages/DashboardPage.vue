<template>
  <v-row>
    <v-col cols="12">
      <MonthlySales />
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>$ 2.405</v-card-title>
        <v-card-subtitle>Total Earnings</v-card-subtitle>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>30</v-card-title>
        <v-card-subtitle>Orders this Month</v-card-subtitle>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card>
        <v-card-title>$ 1.224</v-card-title>
        <v-card-subtitle>Potential Earnings</v-card-subtitle>
      </v-card>
    </v-col>
    <v-col cols="12">
      <DataTable />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import MonthlySales from '../components/MonthlySalesChart.vue'
import DataTable from '../components/DataTable.vue'
</script>
