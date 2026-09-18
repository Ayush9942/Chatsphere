<p align="center">
  <img src="logo.png" alt="ChatSphere Logo" width="180">
</p>

<h1 align="center">ChatSphere</h1>

<p align="center">
  Real-time two-person browser chat
</p>
# ChatSphere 💬

ChatSphere is a lightweight, real-time **two-person web chat application** built with a simple frontend and a Cloudflare-based WebSocket signaling backend.

The project is currently focused on creating a fast and simple room-based chat system, with WebRTC P2P communication planned for a future version.

---

## 🌐 Live Demo

**Frontend:**  
https://chatsphere.pages.dev/

**Backend:**  
https://chatsphere-server.ayushranjan1492008.workers.dev/

---

## ✨ Current Features

### 🏠 Room System

- Create a new chat room
- Automatically generate a unique room code
- Copy room code with one click
- Enter a room using a room code
- Room codes are case-insensitive
- Back button to leave the chat screen

### 💬 Real-Time Messaging

- Send messages in real time
- Receive messages instantly
- Messages are displayed separately for:
  - Sent messages
  - Received messages
- Press **Enter** to send
- Automatic scrolling to the latest message
- Empty messages are ignored

### 🔌 Connection System

- Real-time WebSocket connection
- Connection status indicator
- Connected status
- Disconnected status
- Detects when another user leaves the room
- Automatically connects to the selected room

### ☁️ Cloudflare Backend

ChatSphere uses:

- Cloudflare Workers
- Cloudflare Durable Objects
- WebSockets

Each room code maps to a separate Durable Object room.

### 🌍 Multi-Browser Support

The current system has been tested between different browsers.

Example:

```text
Brave Browser
      │
      ▼
Cloudflare Worker
      │
      ▼
Durable Object
      │
      ▼
Edge Browser