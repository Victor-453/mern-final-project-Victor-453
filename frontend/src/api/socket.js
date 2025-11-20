import { io } from 'socket.io-client';

// In production, use same domain. In development, use localhost:5000
const SOCKET_URL =
  import.meta.env.VITE_API_BASE_URL?.replace('/api', '') ||
  (import.meta.env.MODE === 'production'
    ? window.location.origin
    : 'http://localhost:5000');

let socket = null;

export const initializeSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }
  return socket;
};

export const connectSocket = () => {
  const socketInstance = initializeSocket();
  if (!socketInstance.connected) {
    socketInstance.connect();
  }
  return socketInstance;
};

export const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
  }
};

export const getSocket = () => {
  return socket;
};

export default {
  initializeSocket,
  connectSocket,
  disconnectSocket,
  getSocket,
};
