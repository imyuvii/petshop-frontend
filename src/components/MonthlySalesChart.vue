<template>
  <v-card>
    <v-card-title>Monthly sales</v-card-title>
    <v-card-subtitle>Dashboard</v-card-subtitle>
    <apexchart type="line" :options="chartOptions" :series="series" height="300"></apexchart>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const series = ref([
  {
    name: 'Sales',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  }
])

const chartOptions = ref({
  chart: {
    height: 350,
    type: 'line'
  },
  title: {
    text: 'Monthly sales'
  },
  xaxis: {
    categories: ['1.7', '2.7', '3.7', '4.7', '5.7', '6.7', '7.7', '8.7', '9.7']
  }
})
</script>
