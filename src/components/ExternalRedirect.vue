<template>
  <div>Redirecting...</div>
</template>

<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ url: string }>()
const router = useRouter()

onMounted(() => {
  if (props.url) {
    window.location.href = props.url
  } else {
    router.replace('/')
  }
})
</script>
