import express, { Application, Request, Response } from 'express'
import { indexRouter } from './routes/index'

const routes = (app: Application): void => {
  app.all('/*', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    next()
  })
  app.use('/api', indexRouter)
}

export default routes
