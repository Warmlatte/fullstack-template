/**
 * Vue Composable for Socket.IO
 * Provides reactive WebSocket functionality for Vue components
 */

import { onMounted, onUnmounted, computed } from "vue";
import socketService from "@/services/socketService.js";

export function useSocket() {
  // Reactive connection state
  const isConnected = computed(() => socketService.getConnectionStatus());
  const connectionError = computed(() => socketService.getConnectionError().value);
  const reconnectAttempts = computed(() => socketService.getReconnectAttempts().value);

  // Reactive data
  const messages = computed(() => socketService.getMessages().value);
  const connectedUsers = computed(() => socketService.getConnectedUsers().value);

  /**
   * Connect to Socket.IO server
   * @param {Object} options - Connection options
   */
  const connect = (options = {}) => {
    socketService.connect(options);
  };

  /**
   * Disconnect from Socket.IO server
   */
  const disconnect = () => {
    socketService.disconnect();
  };

  /**
   * Send a message
   * @param {string} text - Message text
   * @param {string} username - Username
   */
  const sendMessage = (text, username) => {
    socketService.sendMessage(text, username);
  };

  /**
   * Send custom event
   * @param {string} event - Event name
   * @param {Object} data - Event data
   */
  const emit = (event, data) => {
    socketService.emit(event, data);
  };

  /**
   * Listen for events
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  const on = (event, callback) => {
    socketService.on(event, callback);
  };

  /**
   * Remove event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  const off = (event, callback) => {
    socketService.off(event, callback);
  };

  /**
   * Join a room
   * @param {string} room - Room name
   */
  const joinRoom = (room) => {
    socketService.joinRoom(room);
  };

  /**
   * Leave a room
   * @param {string} room - Room name
   */
  const leaveRoom = (room) => {
    socketService.leaveRoom(room);
  };

  /**
   * Clear messages
   */
  const clearMessages = () => {
    socketService.clearMessages();
  };

  /**
   * Identify user to server
   * @param {Object} userInfo - User information
   */
  const identify = (userInfo) => {
    socketService.identify(userInfo);
  };

  /**
   * Send custom event with predefined structure
   * @param {Object} data - Event data
   */
  const sendCustomEvent = (data) => {
    socketService.sendCustomEvent(data);
  };

  // Auto-connect on mount and disconnect on unmount (optional)
  const autoConnect = (options = {}) => {
    onMounted(() => {
      connect(options);
    });

    onUnmounted(() => {
      disconnect();
    });
  };

  return {
    // Connection state
    isConnected,
    connectionError,
    reconnectAttempts,
    
    // Data
    messages,
    connectedUsers,
    
    // Methods
    connect,
    disconnect,
    sendMessage,
    emit,
    on,
    off,
    joinRoom,
    leaveRoom,
    clearMessages,
    identify,
    sendCustomEvent,
    autoConnect,
  };
}