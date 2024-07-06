<template>
  <div class="d-flex align-items-center position-relative">
    <transition name="slide-fade-left">
      <v-btn v-if="showDelete" icon class="delete-btn" @click="deleteCustomer">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </transition>
    <v-btn icon @click="toggleDelete">
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { Customer } from '@/models/Customer'

const props = defineProps<{
  item: Customer
  currentOpenButton: string | null
}>()

const emit = defineEmits(['toggle', 'delete'])

const showDelete = computed(() => props.currentOpenButton === props.item.uuid)

const toggleDelete = () => {
  emit('toggle', props.item.uuid)
}

const deleteCustomer = () => {
  emit('delete', props.item.uuid)
}
</script>

<style scoped>
.slide-fade-left-enter-active,
.slide-fade-left-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}

.slide-fade-left-enter-from,
.slide-fade-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.position-relative {
  position: relative;
}

.delete-btn {
  position: absolute;
  right: 100%;
  margin-right: 8px; /* Adjust the spacing between the buttons */
}
</style>
