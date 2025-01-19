<template>
  <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
    <h1 class="text-2xl font-bold text-center mb-6">Sign Up</h1>
    <form @submit.prevent="handleSignup" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">FirstName</label>
        <input type="text" v-model="firstname" required class="input-field" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700">FirstName</label>
        <input type="text" v-model="lastname" required class="input-field" />
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
import useRouter from 'vue-router'
import { ref } from 'vue';
const firstname = ref('')
const lastname = ref('')
const email = ref('')
const role = ref('')
const password = ref('')

const router = useRouter()

const handleSignup = async () => {
  try {
    const { data, error } = await useFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        firstname: firstname.value,
        lastname: lastname.value,
        role: role.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (error.value) {
      console.error('Signup failed:', error.value.data);
      alert(error.value.data?.statusMessage || 'Login failed. Please try again.');
      return;
    }

    if (data.value) {
      const { token, user } = data.value;
      // Save token to local storage or a cookie
      localStorage.setItem('token', token);
      console.log('Login successful:', user);

      // Redirect based on user role
      // await router.push(`/dashboard/${user.role}`);
      await router.push(`/login`);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    alert('An unexpected error occurred. Please try again.');
  }
}
</script>