<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="bg-blue-600 text-white p-4 shadow-lg">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">Fullstack Template</h1>
        <div class="space-x-4">
          <RouterLink 
            to="/" 
            class="hover:text-blue-200 transition-colors"
            active-class="text-blue-200 font-semibold"
          >
            Home
          </RouterLink>
          <RouterLink 
            to="/websocket" 
            class="hover:text-blue-200 transition-colors"
            active-class="text-blue-200 font-semibold"
          >
            WebSocket Demo
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <div class="min-h-screen bg-gray-50">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
