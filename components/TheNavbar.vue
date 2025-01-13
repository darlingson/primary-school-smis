<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <NuxtLink to="/" class="flex items-center">
            <span class="text-xl font-bold text-blue-600">Primary School SMIS</span>
          </NuxtLink>
        </div>
        <div class="flex items-center space-x-4">
          <NuxtLink v-if="!isAuthenticated" to="/login" class="btn-primary">Login</NuxtLink>
          <NuxtLink v-if="!isAuthenticated" to="/signup" class="btn-primary">Sign Up</NuxtLink>
          <button v-else @click="logout" class="btn-primary">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const isAuthenticated = ref(false)

const logout = () => {
  // Implement logout logic
  navigateTo('/login')
}
</script>