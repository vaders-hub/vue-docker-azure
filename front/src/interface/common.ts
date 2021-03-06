import type { Color } from 'csstype'

export interface ApiService {
  [key: string]: (payload: Record<string, unknown>) => void
}

export type SessionTimeout = {
  limit: number
  intvObj: any
  start: (this: SessionTimeout) => void
  reset: (this: SessionTimeout) => void
}

export type InputEvents = {
  initDetection: () => void
}

interface Series {
  value: string
  name: string
  color?: string
  point?: any
}

export interface Point {
  shape: string // "circle" "square" "polygon" "triangleDown" "triangleUp"
  color: string
}

export interface LineOptions {
  idName: string
  loadedData: []
  series: Series[]
  style?: any
}

export interface BarOptions {
  idName: string
  loadedData: []
  series: Series[]
}

export interface StackedBarOptions {
  idName: string
  loadedData: []
  series: Series[]
}

export interface PieOptions {
  idName: string
  loadedData: []
  series: Series[]
}

export interface DoughnutOptions {
  idName: string
  loadedData: []
  series: Series[]
}

export interface PolygonalLineOptions {
  idName: string
  loadedData: []
  series: Series[]
}
