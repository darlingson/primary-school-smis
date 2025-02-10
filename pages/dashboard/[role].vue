<template>
  <div class="space-y-6">
    <!-- Header Section -->
    <header class="text-white p-6 rounded-lg shadow-md" style="background-color: #3498db">
      <h1 class="text-2xl font-bold" style="font-family: 'Open Sans', sans-serif;">
        {{ welcomeMessage }}
      </h1>
    </header>

    <!-- Modules Section -->
    <div v-if="role == 'school_admin'">
      <dashboard/>
    </div>
    <div class="grid md:grid-cols-3 gap-6" v-else>
      <div v-for="(module, index) in modules" :key="index"
        class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-3498db"
        style="font-family: 'Open Sans', sans-serif; border-color: #3498db">
        <h3 class="text-lg font-semibold mb-2" style="color: #333333; font-size: 18px;">
          {{ module.title }}
        </h3>
        <p class="text-sm mb-4" style="color: #333333; font-size: 14px;">
          {{ module.description }}
        </p>
        <NuxtLink :to="module.link" class="inline-block text-3498db font-semibold hover:underline"
          style="font-size: 14px;">
          Access Module →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import Dashboard from "~/pages/dashboard/school_admin/dashboard.vue";

const route = useRoute()
const role = route.params.role

const welcomeMessage = computed(() => {
  const roleMap = {
    admin: 'System Administrator Dashboard',
    school_admin: 'School Administrator Dashboard',
    teacher: 'Teacher Dashboard',
    student: 'Student Dashboard',
    parent: 'Parent Dashboard'
  }
  return roleMap[role] || 'Dashboard'
})

const modules = computed(() => {
  const modulesByRole = {
    admin: [
      {
        title: 'User Management',
        description: 'Manage all system users and their roles',
        link: '/users'
      },
      {
        title: 'School Management',
        description: 'Oversee all registered schools',
        link: '/dashboard/admin/schools'
      },
      {
        title: 'System Settings',
        description: 'Configure system-wide settings',
        link: '/settings'
      }
    ],
    school_admin: [
      {
        title: 'Staff Management',
        description: 'Manage teachers and administrative staff',
        link: '/staff'
      },
      {
        title: 'Student Records',
        description: 'Access and manage student information',
        link: '/students'
      },
      {
        title: 'Academic Calendar',
        description: 'Manage school terms and events',
        link: '/calendar'
      }
    ],
    teacher: [
      {
        title: 'My Classes',
        description: 'View and manage assigned classes',
        link: '/classes'
      },
      {
        title: 'Student Progress',
        description: 'Track and record student performance',
        link: '/progress'
      },
      {
        title: 'Resources',
        description: 'Access teaching materials and resources',
        link: '/resources'
      }
    ],
    student: [
      {
        title: 'My Schedule',
        description: 'View class schedule and assignments',
        link: '/schedule'
      },
      {
        title: 'Academic Progress',
        description: 'View grades and performance reports',
        link: '/progress'
      },
      {
        title: 'Resources',
        description: 'Access learning materials',
        link: '/resources'
      }
    ],
    parent: [
      {
        title: 'Children',
        description: 'View children\'s profiles and progress',
        link: '/children'
      },
      {
        title: 'Academic Reports',
        description: 'Access academic performance reports',
        link: '/reports'
      },
      {
        title: 'Communication',
        description: 'Message teachers and staff',
        link: '/messages'
      }
    ]
  }
  return modulesByRole[role] || []
})
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');

/* Custom hover effect for modules */
div[role='module'] {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

div[role='module']:hover {
  transform: translateY(-2px);
}
</style>