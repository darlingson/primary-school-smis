<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="w-64 bg-white shadow-md">
      <div class="p-4">
        <h1 class="text-2xl font-bold text-indigo-600">School Admin</h1>
      </div>
      <nav class="mt-4">
        <a v-for="item in navItems" :key="item.name" @click="currentSection = item.name"
           class="flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-100 transition-colors duration-200"
           :class="{ 'bg-indigo-100 text-indigo-600': currentSection === item.name }">
          <component :is="item.icon" class="w-5 h-5 mr-3"/>
          {{ item.label }}
        </a>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto">
      <!-- Header -->
      <header class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h2 class="text-2xl font-semibold text-gray-800">{{ currentSection }}</h2>
          <div class="flex items-center">
            <UInput icon="i-heroicons-magnifying-glass" placeholder="Search..." class="mr-4"/>
            <UButton color="primary" @click="openModal(currentSection.toLowerCase())">
              Add New {{ currentSection }}
            </UButton>
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <UCard v-for="stat in quickStats" :key="stat.name" class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <component :is="stat.icon" class="h-6 w-6 text-gray-400"/>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">{{ stat.name }}</dt>
                    <dd class="text-lg font-semibold text-gray-900">{{ stat.value }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Data Table -->
        <UCard>
          <UTable :columns="getColumns" :rows="getData" :sort="{ column: 'id' }" hover>
            <template #actions-data="{ row }">
              <UButton color="primary" variant="ghost" icon="i-heroicons-pencil-square" size="sm" class="mr-2"/>
              <UButton color="red" variant="ghost" icon="i-heroicons-trash" size="sm"/>
            </template>
          </UTable>
        </UCard>
      </main>
    </div>

    <!-- Add Modal -->
    <UModal v-model="isModalOpen" :ui="{ width: 'sm:max-w-lg' }">
      <UCard :ui="{ divide: 'divide-y divide-gray-100', ring: '', shadow: 'shadow-xl' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Add New {{ capitalizeFirstLetter(currentSection) }}</h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark" @click="isModalOpen = false"/>
          </div>
        </template>
        <UForm :state="formState" class="space-y-4" @submit="handleSubmit">
          <UFormGroup v-for="field in formFields" :key="field" :label="capitalizeFirstLetter(field)">
            <UInput v-model="formState[field]" :placeholder="`Enter ${field}`"/>
          </UFormGroup>
          <div class="flex justify-end space-x-3 pt-4">
            <UButton color="white" @click="isModalOpen = false">Cancel</UButton>
            <UButton type="submit" color="primary">Add {{ capitalizeFirstLetter(currentSection) }}</UButton>
          </div>
        </UForm>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
import {ref, reactive, computed} from 'vue'
import {BookOpenIcon, UserIcon, ShieldCheckIcon, UsersIcon, Users, BarChart, ClipboardList,SquareActivity} from 'lucide-vue-next'

const currentSection = ref('Classes')
const isModalOpen = ref(false)

const navItems = [
  {name: "Classes", label: "Classes", icon: SquareActivity},
  {name: "Students", label: "Students", icon: Users},
  {name: 'Subjects', label: 'Subjects', icon: BookOpenIcon},
  {name: 'Teachers', label: 'Teachers', icon: UserIcon},
  {name: 'Admins', label: 'School Admins', icon: ShieldCheckIcon},
]

const quickStats = [
  {name: 'Total Students', value: '1,234', icon: Users},
  {name: 'Average Class Size', value: '24', icon: BarChart},
  {name: 'Total Teachers', value: '56', icon: UsersIcon},
  {name: 'Active Courses', value: '38', icon: ClipboardList},
]

const classes = ref([
  {id: 1, name: 'Class 1A', grade: '1st Grade', students: 25},
  {id: 2, name: 'Class 2B', grade: '2nd Grade', students: 22},
])

const subjects = ref([
  {id: 1, name: 'Mathematics', code: 'MATH101', department: 'Science'},
  {id: 2, name: 'Literature', code: 'LIT101', department: 'Humanities'},
])

const teachers = ref([
  {id: 1, name: 'John Doe', subject: 'Mathematics', experience: '5 years'},
  {id: 2, name: 'Jane Smith', subject: 'Literature', experience: '8 years'},
])

const admins = ref([
  {id: 1, name: 'Admin User', email: 'admin@school.com', role: 'Super Admin'},
])

const columns = {
  classes: [
    {key: 'name', label: 'Class Name'},
    {key: 'grade', label: 'Grade'},
    {key: 'students', label: 'Students'},
  ],
  students: [
    {key: 'firstname', label: 'firstname'},
    {key: 'lastname', label: 'lastname'},
    {key: 'email', label: 'email'},
    {key: 'date_of_birth', label: 'Date of Birth'},
    {key: 'guardian_name', label: 'Guardian Name'},
    {key: 'guardian_phone', label: 'Guardian Phone'}
  ],
  subjects: [
    {key: 'name', label: 'Subject Name'},
    {key: 'code', label: 'Subject Code'},
    {key: 'department', label: 'Department'},
  ],
  teachers: [
    {key: 'name', label: 'Teacher Name'},
    {key: 'subject', label: 'Subject'},
    {key: 'experience', label: 'Experience'},
  ],
  admins: [
    {key: 'name', label: 'Admin Name'},
    {key: 'email', label: 'Email'},
    {key: 'role', label: 'Role'},
  ],
}

const getColumns = computed(() => {
  return [
    ...columns[currentSection.value.toLowerCase()],
    {key: 'actions', label: 'Actions'},
  ]
})

const getData = computed(() => {
  switch (currentSection.value.toLowerCase()) {
    case 'classes':
      return classes.value
    case 'subjects':
      return subjects.value
    case 'teachers':
      return teachers.value
    case 'admins':
      return admins.value
    default:
      return []
  }
})

const formState = reactive({})

const formFields = computed(() => {
  return columns[currentSection.value.toLowerCase()].map(col => col.key).filter(key => key !== 'id')
})

function openModal(type) {
  currentSection.value = capitalizeFirstLetter(type)
  isModalOpen.value = true
  formState.value = {}
}

function handleSubmit() {
  const newItem = {id: Date.now(), ...formState}
  switch (currentSection.value.toLowerCase()) {
    case 'classes':
      classes.value.push(newItem)
      break
    case 'subjects':
      subjects.value.push(newItem)
      break
    case 'teachers':
      teachers.value.push(newItem)
      break
    case 'admins':
      admins.value.push(newItem)
      break
  }
  isModalOpen.value = false
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
</script>