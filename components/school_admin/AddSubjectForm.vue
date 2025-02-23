<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";

interface ClassState {
  id: number;
  name: string;
  divisions: { id: number; name: string }[];
}

interface SubjectState {
  name: string;
  class_id: number;
}

const classes = ref<ClassState[]>([]);
const selectedClass = ref<ClassState | null>(null);
const subjectState = reactive<SubjectState[]>([]);

onMounted(async () => {
  const response = await $fetch('/api/school/7/classes/get-class/');
  classes.value = response as ClassState[];
});

const handleClassSelect = (selectedId: string) => {
  const selectedinnerClass = classes.value.find(classItem => classItem.id === parseInt(selectedId));
  if (selectedinnerClass) {
    selectedClass.value = selectedinnerClass;
  }
};

const handleSubmit = async () => {
  try {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') as string);
    const class_id = selectedClass.value?.id;

    const subjects = subjectState.map((subject) => ({
      name: subject.name,
      class_id: class_id,
    }));

    const response = await $fetch(`/api/school/7/classes/${class_id}/add-subjects/`, {
      method: 'POST',
      body: JSON.stringify({ subjects }),
    });
    console.log('Subjects added successfully:', response);
  } catch (error) {
    console.error('Error adding subjects:', error);
  }
};

const addSubject = () => {
  subjectState.push({ name: '', class_id: 0 });
};

const removeSubject = (index: number) => {
  subjectState.splice(index, 1);
};
</script>

<template>
  <UCard :ui="{ divide: 'divide-y divide-gray-100', ring: '', shadow: 'shadow-xl' }">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">Add Subjects to Class</h3>
        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="$emit('closeModal')"/>
      </div>
    </template>
    <div class="space-y-4">
      <UFormGroup label="Select Class">
        <select v-model="selectedClass" @change="$event.target && handleClassSelect(($event.target as HTMLSelectElement).value)">
          <option v-for="classItem in classes" :key="classItem.id" :value="classItem">{{ classItem.name }}</option>
        </select>
      </UFormGroup>
      <div v-if="selectedClass">
        <UFormGroup label="Add Subjects">
          <div v-for="(subject, index) in subjectState" :key="index" class="flex items-center space-x-2">
            <UInput v-model="subject.name" :placeholder="`Enter Subject ${index + 1}`"/>
            <UButton color="red" variant="ghost" icon="i-heroicons-trash" size="sm" @click="removeSubject(index)"/>
          </div>
        </UFormGroup>
        <UButton color="green" variant="ghost" icon="i-heroicons-plus" size="sm" @click="addSubject">Add Subject</UButton>
        <UButton type="submit" color="primary" @click="handleSubmit">Add Subjects</UButton>
      </div>
    </div>
  </UCard>
</template>

<style scoped>
</style>