import { defineStore } from 'pinia'
import tasksApi from '@/api/tasks.js'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
  }),

  actions: {
    async fetchTasks() {
      try {
        const response = await tasksApi.getTasks()
        this.tasks = response.data
      } catch (error) {
        console.error('خطا در دریافت وظایف:', error)
      }
    },

    async updateTaskStatus(id, newStatus) {
      try {
        await tasksApi.updateTask(id, { status: newStatus })
        this.tasks = this.tasks.map(task =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      } catch (error) {
        console.error('خطا در تغییر وضعیت وظیفه:', error)
      }
    }
  }
})
