<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex align-center justify-center" fluid>
        <v-row justify="center">
          <v-col cols="12" md="4">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
