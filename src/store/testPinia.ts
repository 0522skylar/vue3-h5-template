import { ref } from 'vue'
import { defineStore } from 'pinia'
export const usePiniaState = defineStore('pinia', () => {
  const userName = ref('')
  const isLoading = ref(false)

  const getUserName = (data) => {
    userName.value = data
  }
  const setIsLoading = (data) => {
    isLoading.value = data
  }
  return {
    getUserName,
    setIsLoading,
    userName,
    isLoading,
  }
})
