<script setup>
import { ref } from 'vue'
import { apiClient } from '@/utils/request'

const responseMessage = ref('')
const errorMessage = ref('')

const testAPI = async () => {
  responseMessage.value = ''
  errorMessage.value = ''

  try {
    const res = await apiClient.get('/test/ping')
    responseMessage.value = res.message
  } catch (error) {
    errorMessage.value = '連線失敗，請檢查後端伺服器！'
    console.error(error)
  }
}
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold">前後端測試</h1>
    <button @click="testAPI" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
      測試 API 連線
    </button>
    <p v-if="responseMessage" class="mt-4 text-green-600">{{ responseMessage }}</p>
    <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<style scoped></style>
