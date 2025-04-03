<template>
  <DashboardView>
    <div class="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-6 border-b pb-4">
        <h2 class="text-2xl font-bold text-gray-800">جزئیات وظیفه</h2>
        <router-link
          :to="{ name: 'tasks' }"
          class="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-5 h-5 ml-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          بازگشت به لیست
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-lg font-semibold mb-2">عنوان وظیفه:</h3>
          <p class="text-gray-700">{{ task.title }}</p>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-2">وضعیت:</h3>
          <span v-if="task.status === 'pending'" class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
            در انتظار
          </span>
          <span v-if="task.status === 'in_progress'" class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            در حال انجام
          </span>
          <span v-if="task.status === 'completed'" class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            انجام شده
          </span>
        </div>

        <div class="md:col-span-2">
          <h3 class="text-lg font-semibold mb-2">توضیحات:</h3>
          <p class="text-gray-700 whitespace-pre-line">{{ task.description || 'بدون توضیحات' }}</p>
        </div>

        <div v-if="task.deadline">
          <h3 class="text-lg font-semibold mb-2">مهلت انجام:</h3>
          <p class="text-gray-700">{{ formatDate(task.deadline) }}</p>
        </div>

        <div v-if="task.created_at">
          <h3 class="text-lg font-semibold mb-2">تاریخ ایجاد:</h3>
          <p class="text-gray-700">{{ formatDate(task.created_at) }}</p>
        </div>
      </div>

      <div class="mt-6 flex justify-end space-x-4">
        <router-link
          :to="{ name: 'editTask', params: { id: task.id } }"
          class="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-5 h-5 ml-1">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
          ویرایش
        </router-link>
      </div>
    </div>
  </DashboardView>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import tasksApi from '@/api/tasks.js'
import DashboardView from '@/views/admin/DashboardView.vue'

const route = useRoute()
const task = ref({})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('fa-IR', options)
}

onMounted(async () => {
  try {
    const response = await tasksApi.getTask(route.params.id)
    task.value = response.data
  } catch (error) {
    console.error('Error fetching task details:', error)
  }
})
</script>