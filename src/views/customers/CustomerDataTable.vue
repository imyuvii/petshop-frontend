<template>
  <v-card class="position-relative">
    <v-toolbar flat>
      <v-toolbar-title>All Customers</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/customers/create"> <v-icon>mdi-plus</v-icon> Add Customer </v-btn>
      <v-btn @click="showFilters = !showFilters">
        <v-icon>mdi-filter-variant</v-icon> Filters
      </v-btn>
    </v-toolbar>

    <CustomerFilters :filters="filters" :showFilters="showFilters" @resetFilters="resetFilters" />

    <v-data-table-server
      loading-text="Loading... Please wait"
      :items-per-page="options.itemsPerPage"
      :headers="headers"
      :items="customers"
      :items-length="totalItems"
      :loading="loading"
      item-value="uuid"
      @update:options="onOptionsUpdate"
    >
      <template v-slot:[`item.marketing_preferences`]="{ item }">
        <v-chip :color="item.marketing_preferences === 'Yes' ? 'green' : 'orange'" dark>
          {{ item.marketing_preferences }}
        </v-chip>
      </template>
    </v-data-table-server>
  </v-card>
  <v-overlay :value="loading.value">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useCustomerStore } from '@/stores/customer'
import debounce from 'lodash/debounce'
import CustomerFilters from '@/views/customers/CustomerFilters.vue'

const headers = ref([
  { title: 'Name', value: 'name' },
  { title: 'Email', value: 'email' },
  { title: 'Phone', value: 'phone' },
  { title: 'Address', value: 'address' },
  { title: 'Date Created', value: 'created_at' },
  { title: 'Marketing Preferences', value: 'marketing_preferences' }
])

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  sortDesc: []
})

const showFilters = ref(false)

const defaultFilters = {
  name: '',
  email: '',
  phone: '',
  address: '',
  created_at: null,
  marketing_preferences: ''
}

const filters = ref({ ...defaultFilters })

const resetFilters = () => {
  filters.value = { ...defaultFilters }
  debouncedLoadItems()
}

const customerStore = useCustomerStore()
const customers = ref([])
const totalItems = ref(0)
const loading = ref(false)

const formatDate = (date) => {
  if (!date) return null
  const d = new Date(date)
  const year = d.getFullYear()
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

const loadItems = async () => {
  loading.value = true
  const queryParams = {
    page: options.value.page,
    itemsPerPage: options.value.itemsPerPage,
    sortBy: options.value.sortBy,
    sortDesc: options.value.sortDesc,
    name: filters.value.name,
    email: filters.value.email,
    phone: filters.value.phone,
    address: filters.value.address,
    created_at: formatDate(filters.value.created_at),
    marketing: filters.value.marketing_preferences
  }
  await customerStore.fetchCustomers(queryParams)
  customers.value = customerStore.customers.map((customer) => ({
    ...customer,
    name: `${customer.first_name} ${customer.last_name}`,
    phone: customer.phone_number,
    created_at: new Date(customer.created_at).toLocaleString(),
    marketing_preferences: customer.is_marketing ? 'Yes' : 'No'
  }))
  totalItems.value = customerStore.totalItems
  loading.value = false
}

const debouncedLoadItems = debounce(loadItems, 300)

const onOptionsUpdate = (newOptions) => {
  options.value = { ...options.value, ...newOptions }
  loadItems()
}

const filteredParams = computed(() => ({
  name: filters.value.name,
  email: filters.value.email,
  phone: filters.value.phone,
  address: filters.value.address,
  created_at: filters.value.created_at,
  marketing: filters.value.marketing_preferences
}))

watch(filteredParams, debouncedLoadItems)

onMounted(() => {
  loadItems()
})
</script>
