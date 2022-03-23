import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/member', async (req: Request, res: Response): Promise<any> => {
  console.log('req', req.query)
  res.status(200).send({ data: { code: '0000', login: 'ok' } })
})

export { router as indexRouter }
