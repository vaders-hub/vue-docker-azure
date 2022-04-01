import { v4 as uuidv4 } from 'uuid'

export interface Item {
  id: string
  name: string
  description?: string
  quantity: number
  createdAt: Date
  deletedAt?: Date
}

export function generateFakeData(): Item {
  return {
    id: uuidv4(),
    quantity: Math.random(),
    name: 'temp',
    description: 'temp',
    createdAt: new Date(),
  }
}
