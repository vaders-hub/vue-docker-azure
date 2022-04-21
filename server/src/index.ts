import https from 'https'
import { Server } from 'socket.io'
import { app, ioServer, options, PORT } from './configure'
import { isOperationalError } from './utils/error/errorHandler'

const httpsServer = https.createServer(options, app)

// connection.connect();
httpsServer.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`)
})

const io = new ioServer(httpsServer, {
  cors: {
    origin: ['http://localhost:3008'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
})

io.on('connection', (socket) => {
  socket.on('event', function (data) {
    console.log('A client sent us this dumb message:', data)
  })
})

process.on('unhandledRejection', (error) => {
  throw error
})

process.on('uncaughtException', (error) => {
  if (!isOperationalError(error)) {
    process.exit(1)
  }
})
