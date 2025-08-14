<template>
  <div class="websocket-demo max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">WebSocket Demo</h2>
    
    <!-- Connection Status -->
    <div class="mb-6 p-4 rounded-lg" :class="connectionStatusClass">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 rounded-full" :class="statusDotClass"></div>
          <span class="font-medium">{{ connectionStatusText }}</span>
        </div>
        <div class="flex space-x-2">
          <button
            v-if="!isConnected"
            @click="handleConnect"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Connect
          </button>
          <button
            v-else
            @click="handleDisconnect"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Disconnect
          </button>
        </div>
      </div>
      
      <!-- Connection Info -->
      <div v-if="isConnected" class="mt-2 text-sm text-gray-600">
        Connected users: {{ connectedUsers }}
      </div>
      
      <!-- Error Display -->
      <div v-if="connectionError" class="mt-2 text-sm text-red-600">
        Error: {{ connectionError }}
      </div>
      
      <!-- Reconnection Attempts -->
      <div v-if="reconnectAttempts > 0" class="mt-2 text-sm text-yellow-600">
        Reconnection attempts: {{ reconnectAttempts }}
      </div>
    </div>

    <!-- Chat Interface -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Chat Messages -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700">Chat Messages</h3>
        
        <div class="bg-gray-50 border rounded-lg p-4 h-64 overflow-y-auto">
          <div v-if="messages.length === 0" class="text-gray-500 text-center py-8">
            No messages yet. Send a message to start chatting!
          </div>
          
          <div
            v-for="message in messages"
            :key="message.id || message.timestamp"
            class="mb-3 p-3 bg-white rounded-lg shadow-sm"
          >
            <div class="flex justify-between items-start mb-1">
              <span class="font-medium text-blue-600">{{ message.username }}</span>
              <span class="text-xs text-gray-500">
                {{ formatTime(message.timestamp) }}
              </span>
            </div>
            <p class="text-gray-800">{{ message.text }}</p>
          </div>
        </div>

        <!-- Message Input -->
        <form @submit.prevent="sendMessage" class="flex space-x-2">
          <input
            v-model="username"
            type="text"
            placeholder="Your name"
            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            maxlength="20"
          />
          <input
            v-model="messageText"
            type="text"
            placeholder="Type your message..."
            class="flex-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            :disabled="!isConnected"
            maxlength="500"
          />
          <button
            type="submit"
            :disabled="!isConnected || !messageText.trim()"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </form>
      </div>

      <!-- Controls & Information -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-700">Controls & Info</h3>
        
        <!-- User Identification -->
        <div class="bg-gray-50 border rounded-lg p-4">
          <h4 class="font-medium mb-2">User Identification</h4>
          <div class="flex space-x-2">
            <input
              v-model="userId"
              type="text"
              placeholder="User ID"
              class="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <button
              @click="identifyUser"
              :disabled="!isConnected"
              class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Identify
            </button>
          </div>
        </div>

        <!-- Custom Events -->
        <div class="bg-gray-50 border rounded-lg p-4">
          <h4 class="font-medium mb-2">Custom Events</h4>
          <div class="space-y-2">
            <input
              v-model="customEventData"
              type="text"
              placeholder="Custom event data"
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <button
              @click="sendCustomEvent"
              :disabled="!isConnected"
              class="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Send Custom Event
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-gray-50 border rounded-lg p-4">
          <h4 class="font-medium mb-2">Actions</h4>
          <div class="space-y-2">
            <button
              @click="clearMessages"
              class="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Clear Messages
            </button>
          </div>
        </div>

        <!-- Connection Stats -->
        <div class="bg-gray-50 border rounded-lg p-4">
          <h4 class="font-medium mb-2">Connection Statistics</h4>
          <div class="text-sm space-y-1">
            <div>Status: <span class="font-medium">{{ isConnected ? 'Connected' : 'Disconnected' }}</span></div>
            <div>Messages: <span class="font-medium">{{ messages.length }}</span></div>
            <div>Users Online: <span class="font-medium">{{ connectedUsers }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSocket } from '@/composables/useSocket.js'

// Socket composable
const {
  isConnected,
  connectionError,
  reconnectAttempts,
  messages,
  connectedUsers,
  connect,
  disconnect,
  sendMessage: sendSocketMessage,
  clearMessages: clearSocketMessages,
  identify,
  sendCustomEvent: sendSocketCustomEvent
} = useSocket()

// Component state
const username = ref('Anonymous')
const messageText = ref('')
const userId = ref('')
const customEventData = ref('')

// Computed properties
const connectionStatusClass = computed(() => {
  if (isConnected.value) return 'bg-green-50 border-green-200'
  if (connectionError.value) return 'bg-red-50 border-red-200'
  return 'bg-yellow-50 border-yellow-200'
})

const statusDotClass = computed(() => {
  if (isConnected.value) return 'bg-green-500'
  if (connectionError.value) return 'bg-red-500'
  return 'bg-yellow-500'
})

const connectionStatusText = computed(() => {
  if (isConnected.value) return 'Connected to WebSocket server'
  if (connectionError.value) return 'Connection failed'
  return 'Disconnected'
})

// Methods
const handleConnect = () => {
  connect()
}

const handleDisconnect = () => {
  disconnect()
}

const sendMessage = () => {
  if (messageText.value.trim() && isConnected.value) {
    sendSocketMessage(messageText.value.trim(), username.value || 'Anonymous')
    messageText.value = ''
  }
}

const identifyUser = () => {
  if (userId.value.trim() && isConnected.value) {
    identify({
      userId: userId.value.trim(),
      username: username.value || 'Anonymous'
    })
  }
}

const sendCustomEvent = () => {
  if (customEventData.value.trim() && isConnected.value) {
    sendSocketCustomEvent({
      message: customEventData.value.trim(),
      timestamp: new Date(),
      source: 'WebSocket Demo'
    })
    customEventData.value = ''
  }
}

const clearMessages = () => {
  clearSocketMessages()
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString()
}

// Auto-connect on mount
onMounted(() => {
  connect()
})
</script>

<style scoped>
.flex-2 {
  flex: 2;
}
</style>