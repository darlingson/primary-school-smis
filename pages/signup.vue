<template>
  <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
    <h1 class="text-2xl font-bold text-center mb-6">Sign Up</h1>
    <form @submit.prevent="handleSignup" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Full Name</label>
        <input type="text" v-model="name" required class="input-field" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" v-model="email" required class="input-field" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Role</label>
        <select v-model="role" required class="input-field">
          <option value="admin">System Admin</option>
          <option value="school_admin">School Administrator</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
          <option value="parent">Parent</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" v-model="password" required class="input-field" />
      </div>
      <button type="submit" class="w-full btn-primary">Sign Up</button>
    </form>
    <p class="mt-4 text-center text-sm text-gray-600">
      Already have an account?
      <NuxtLink to="/login" class="text-blue-600 hover:underline">Login</NuxtLink>
    </p>
  </div>
</template>

<script setup>
const name = ref('')
const email = ref('')
const role = ref('')
const password = ref('')

const handleSignup = async () => {
  // Implement signup logic
  console.log('Signup:', {
    name: name.value,
    email: email.value,
    role: role.value,
    password: password.value
  })
}
</script>