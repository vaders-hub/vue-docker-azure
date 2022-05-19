import express, { Request, Response } from 'express'
import tableData from '../raw/table'
import lineData from '../raw/line'
import diagramData from '../raw/diagram.json'

const router = express.Router()

router.get('/member', async (req: Request, res: Response): Promise<any> => {
  res.json({ data: { code: '0000', token: 'abcdefg' } })
})

router.post('/member', async (req: Request, res: Response): Promise<any> => {
  res.status(201).json({ data: { code: '0000', token: 'abcdefg' } })
})

router.get('/data/table', async (req: Request, res: Response): Promise<any> => {
  res.status(201).json({ data: { code: '0000', rows: tableData } })
})

router.get('/data/line', async (req: Request, res: Response): Promise<any> => {
  res.status(201).json({ data: { code: '0000', rows: lineData } })
})

router.get('/data/diagram', async (req: Request, res: Response): Promise<any> => {
  res.status(201).json({ data: { code: '0000', rows: diagramData } })
})

export { router as indexRouter }
