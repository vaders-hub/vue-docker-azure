import express, { Request, Response } from 'express'
import tableData from '../raw/table'

const router = express.Router()

router.get('/member', async (req: Request, res: Response): Promise<any> => {
  console.log('req', req.query)

  res.json({ data: { code: '0000', token: 'abcdefg' } })
})

router.post('/member', async (req: Request, res: Response): Promise<any> => {
  console.log('req', req.query)

  res.status(201).json({ data: { code: '0000', token: 'abcdefg' } })
})

router.get('/data/table', async (req: Request, res: Response): Promise<any> => {
  console.log('req', req.query)

  res.status(201).json({ data: { code: '0000', people: tableData } })
})

export { router as indexRouter }
