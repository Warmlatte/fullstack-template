/**
 * WebSocket Service
 * Handles Socket.IO events and provides utilities for real-time communication
 */

class SocketService {
  constructor() {
    this.io = null;
    this.connectedClients = new Map();
  }

  /**
   * Initialize the socket service with Socket.IO instance
   * @param {Server} io - Socket.IO server instance
   */
  initialize(io) {
    this.io = io;
    this.setupEventHandlers();
  }

  /**
   * Setup default event handlers
   */
  setupEventHandlers() {
    this.io.on("connection", (socket) => {
      console.log(`Client connected: ${socket.id}`);
      this.connectedClients.set(socket.id, {
        id: socket.id,
        connectedAt: new Date(),
        userAgent: socket.handshake.headers["user-agent"]
      });

      // Handle client identification
      socket.on("identify", (data) => {
        const client = this.connectedClients.get(socket.id);
        if (client) {
          client.userId = data.userId;
          client.username = data.username;
          this.connectedClients.set(socket.id, client);
        }
      });

      // Handle chat messages
      socket.on("chat_message", (data) => {
        const message = {
          id: Date.now(),
          text: data.text,
          username: data.username || "Anonymous",
          timestamp: new Date(),
          socketId: socket.id
        };
        
        // Broadcast to all connected clients
        this.io.emit("chat_message", message);
      });

      // Handle custom events
      socket.on("custom_event", (data) => {
        this.handleCustomEvent(socket, data);
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
        this.connectedClients.delete(socket.id);
      });
    });
  }

  /**
   * Handle custom events
   * @param {Socket} socket - Socket instance
   * @param {Object} data - Event data
   */
  handleCustomEvent(socket, data) {
    console.log("Custom event received:", data);
    // Implement custom logic here
    socket.emit("custom_response", {
      status: "received",
      originalData: data,
      timestamp: new Date()
    });
  }

  /**
   * Broadcast message to all connected clients
   * @param {string} event - Event name
   * @param {Object} data - Data to broadcast
   */
  broadcast(event, data) {
    if (this.io) {
      this.io.emit(event, data);
    }
  }

  /**
   * Send message to specific client
   * @param {string} socketId - Target socket ID
   * @param {string} event - Event name
   * @param {Object} data - Data to send
   */
  sendToClient(socketId, event, data) {
    if (this.io) {
      this.io.to(socketId).emit(event, data);
    }
  }

  /**
   * Send message to specific room
   * @param {string} room - Room name
   * @param {string} event - Event name
   * @param {Object} data - Data to send
   */
  sendToRoom(room, event, data) {
    if (this.io) {
      this.io.to(room).emit(event, data);
    }
  }

  /**
   * Join client to room
   * @param {string} socketId - Socket ID
   * @param {string} room - Room name
   */
  joinRoom(socketId, room) {
    const socket = this.io.sockets.sockets.get(socketId);
    if (socket) {
      socket.join(room);
      return true;
    }
    return false;
  }

  /**
   * Remove client from room
   * @param {string} socketId - Socket ID
   * @param {string} room - Room name
   */
  leaveRoom(socketId, room) {
    const socket = this.io.sockets.sockets.get(socketId);
    if (socket) {
      socket.leave(room);
      return true;
    }
    return false;
  }

  /**
   * Get connected clients count
   * @returns {number} Number of connected clients
   */
  getConnectedClientsCount() {
    return this.connectedClients.size;
  }

  /**
   * Get connected clients info
   * @returns {Array} Array of client information
   */
  getConnectedClients() {
    return Array.from(this.connectedClients.values());
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;