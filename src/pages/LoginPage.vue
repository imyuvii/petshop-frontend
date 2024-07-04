<template>
  <v-card class="pa-5 text-center">
    <v-card-title class="d-flex justify-center">
      <div class="logo-container">
        <img src="@/assets/logo.svg" alt="Logo" class="logo" />
      </div>
    </v-card-title>
    <v-card-subtitle class="text-center">Log In</v-card-subtitle>
    <v-card-text>
      <v-form @submit.prevent="login">
        <v-text-field label="Email" v-model="email" type="email" required></v-text-field>
        <v-text-field label="Password" v-model="password" type="password" required></v-text-field>
        <v-btn :loading="loading" color="primary" block type="submit">Log In</v-btn>
        <v-alert v-if="errorMessage" class="mt-6" type="error">{{ errorMessage }}</v-alert>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()
const errorMessage = ref('')
const loading = ref(false)

const login = async () => {
  errorMessage.value = ''
  loading.value = true
  const success = await authStore.login(email.value, password.value)
  loading.value = false
  if (success) {
    await router.push('/')
  } else {
    // Handle login failure
    errorMessage.value = 'Login failed. Please check your email and password.'
  }
}
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
.pa-5 {
  padding: 20px;
}
.logo-container {
  width: 80px;
  height: 80px;
  background-color: #4ec690; /* Primary color */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo {
  width: 48px;
  height: auto;
}
</style>
