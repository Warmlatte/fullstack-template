import app from "./app.js";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";

const port = process.env.PORT || 8080;

const server = http.createServer(app);

// Initialize Socket.IO with CORS configuration
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Basic event handlers
  socket.on("message", (data) => {
    console.log("Message received:", data);
    // Broadcast to all clients
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Make io instance available to other modules
app.set("socketio", io);

server.listen(port, "::", () => {
  console.log(`Server running on port ${port}`);
  console.log(`WebSocket server ready`);
});
