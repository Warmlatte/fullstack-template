/**
 * WebSocket Client Service
 * Handles Socket.IO client connection and provides utilities for real-time communication
 */

import { io } from "socket.io-client";
import { ref, reactive } from "vue";

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = ref(false);
    this.connectionError = ref(null);
    this.reconnectAttempts = ref(0);
    this.maxReconnectAttempts = 5;
    
    // Reactive state for real-time updates
    this.messages = ref([]);
    this.connectedUsers = ref(0);
    this.serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
  }

  /**
   * Initialize and connect to Socket.IO server
   * @param {Object} options - Connection options
   */
  connect(options = {}) {
    if (this.socket?.connected) {
      console.log("Socket already connected");
      return;
    }

    const defaultOptions = {
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: this.maxReconnectAttempts,
      timeout: 5000,
      ...options
    };

    this.socket = io(this.serverUrl, defaultOptions);
    this.setupEventHandlers();
  }

  /**
   * Setup event handlers for Socket.IO events
   */
  setupEventHandlers() {
    // Connection events
    this.socket.on("connect", () => {
      console.log("Connected to server:", this.socket.id);
      this.isConnected.value = true;
      this.connectionError.value = null;
      this.reconnectAttempts.value = 0;
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Disconnected from server:", reason);
      this.isConnected.value = false;
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      this.connectionError.value = error.message;
      this.reconnectAttempts.value++;
    });

    // Custom event handlers
    this.socket.on("chat_message", (data) => {
      this.messages.value.push(data);
    });

    this.socket.on("user_count", (count) => {
      this.connectedUsers.value = count;
    });

    this.socket.on("custom_response", (data) => {
      console.log("Custom response received:", data);
    });
  }

  /**
   * Disconnect from Socket.IO server
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.isConnected.value = false;
    }
  }

  /**
   * Send a message to the server
   * @param {string} event - Event name
   * @param {Object} data - Data to send
   */
  emit(event, data) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn("Socket not connected. Cannot emit event:", event);
    }
  }

  /**
   * Listen for specific events
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  /**
   * Remove event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function to remove
   */
  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  /**
   * Send a chat message
   * @param {string} text - Message text
   * @param {string} username - Username
   */
  sendMessage(text, username = "Anonymous") {
    this.emit("chat_message", {
      text,
      username,
      timestamp: new Date()
    });
  }

  /**
   * Identify the user to the server
   * @param {Object} userInfo - User information
   */
  identify(userInfo) {
    this.emit("identify", userInfo);
  }

  /**
   * Join a room
   * @param {string} room - Room name
   */
  joinRoom(room) {
    this.emit("join_room", { room });
  }

  /**
   * Leave a room
   * @param {string} room - Room name
   */
  leaveRoom(room) {
    this.emit("leave_room", { room });
  }

  /**
   * Send custom event
   * @param {Object} data - Event data
   */
  sendCustomEvent(data) {
    this.emit("custom_event", data);
  }

  /**
   * Get current connection status
   * @returns {boolean} Connection status
   */
  getConnectionStatus() {
    return this.isConnected.value;
  }

  /**
   * Get messages array (reactive)
   * @returns {Ref} Reactive messages array
   */
  getMessages() {
    return this.messages;
  }

  /**
   * Clear messages
   */
  clearMessages() {
    this.messages.value = [];
  }

  /**
   * Get connected users count (reactive)
   * @returns {Ref} Reactive users count
   */
  getConnectedUsers() {
    return this.connectedUsers;
  }

  /**
   * Get connection error (reactive)
   * @returns {Ref} Reactive connection error
   */
  getConnectionError() {
    return this.connectionError;
  }

  /**
   * Get reconnect attempts (reactive)
   * @returns {Ref} Reactive reconnect attempts count
   */
  getReconnectAttempts() {
    return this.reconnectAttempts;
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;