<template>
  <v-card>
    <v-card-title>Latest sales</v-card-title>
    <v-data-table :items="sales" :headers="headers">
      <template v-slot:[`item.status`]="{ item }">
        <v-chip :color="statusColors[item.status]" dark>{{ item.status }}</v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const headers = ref([
  { title: 'Order UUID', value: 'uuid', sortable: true },
  { title: 'Status', value: 'status', sortable: true },
  { title: '# Ordered Products', value: 'products', sortable: true },
  { title: 'Customer', value: 'customer', sortable: true },
  { title: 'Amount', value: 'amount', sortable: true }
])

const sales = ref([
  {
    uuid: '083d0036-9616-31fe-9b03-46e51ad2e1c',
    status: 'Open',
    products: 3,
    customer: 'John Robinson',
    amount: '$ 39.97'
  },
  {
    uuid: '083d0036-9616-31fe-9b03-46e51ad2e1c2',
    status: 'Pending payment',
    products: 2,
    customer: 'Michael Hurley',
    amount: '$ 12'
  },
  {
    uuid: '083d0036-9616-31fe-9b03-46e51ad2e1c2',
    status: 'Paid',
    products: 1,
    customer: 'Ricardo Matterson',
    amount: '$ 60'
  },
  {
    uuid: '083d0036-9616-31fe-9b03-46e51ad2e1c2',
    status: 'Shipped',
    products: 1,
    customer: 'John Robinson',
    amount: '$ 7'
  },
  {
    uuid: '083d0036-9616-31fe-9b03-46e51ad2e1c2',
    status: 'Cancelled',
    products: 1,
    customer: 'Michael Hurley',
    amount: '$ 14'
  }
])
interface StatusColors {
  [key: string]: string
}
const statusColors: StatusColors = {
  Open: 'blue',
  'Pending payment': 'orange',
  Paid: 'green',
  Shipped: 'teal',
  Cancelled: 'red'
}
</script>
