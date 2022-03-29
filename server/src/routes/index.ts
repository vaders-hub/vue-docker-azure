import express, { Request, Response } from 'express'

const router = express.Router()

router.get('/member', async (req: Request, res: Response): Promise<any> => {
  console.log('req', req.query)

  res
    .set('Content-Type', 'application/json; charset=utf-8')
    .status(201)
    .json({ data: { code: '0000', token: 'abcdefg' } })
})

export { router as indexRouter }
