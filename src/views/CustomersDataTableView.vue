<template>
  <v-data-table-server
    loading-text="Loading... Please wait"
    :items-per-page="options.itemsPerPage"
    :headers="headers"
    :items="customers"
    :items-length="totalItems"
    :loading="loading"
    :search="search"
    item-value="uuid"
    @update:options="onOptionsUpdate"
  >
    <template v-slot:[`item.marketing_preferences`]="{ item }">
      <v-chip :color="item.marketing_preferences === 'Yes' ? 'green' : 'orange'" dark>
        {{ item.marketing_preferences }}
      </v-chip>
    </template>
  </v-data-table-server>
  <v-overlay :value="loading.value">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useCustomerStore } from '@/stores/customer'
import debounce from 'lodash/debounce'

const headers = ref([
  { title: 'Name', value: 'name' },
  { title: 'Email', value: 'email' },
  { title: 'Phone', value: 'phone' },
  { title: 'Address', value: 'address' },
  { title: 'Date Created', value: 'date_created' },
  { title: 'Marketing Preferences', value: 'marketing_preferences' }
])

const search = ref('')
const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  sortDesc: [],
  search: search.value
})

const customerStore = useCustomerStore()
const customers = ref([])
const totalItems = ref(0)
const loading = ref(false)

const loadItems = async () => {
  loading.value = true
  await customerStore.fetchCustomers(options.value)
  customers.value = customerStore.customers.map((customer) => ({
    ...customer,
    name: `${customer.first_name} ${customer.last_name}`,
    phone: customer.phone_number,
    date_created: new Date(customer.created_at).toLocaleString(),
    marketing_preferences: customer.is_marketing ? 'Yes' : 'No'
  }))
  totalItems.value = customerStore.totalItems
  loading.value = false
}

const debouncedLoadItems = debounce(loadItems, 300)

const onOptionsUpdate = (newOptions: any) => {
  options.value = { ...options.value, ...newOptions }
  loadItems()
}

watch([search], () => {
  options.value.search = search.value
  debouncedLoadItems()
})

onMounted(() => {
  loadItems()
})
</script>
