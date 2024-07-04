<template>
  <v-app-bar app color="primary" flat>
    <v-spacer />
    <v-toolbar-title
      ><router-link to="/"
        ><img src="@/assets/logo.svg" alt="Logo" class="logo" height="25" /></router-link
    ></v-toolbar-title>
    <v-spacer />
    <v-btn to="/products" class="mx-2" color="white"> PRODUCTS </v-btn>
    <v-btn to="/promotions" class="mx-2" color="white"> PROMOTIONS </v-btn>
    <v-btn to="/blog" class="mx-2" color="white"> BLOG </v-btn>
    <v-spacer />
    <v-btn color="white"> <v-icon>mdi-cart</v-icon> Cart </v-btn>
    <v-btn color="white" @click="logout"> <v-icon>mdi-logout</v-icon> Logout </v-btn>
    <v-spacer />
  </v-app-bar>
</template>
<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
  await authStore.logout()
  await router.push('/login')
}
</script>
