<template>
  <DashboardView>
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="flex justify-around border-b-2 pb-3">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">لیست وظایف</h3>
        <router-link v-if="role === 'manager'" :to="{name : 'createTask'}"
                     class="bg-gray-800 py-2 px-4 rounded-xl text-white hover:bg-gray-900">
          <div class="flex">
            <p>افزودن</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-6 ms-1">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
            </svg>
          </div>
        </router-link>
      </div>

      <!-- Search and Filter Section -->
      <div class="flex justify-between items-center mb-4 mt-2">
        <!-- Search Box -->
        <div class="relative w-1/3">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="جستجوی وظایف..."
            class="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>

        <!-- Filter Dropdown -->
        <div class="relative">
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-5 w-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          <select
            v-model="statusFilter"
            class="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          >
            <option value="all">همه وضعیت‌ها</option>
            <option value="in_progress">در حال انجام</option>
            <option value="completed">انجام شده</option>
          </select>

        </div>
      </div>

      <table class="min-w-full table-auto mt-5">
        <thead>
        <tr class="border-b-2">
          <th class="px-4 py-2 text-right">عنوان وظیفه</th>
          <th class="px-4 py-2 text-right">وضعیت</th>
          <th class="px-4 py-2 text-right">گزینه ها</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="task in filteredTasks" :key="task.id" class="border-b-2">
          <td class="px-4 py-2">{{ task.title }}</td>
          <td class="px-4 py-2">
            <span v-if="task.status === 'pending'">در انتظار</span>
            <span v-if="task.status === 'in_progress'">در حال انجام</span>
            <span v-if="task.status === 'completed'">انجام شده</span>
          </td>
          <td class="px-2 py-1 flex">
            <router-link :to="{ name: 'editTask', params: { id: task.id } }"
                         class="flex items-center bg-amber-500 hover:bg-amber-600 rounded-xl py-2 px-4 mx-1">
              <div>ویرایش</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
            </router-link>

            <a v-if="role === 'manager'" @click.prevent="openDeleteModal(task.id)"
               class="flex items-center bg-red-500 hover:bg-red-600 rounded-xl py-2 px-4 mx-1 text-white cursor-pointer">
              <div>حذف</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="size-5 ms-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </a>
            <a
              @click="changeStatus(task.id, task.status)"
              class="flex items-center bg-gray-700 text-white px-3 py-1 rounded-lg mx-1 hover:bg-gray-900 hover:cursor-pointer"
            >
              <div class="hover:cursor-pointer"> تغییر وضعیت</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="size-5 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>

            </a>
            <router-link
              :to="{ name: 'taskDetails', params: { id: task.id } }"
              class="flex items-center bg-blue-500 hover:bg-blue-600 rounded-xl py-2 px-4 mx-1 text-white"
            >
              <div>نمایش</div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="size-5 ms-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </router-link>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for delete confirmation -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">تایید حذف</h3>
        <p class="text-gray-600 mb-6">آیا از حذف این وظیفه مطمئن هستید؟ این عمل قابل بازگشت نیست.</p>
        <div class="flex justify-end space-x-4">
          <button
            @click="showDeleteModal = false"
            class="mx-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            انصراف
          </button>
          <button
            @click="confirmDelete"
            class="mx-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 "
          >
            حذف
          </button>

        </div>
      </div>
    </div>
  </DashboardView>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTaskStore } from '@/stores/tasks'
import tasksApi from '@/api/tasks.js'
import DashboardView from '@/views/admin/DashboardView.vue'
import authApi from '@/api/auth.js'

const showDeleteModal = ref(false)
const taskToDelete = ref(null)
const role = ref('')
const searchQuery = ref('')
const statusFilter = ref('all')
const tasksList = ref([]) // اضافه کردن این خط برای ذخیره لیست تسک‌ها

const openDeleteModal = (taskId) => {
  taskToDelete.value = taskId
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    await tasksApi.deleteTask(taskToDelete.value)
    tasksList.value = tasksList.value.filter(task => task.id !== taskToDelete.value)
    showDeleteModal.value = false
  } catch (error) {
    console.error('خطا در حذف وظیفه:', error.response.data.message)
  }
}

const taskStore = useTaskStore()
const tasks = computed(() => taskStore.tasks)

// Filtered tasks based on search and status filter
const filteredTasks = computed(() => {
  let result = tasksList.value // تغییر از tasks.value به tasksList.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(task =>
      task.title.toLowerCase().includes(query)
    )
  }

  // Apply status filter
  if (statusFilter.value !== 'all') {
    result = result.filter(task => task.status === statusFilter.value)
  }

  return result
})

const changeStatus = async (taskId, currentStatus) => {
  let newStatus = 'in_progress'
  if (currentStatus === 'in_progress') newStatus = 'completed'
  else if (currentStatus === 'completed') newStatus = 'in_progress'

  await taskStore.updateTaskStatus(taskId, newStatus)
  // بعد از تغییر وضعیت، لیست را مجددا دریافت کنید
  await fetchTasks()
}

const fetchTasks = async () => {
  try {
    const response = await tasksApi.getTasks()
    tasksList.value = response.data // تغییر از tasks.value به tasksList.value
  } catch (error) {
    console.error('خطا در دریافت وظایف:', error)
  }
}

const fetchUser = async () => {
  try {
    const response = await authApi.getUser()
    role.value = response.data.role
  } catch (error) {
    console.error('خطا در دریافت اطلاعات کاربر:', error)
  }
}

onMounted(() => {
  fetchTasks()
  fetchUser()
})
</script>