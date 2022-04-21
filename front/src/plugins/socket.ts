import { io } from 'socket.io-client'

const socketService = io('https://localhost:443')
socketService.on('connect', () => {
  console.log('socket connected')
})
socketService.on('event', (message) => {
  console.log('on newMessage...', message)
})

export default {
  install: (app, options) => {
    app.provide('socket', socketService)
  },
}
