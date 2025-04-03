<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 rtl">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-2xl border border-gray-300">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-800">
          ایجاد حساب کاربری جدید
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          لطفا اطلاعات خود را برای ثبت‌نام وارد کنید
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <div class="rounded-md space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 text-right mb-1">نام کامل</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              required
              class="input-field"
              placeholder="نام و نام خانوادگی"
              dir="auto"
            >
            <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 text-right mb-1">ایمیل</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="input-field"
              placeholder="example@example.com"
              dir="ltr"
            >
            <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 text-right mb-1">رمز عبور</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="input-field"
              placeholder="••••••••"
              dir="ltr"
            >
            <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
          </div>

          <div>
            <label for="password-confirmation" class="block text-sm font-medium text-gray-700 text-right mb-1">تکرار رمز
              عبور</label>
            <input
              id="password-confirmation"
              v-model="form.password_confirmation"
              type="password"
              required
              class="input-field"
              placeholder="••••••••"
              dir="ltr"
            >
            <p v-if="errors.password_confirmation" class="text-red-500 text-xs mt-1">{{ errors.password_confirmation
              }}</p>
          </div>
        </div>

        <div class="flex items-center">
          <input id="terms" type="checkbox" required
                 class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded">
          <label for="terms" class="mr-2 block text-sm text-gray-600">
            با <a href="#" class="font-medium text-primary-600 hover:text-primary-500">شرایط و مقررات</a> موافقم
          </label>
        </div>

        <div>
          <button type="submit" class="submit-button" :disabled="loading">
            <span v-if="loading">در حال ثبت‌نام...</span>
            <span v-else>ثبت‌نام</span>
          </button>
        </div>
      </form>

      <div class="text-center">
        <p class="text-sm text-gray-600">
          قبلاً ثبت‌نام کرده‌اید؟
          <router-link to="/" class="font-medium text-primary-600 hover:text-primary-500 mr-1">
            ورود به سیستم
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import authApi from '../api/auth'

const router = useRouter()
const form = ref({ name: '', email: '', password: '', password_confirmation: '' })
const errors = ref({})
const loading = ref(false)

const handleRegister = async () => {
  loading.value = true
  errors.value = {}
  try {
    const response = await authApi.register(form.value)
    localStorage.setItem('access_token', response.data.access_token)
    console.log('ثبت نام انجام شد', localStorage.getItem('access_token'))
    await router.push('/')
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors
    } else {
      console.error('ثبت‌نام ناموفق:', error)
    }
  } finally {
    loading.value = false
  }
}
</script>

<style>
.input-field {
  @apply mt-1 appearance-none relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-400 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm text-right;
}

.submit-button {
  @apply relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200;
}

.rtl {
  direction: rtl;
}
</style>
