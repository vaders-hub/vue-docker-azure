import https from 'https'
import { Server } from 'socket.io'
import { app, options, PORT } from './configure'
import { isOperationalError } from './utils/error/errorHandler'

const httpsServer = https.createServer(options, app)

// connection.connect();
httpsServer.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`)
})

const io = new Server(httpsServer, {
  cors: {
    origin: ['http://localhost:3008'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})

io.on('connection', (socket) => {
  // socket.on('disconnect', function () {
  //   console.log('A user with ID: ' + socket.id + ' disconnected')
  // })

  // More Socket listening here.
  if (socket.connected) {
    socket.emit('connections', Object.keys(socket.connected).length)
  } else {
    socket.emit('connections', 0)
  }

  socket.on('event', function (data) {
    console.log('A client sent us this dumb message:', data)
  })
})

io.listen(3000)

process.on('unhandledRejection', (error) => {
  throw error
})

process.on('uncaughtException', (error) => {
  if (!isOperationalError(error)) {
    process.exit(1)
  }
})
