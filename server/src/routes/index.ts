import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/member', async (req: Request, res: Response): Promise<any> => {
  console.log('req', req.query)

  res.json({ data: { code: '0000', token: 'abcdefg' } })
})

router.post('/member', async (req: Request, res: Response): Promise<any> => {
  console.log('req', req.query)

  res.status(201).json({ data: { code: '0000', token: 'abcdefg' } })
})

export { router as indexRouter }
