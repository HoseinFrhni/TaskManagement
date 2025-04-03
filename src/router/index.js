import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import Tasks from '../views/admin/tasks/Tasks.vue'
import CreateTask from '@/views/admin/tasks/CreateTask.vue'
import EditTask from '@/views/admin/tasks/EditTask.vue'
import TaskDetail from '@/views/admin/tasks/TaskDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks,
      meta: { requiresAuth: true }
    },
    {
      path: '/task-create',
      name: 'createTask',
      component: CreateTask,
      meta: { requiresAuth: true }
    },
    {
      path: '/tasks/:id/edit',
      name: 'editTask',
      component: EditTask,
      meta: { requiresAuth: true }
    },
    {
      path: '/tasks/:id',
      name: 'taskDetails',
      component: TaskDetail,
      meta: { requiresAuth: true }
    }
  ]
})

// 🚀 گارد ناوبری برای بررسی احراز هویت
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token') // بررسی وجود توکن

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login' }) // اگر احراز هویت نشده، به صفحه لاگین هدایت شود
  } else {
    next() // در غیر این صورت اجازه ادامه مسیر داده شود
  }
})

export default router
