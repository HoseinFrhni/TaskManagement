<template>
  <div class="flex flex-col min-h-screen bg-gray-100 rtl">
    <!-- Header -->
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <span class="text-green-400 text-xl font-bold">داشبورد</span>
      </div>
      <div class="flex items-center space-x-4">
        <span class="text-sm flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="size-5 me-1">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>

          <span class="ml-2">{{ username }}</span>
        </span>
        <span> | </span>
        <button @click="logout" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600 flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="size-5 me-1">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
          </svg>
          <span>خروج</span>
        </button>
      </div>
    </header>

    <div class="flex flex-col md:flex-row flex-1">
      <!-- Sidebar -->
      <AdminAside/>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import authApi from '../../api/auth.js'
import Tasks from '@/views/admin/tasks/Tasks.vue'
import AdminAside from '@/components/AdminAside.vue'

const router = useRouter()
const activeTab = ref('users')
const username = ref('')
const role = ref('')

const users = ref([
  { id: 1, name: 'علی احمدی', email: 'ali@example.com' },
  { id: 2, name: 'سارا رضایی', email: 'sara@example.com' }
])

const fetchUser = async () => {
  try {
    const response = await authApi.getUser()
    username.value = response.data.name
    role.value = response.data.role
  } catch (error) {
    console.error('خطا در دریافت اطلاعات کاربر:', error)
  }
}

const logout = async () => {
  try {
    await authApi.logout()
    localStorage.removeItem('access_token')
    await router.push('/')
  } catch (error) {
    console.error('خطا در خروج:', error)
  }
}

onMounted(() => {
  fetchUser()
})
</script>
<style>
.rtl {
  direction: rtl;
}
</style>
