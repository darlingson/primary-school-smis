<template>
  <div class="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6">
    <!-- Page Heading -->
    <h1 class="text-2xl font-bold text-center text-333333">Login</h1>

    <!-- Login Form -->
    <form @submit.prevent="handleLogin" class="space-y-6">
      <!-- Email Field -->
      <div>
        <label
            for="email"
            class="block text-sm font-semibold mb-2"
            style="color: #333333; font-family: 'Open Sans', sans-serif;"
        >
          Email
        </label>
        <input
            id="email"
            type="email"
            v-model="email"
            required
            class="w-full border border-f1c40f focus:ring focus:ring-3498db px-4 py-3 rounded-md shadow-sm"
            style="font-family: 'Open Sans', sans-serif; color: #333333; font-size: 14px;"
        />
      </div>

      <!-- Password Field -->
      <div>
        <label
            for="password"
            class="block text-sm font-semibold mb-2"
            style="color: #333333; font-family: 'Open Sans', sans-serif;"
        >
          Password
        </label>
        <input
            id="password"
            type="password"
            v-model="password"
            required
            class="w-full border border-f1c40f focus:ring focus:ring-3498db px-4 py-3 rounded-md shadow-sm"
            style="font-family: 'Open Sans', sans-serif; color: #333333; font-size: 14px;"
        />
      </div>

      <!-- Submit Button -->
      <button
          type="submit"
          class="w-full text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-600 focus:ring focus:ring-f1c40f transition-transform transform hover:scale-105"
          style="font-family: 'Open Sans', sans-serif; font-size: 18px;  background-color: #3498db"
      >
        Login
      </button>
    </form>

    <!-- Sign-Up Link -->
    <p
        class="text-center text-sm"
        style="color: #333333; font-family: 'Open Sans', sans-serif; font-size: 14px;"
    >
      Don't have an account?
      <NuxtLink
          to="/signup"
          class="font-semibold hover:underline"
          style="color: #3498db;"
      >
        Sign up
      </NuxtLink>
    </p>
  </div>
</template>

<script setup>
const email = ref('');
const password = ref('');

const users = [
  {
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin'
  },
  {
    email: 'teacher@example.com',
    password: 'password123',
    role: 'teacher'
  },
  {
    email: 'student@example.com',
    password: 'password123',
    role: 'student'
  },
  {
    email: 'parent@example.com',
    password: 'password123',
    role: 'parent'
  },
  {
    email: 'school_admin@example.com',
    password: 'password123',
    role: 'school_admin'
  }
];

const handleLogin = async () => {
  console.log('Login:', { email: email.value, password: password.value });
  //check for the credentials in the users array and navigate to the appropriate page
  const user = users.find((u) => u.email === email.value && u.password === password.value);
  if (user) {
    navigateTo(`/dashboard/${user.role}`);
  }
};
</script>

<style>
/* Ensuring Open Sans font is applied globally (if not already included in Tailwind) */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
</style>
