<script setup lang="ts">
import { reactive, defineProps } from "vue";

interface FormState {
  name: string;
  divisions: { name: string }[];
}

const formState = reactive<FormState>({
  name: '',
  divisions: [{ name: '' }],
});

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') as string);
    console.log("hi")
    const user_id = 2;
    // const requestBody = {
    //   class_data: {
    //     name: formState.name,
    //     divisions: formState.divisions
    //   },
    //   user_id: user_id
    // };
    const class_data = {
      name: formState.name,
      divisions: formState.divisions,
      user_id: user_id
    }

    const response = await $fetch('/api/school-admin/add-class/', {
      method: 'POST',
      body: JSON.stringify({class_data :class_data,user_id: user_id}),
    })
    // const response = await $fetch('/api/school-admin/add-class/', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     class_data: {
    //       name: formState.name,
    //       divisions: formState.divisions
    //     },
    //     user_id: user_id
    //   })
    // });
    console.log('Class added successfully:', response);
  } catch (error) {
    console.error('Error adding class:', error);
  }
}
</script>

<template>
  <UCard :ui="{ divide: 'divide-y divide-gray-100', ring: '', shadow: 'shadow-xl' }">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Add New Class</h3>
        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="$emit('closeModal')"/>
      </div>
    </template>
    <UForm :state="formState" class="space-y-4" @submit="handleSubmit">
      <UFormGroup label="Class Name">
        <UInput v-model="formState.name" :placeholder="`Enter Class name`"/>
      </UFormGroup>
      <UFormGroup label="Class Divisions">
        <div class="space-y-2">
          <div v-for="(division, index) in formState.divisions" :key="index" class="flex items-center space-x-2">
            <UInput v-model="division.name" :placeholder="`Enter Division ${index + 1}`"/>
            <UButton color="red" variant="ghost" icon="i-heroicons-trash" size="sm" @click="formState.divisions.splice(index, 1)"/>
            <UButton color="green" variant="ghost" icon="i-heroicons-plus" size="sm" @click="formState.divisions.push({ name: '' })"/>
          </div>
        </div>
      </UFormGroup>
      <div class="flex justify-end space-x-3 pt-4">
        <UButton color="white" @click="$emit('closeModal')">Cancel</UButton>
        <UButton type="submit" color="primary">Add class</UButton>
      </div>
    </UForm>
  </UCard>
</template>

<style scoped>
</style>