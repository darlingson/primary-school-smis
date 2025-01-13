<template>
  <div class="bg-f9f9f9 px-6 lg:px-12 py-16 space-y-16">
    <!-- Hero Section -->
    <section class="bg-white rounded-lg shadow-lg text-center py-16 px-8 lg:px-16">
      <h1 class="text-5xl font-extrabold text-333333 mb-6 leading-tight">
        Welcome to Primary School SMIS
      </h1>
      <p class="text-lg text-555555 max-w-2xl mx-auto leading-relaxed">
        A comprehensive student management system tailored to enhance education management for primary schools.
      </p>
      <div class="mt-10">
        <button
            class="transition-transform transform hover:scale-105 focus:ring-4 focus:ring-blue-300"
            style="
            background-color: #3498db;
            color: white;
            padding: 14px 36px;
            border-radius: 50px;
            font-size: 1.125rem;
            font-weight: 600;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          "
            @click="navigateTo('/login')"
        >
          Get Started
        </button>
      </div>
    </section>

    <!-- Features Section -->
    <section class="grid md:grid-cols-3 gap-10">
      <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-white rounded-lg shadow-md p-8 text-center border border-f1c40f transition-transform transform hover:scale-105"
      >
        <div
            class="w-16 h-16 mx-auto flex items-center justify-center mb-6"
            style="background-color: #f1c40f; border-radius: 50%;"
        >
          <span class="text-white font-bold text-2xl">{{ feature.icon }}</span>
        </div>
        <h3 class="text-xl font-bold text-333333 mb-4">{{ feature.title }}</h3>
        <p class="text-555555 leading-relaxed">
          {{ feature.description }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
const features = [
  {
    icon: '👥',
    title: 'User Management',
    description:
        'Secure role-based access control for administrators, teachers, students, and parents.'
  },
  {
    icon: '📚',
    title: 'Academic Management',
    description:
        'Efficiently manage student records, class enrollment, and academic progress.'
  },
  {
    icon: '📊',
    title: 'Reporting & Analytics',
    description:
        'Generate comprehensive reports and visualize data trends for informed decision-making.'
  }
];
</script>

<style>
.text-333333 {
  color: #333333;
}

.text-555555 {
  color: #555555;
}

.bg-f9f9f9 {
  background-color: #f9f9f9;
}

button:focus {
  outline: none;
}
</style>
