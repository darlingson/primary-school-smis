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
                    <input type="text" placeholder="Search..."
                        class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-3498db" />
                </div>
                <div class="flex items-center">
                    <button class="p-2 text-gray-400 hover:text-3498db">
                        <BellIcon class="h-6 w-6" />
                    </button>
                    <button class="ml-4 flex items-center text-gray-700 hover:text-3498db">
                        <img class="h-8 w-8 rounded-full object-cover" src="https://placekitten.com/100/100"
                            alt="User avatar" />
                        <span class="ml-2 font-medium">John Doe</span>
                    </button>
                </div>
            </header>

            <!-- Dashboard -->
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                <h2 class="text-2xl font-semibold text-gray-800 mb-6">School Management Dashboard</h2>
                <div class="grid md:grid-cols-3 gap-6">
                    <!-- Quick Stats -->
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

                <!-- Recent Activities -->
                <div class="mt-8 bg-white rounded-lg shadow-md">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-semibold text-gray-800">Recent Activities</h3>
                    </div>
                    <ul class="divide-y divide-gray-200">
                        <li v-for="activity in recentActivities" :key="activity.id" class="px-6 py-4 hover:bg-gray-50">
                            <div class="flex items-center">
                                <component :is="activity.icon" class="h-6 w-6 text-3498db" />
                                <p class="ml-4 text-sm text-gray-700">{{ activity.description }}</p>
                                <span class="ml-auto text-xs text-gray-500">{{ activity.time }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { HomeIcon, UsersIcon, AcademicCapIcon, BookOpenIcon, CogIcon, BellIcon, UserPlusIcon, PencilIcon, TrashIcon } from 'lucide-vue-next'

const navItems = [
    { name: 'Dashboard', href: '#', icon: HomeIcon },
    { name: 'Students', href: '#', icon: UsersIcon },
    { name: 'Teachers', href: '#', icon: AcademicCapIcon },
    { name: 'Courses', href: '#', icon: BookOpenIcon },
    { name: 'Settings', href: '#', icon: CogIcon },
]

const quickStats = [
    { name: 'Total Students', value: '1,234', icon: UsersIcon },
    { name: 'Total Teachers', value: '56', icon: AcademicCapIcon },
    { name: 'Active Courses', value: '28', icon: BookOpenIcon },
]

const recentActivities = [
    { id: 1, description: 'New student John Doe enrolled', time: '2 hours ago', icon: UserPlusIcon },
    { id: 2, description: 'Course "Mathematics 101" updated', time: '4 hours ago', icon: PencilIcon },
    { id: 3, description: 'Teacher Jane Smith added', time: '1 day ago', icon: UserPlusIcon },
    { id: 4, description: 'Student Mark Johnson withdrawn', time: '2 days ago', icon: TrashIcon },
]
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