<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import { defineEmits } from 'vue';

const emit = defineEmits();

function emitCloseModalEvent() {
  emit('close-modal-event', 'close modal');
}
const router = useRouter();

const school = ref({
  name: '',
  address: '',
  phone_number: '',
});

const admin = ref({
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  role: 'school_admin',
});

const handleSubmit = async () => {
  try {
    const response = await $fetch('/api/admin/add-school', {
      method: 'POST',
      body: JSON.stringify({
        school: school.value,
        admin: admin.value,
      }),
    });

    console.log('School and admin added successfully:', response);

    // school.value = {name: '', address: '', phone_number: ''};
    // admin.value = {firstname: '', lastname: '', email: '', password: '', role: 'school_admin'};

    alert('School and admin added successfully!');

    // router.push('/schools');
  } catch (error) {
    console.error('Error adding school and admin:', error);
    alert('Error adding school and admin. Please try again.');
  }
};
</script>

<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-90 overflow-y-auto h-full w-full flex items-center justify-center">
    <div class="border-4 px-2 py-2">
      <h1 class="text-2xl font-semibold text-center">Add New School and Admin</h1>

      <form @submit.prevent="handleSubmit"
            class=" text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
        <h2 class="text-xl font-medium">School Details</h2>
        <div class="">
          <input v-model="school.name" autocomplete="off" id="school_name" name="school_name"
                 type="text"
                 class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                 placeholder="School Name" required/>
          <label for="school_name"
                 class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">School
            Name</label>
        </div>
        <div class="">
          <input v-model="school.address" autocomplete="off" id="address" name="address"
                 type="text"
                 class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                 placeholder="Address"/>
          <label for="address"
                 class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Address</label>
        </div>
        <div class="">
          <input v-model="school.phone_number" autocomplete="off" id="phone_number"
                 name="phone_number" type="tel"
                 class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                 placeholder="Phone Number"/>
          <label for="phone_number"
                 class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Phone
            Number</label>
        </div>

        <h2 class="text-xl font-medium mt-8">School Admin Details</h2>
        <div class="">
          <input v-model="admin.firstname" autocomplete="off" id="admin_firstname"
                 name="admin_firstname" type="text"
                 class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                 placeholder="First Name" required/>
          <label for="admin_firstname"
                 class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">First
            Name</label>
        </div>
        <div class="">
          <input v-model="admin.lastname" autocomplete="off" id="admin_lastname"
                 name="admin_lastname" type="text"
                 class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                 placeholder="Last Name" required/>
          <label for="admin_lastname"
                 class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Last
            Name</label>
        </div>
        <div class="">
          <input v-model="admin.email" autocomplete="off" id="admin_email" name="admin_email"
                 type="email"
                 class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                 placeholder="Email" required/>
          <label for="admin_email"
                 class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email</label>
        </div>
        <div class="">
          <input v-model="admin.password" autocomplete="new-password" id="admin_password"
                 name="admin_password" type="password"
                 class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                 placeholder="Password" required/>
          <label for="admin_password"
                 class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
        </div>
        <div class="">
          <button type="submit"
                  class="bg-cyan-500 text-white rounded-md px-4 py-2 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50 w-full">
            Add School and Admin
          </button>
        </div>
      </form>
      <br/>
      <hr/>
      <div class="row-span-2 py-2">
        <div></div>
        <div class="flex justify-end">
          <button @click="emitCloseModalEvent" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>