import express, { Request, Response, NextFunction, Application } from 'express'
import { Server as ioServer } from 'socket.io'
import path from 'path'
import fs from 'fs'
// import mysql from 'mysql2'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes'
import cookieParser from 'cookie-parser'
import {} from './types/global'

try {
  dotenv.config({
    path: path.resolve(String(process.env.NODE_ENV).trim() === 'development' ? '.env.dev' : '.env'),
  })
} catch (e) {
  console.warn(e)
}

const app: Application = express()
const PORT: number | string = process.env.PORT || 6443
// const connection: mysql.Connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PWD,
//   database: process.env.DB_NAME,
//   timezone: 'Z',
// })

// global.db = connection

const corsOptions: any = {
  changeOrigin: true,
  target: ['http://localhost:3008', 'http://localhost:8081'],
}

const options = {
  key: fs.readFileSync(__dirname + `${process.env.KEY_FILE}`),
  cert: fs.readFileSync(__dirname + `${process.env.CERT_FILE}`),
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

routes(app)

export { app, ioServer, options, PORT }
