<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authApi from '../api/auth'

const router = useRouter()
const form = ref({
  email: '',
  password: ''
})
const errors = ref(null)
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  errors.value = null

  try {
    const response = await authApi.login(form.value)

    // ذخیره توکن در LocalStorage
    localStorage.setItem('access_token', response.data.access_token)

    // هدایت کاربر به صفحه تسک‌ها
    await router.push({ name: 'tasks' })
  } catch (error) {
    // بررسی و نمایش خطای دریافت‌شده
    if (error.response && error.response.data.message) {
      errors.value = error.response.data.message
    } else {
      errors.value = 'مشکلی در ورود به سیستم پیش آمد. لطفاً دوباره تلاش کنید.'
    }
    console.error('ورود ناموفق:', error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 rtl">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-800">
          ورود به حساب کاربری
        </h2>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div v-if="errors" class="text-red-500 text-sm text-center">{{ errors }}</div>

        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 text-right">ایمیل</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input-field"
              placeholder="example@example.com"
              dir="ltr"
            >
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 text-right">رمز عبور</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="input-field"
              placeholder="••••••••"
              dir="ltr"
            >
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            >
            <label for="remember-me" class="mr-2 block text-sm text-gray-700">
              مرا به خاطر بسپار
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-primary-600 hover:text-primary-500">
              رمز عبور را فراموش کرده‌اید؟
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="submit-button"
            :disabled="loading"
          >
            <span v-if="loading">در حال ورود...</span>
            <span v-else>ورود به سیستم</span>
          </button>
        </div>
      </form>

      <div class="text-center">
        <router-link
          to="/register"
          class="font-medium text-primary-600 hover:text-primary-500"
        >
          حساب کاربری ندارید؟ ثبت‌نام کنید
        </router-link>
      </div>
    </div>
  </div>
</template>

<style>
.input-field {
  @apply mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-right;
}

.submit-button {
  @apply relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200;
}

.rtl {
  direction: rtl;
}
</style>
