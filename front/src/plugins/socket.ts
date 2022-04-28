import { io } from 'socket.io-client'

const socketService = io('https://localhost:6443', {
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionAttempts: 1,
})
try {
  socketService.on('connect', () => {
    console.log('socket connected')
  })
  socketService.on('connect_error', () => {
    console.warn('socket connect error')
  })
  socketService.on('event', (message) => {
    console.log('on newMessage...', message)
  })
} catch (e) {
  console.warn(e)
}

export default {
  install: (app, options) => {
    app.provide('socket', socketService)
  },
}
