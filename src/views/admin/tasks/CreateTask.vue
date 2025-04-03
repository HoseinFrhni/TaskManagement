<template>
  <dashboard-view>
    <div class="bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200">
      <h3 class="text-xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        ایجاد وظیفه جدید
      </h3>

      <form @submit.prevent="createTask" class="space-y-5">
        <div class="mb-5">
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">عنوان وظیفه</label>
          <input
            type="text"
            id="title"
            v-model="task.title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition duration-200 p-2 border bg-gray-100"
            required
            placeholder="عنوان وظیفه را وارد کنید"
          />
        </div>

        <div class="mb-5">
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">توضیحات</label>
          <textarea
            id="description"
            v-model="task.description"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition duration-200 p-2 border bg-gray-100"
            placeholder="توضیحات تکمیلی را وارد کنید"
          ></textarea>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-1 gap-5">
          <div class="mb-5">
            <label for="status" class="block text-sm font-medium text-gray-700 mb-1">وضعیت</label>
            <select
              id="status"
              v-model="task.status"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition duration-200 p-2 border bg-gray-100"
            >
              <option value="in_progress">در حال انجام</option>
              <option value="completed">انجام شده</option>
            </select>
          </div>

          <!-- Select user dropdown -->
          <div class="mb-5">
            <label for="user_id" class="block text-sm font-medium text-gray-700 mb-1">انتخاب کاربر</label>
            <select
              id="user_id"
              v-model="task.user_id"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition duration-200 p-2 border bg-gray-100"
            >
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="mb-5">
          <label class="block text-sm font-medium text-gray-700 mb-3">بازه زمانی</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- تاریخ شروع -->
            <div class="relative">
              <label for="start_date" class="block text-xs text-gray-500 mb-1">تاریخ شروع</label>
              <div class="relative">
                <date-picker
                  v-model="task.start_date"
                  format="jYYYY-jMM-jDD"
                  display-format="jYYYY/jMM/jDD"
                  placeholder="روز/ماه/سال"
                  :input-class="'pr-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition duration-200 p-2 border bg-gray-100'"
                  required
                />
                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- تاریخ پایان -->
            <div class="relative">
              <label for="end_date" class="block text-xs text-gray-500 mb-1">تاریخ پایان</label>
              <div class="relative">
                <date-picker
                  v-model="task.end_date"
                  format="jYYYY-jMM-jDD"
                  display-format="jYYYY/jMM/jDD"
                  placeholder="روز/ماه/سال"
                  :input-class="'pr-10 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 transition duration-200 p-2 border bg-gray-100'"
                />
                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-3 border-t border-gray-200">
          <button
            type="submit"
            class="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-md shadow-sm transition duration-200 flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            ایجاد وظیفه
          </button>
        </div>
      </form>
    </div>
  </dashboard-view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import usersApi from '../../../api/users.js'
import tasks from '../../../api/tasks.js'
import DashboardView from '@/views/admin/DashboardView.vue'
import DatePicker from 'vue3-persian-datetime-picker'
import router from '@/router/index.js'

const task = ref({
  title: '',
  description: '',
  status: '',
  start_date: '',
  end_date: '',
  user_id: null
})

const users = ref([])
const role = ref('')
const getUsers = async () => {
  try {
    const response = await usersApi.getUsers()
    role.value = response.data.role
    users.value = response.data
    console.log(users)
  } catch (error) {
    console.error('خطا در دریافت کاربران:', error)
  }
}
const createTask = async () => {
  try {
    const response = await tasks.createTask(task.value)
    console.log('وظیفه جدید ایجاد شد:', response.data)

    // Reset form after successful submission
    task.value = {
      title: '',
      description: '',
      status: 'pending',
      start_date: '',
      end_date: '',
      user_id: null
    }
    await router.push('/tasks')
  } catch (error) {
    console.error('خطا در ایجاد وظیفه:', error)
  }
}

onMounted(() => {
  getUsers()
})


</script>
