<template>
    <div class="flex h-screen bg-gray-100">
        <!-- Sidebar -->
        <div class="w-64 bg-white shadow-md">
            <div class="flex items-center justify-center h-16 bg-3498db">
                <h1 class="text-white text-2xl font-semibold">SMIS Admin</h1>
            </div>
            <nav class="mt-6">
                <a v-for="item in navItems" :key="item.name" :href="item.href"
                    class="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-200 hover:text-3498db transition-colors duration-200">
                    <component :is="item.icon" class="h-5 w-5 mr-3" />
                    {{ item.name }}
                </a>
            </nav>
        </div>

        <!-- Main Content -->
        <div class="flex-1 flex flex-col overflow-hidden">
            <!-- Header -->
            <header class="flex items-center justify-between px-6 py-4 bg-white shadow-md">
                <div class="flex items-center">
                    <input type="text" placeholder="Search schools..."
                        class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-3498db" />
                </div>
                <div class="flex items-center">
                    <button class="p-2 text-gray-400 hover:text-3498db">
                        <BellIcon class="h-6 w-6" />
                    </button>
                    <button class="ml-4 flex items-center text-gray-700 hover:text-3498db">
                        <img class="h-8 w-8 rounded-full object-cover" src="https://placekitten.com/100/100"
                            alt="Admin avatar" />
                        <span class="ml-2 font-medium">System Admin</span>
                    </button>
                </div>
            </header>

            <!-- Dashboard -->
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-semibold text-gray-800">Manage Schools</h2>
                    <button @click="openAddSchoolModal"
                        class="bg-3498db text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
                        Add New School
                    </button>
                </div>

                <!-- Quick Stats -->
                <div class="grid md:grid-cols-4 gap-6 mb-6">
                    <div v-for="stat in quickStats" :key="stat.name"
                        class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-3498db">
                        <div class="flex items-center">
                            <component :is="stat.icon" class="h-8 w-8 text-3498db" />
                            <div class="ml-4">
                                <h3 class="text-lg font-semibold text-gray-700">{{ stat.name }}</h3>
                                <p class="text-2xl font-bold text-3498db">{{ stat.value }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Schools Table -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    School Name</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Location</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Admin</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Students</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status</th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="school in schools" :key="school.id">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ school.name }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-500">{{ school.location }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ school.admin }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ school.students }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span :class="[
                                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                                        school.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    ]">
                                        {{ school.status }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button @click="editSchool(school.id)"
                                        class="text-3498db hover:text-blue-900 mr-3">Edit</button>
                                    <button @click="deleteSchool(school.id)"
                                        class="text-red-600 hover:text-red-900">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>

      <div v-if="showAddSchoolModal">
        <AddSchoolForm  @close-modal-event="()=> showAddSchoolModal= false"/>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { HomeIcon, BuildingIcon, UsersIcon, BookOpenIcon, CogIcon, BellIcon, SchoolIcon } from 'lucide-vue-next'
import AddSchoolForm from "~/components/admin/AddSchoolForm.vue";
const navItems = [
    { name: 'Dashboard', href: '#', icon: HomeIcon },
    { name: 'Schools', href: '#', icon: BuildingIcon },
    { name: 'Users', href: '#', icon: UsersIcon },
    { name: 'Reports', href: '#', icon: BookOpenIcon },
    { name: 'Settings', href: '#', icon: CogIcon },
]

const quickStats = [
    { name: 'Total Schools', value: '50', icon: BuildingIcon },
    { name: 'Total Students', value: '10,234', icon: UsersIcon },
    { name: 'Total Teachers', value: '526', icon: SchoolIcon },
    { name: 'Active Courses', value: '128', icon: BookOpenIcon },
]

const schools = ref([
    { id: 1, name: 'Springfield Elementary', location: 'Springfield, IL', admin: 'Seymour Skinner', students: 500, status: 'Active' },
    { id: 2, name: 'Hogwarts School', location: 'Scotland, UK', admin: 'Albus Dumbledore', students: 1000, status: 'Active' },
    { id: 3, name: 'Xavier\'s School for Gifted Youngsters', location: 'Westchester County, NY', admin: 'Charles Xavier', students: 100, status: 'Active' },
    { id: 4, name: 'Sunnydale High School', location: 'Sunnydale, CA', admin: 'R. Snyder', students: 750, status: 'Inactive' },
    { id: 5, name: 'Greendale Community College', location: 'Greendale, CO', admin: 'Dean Craig Pelton', students: 1500, status: 'Active' },
])

const showAddSchoolModal = ref(false)
const newSchool = ref({
    name: '',
    location: '',
    admin: '',
})

const openAddSchoolModal = () => {
    showAddSchoolModal.value = true
}

const closeAddSchoolModal = () => {
    showAddSchoolModal.value = false
    newSchool.value = { name: '', location: '', admin: '' }
}

const addSchool = () => {
    // Here you would typically make an API call to add the school
    schools.value.push({
        id: schools.value.length + 1,
        ...newSchool.value,
        students: 0,
        status: 'Active'
    })
    closeAddSchoolModal()
}

const editSchool = (id) => {
    // Implement edit functionality
    console.log('Edit school', id)
}

const deleteSchool = (id) => {
    // Implement delete functionality
    console.log('Delete school', id)
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

body {
    font-family: 'Open Sans', sans-serif;
}

.bg-3498db {
    background-color: #3498db;
}

.text-3498db {
    color: #3498db;
}

.border-3498db {
    border-color: #3498db;
}

.hover\:text-3498db:hover {
    color: #3498db;
}

.focus\:ring-3498db:focus {
    --tw-ring-color: #3498db;
}
</style>