<template>
  <v-card>
    <v-card-title>
      <span class="headline">Login</span>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Username"
          v-model="username"
          prepend-icon="mdi-account"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          v-model="password"
          prepend-icon="mdi-lock"
          type="password"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="login">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const username = ref('')
const password = ref('')

const login = () => {
  // Implement login logic here
  console.log('Username:', username.value)
  console.log('Password:', password.value)
}
</script>
