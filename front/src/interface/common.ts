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
}

export interface LineOptions {
  idName: string
  loadedData: []
  series: Series[]
}

export interface BarOptions {
  idName: string
  loadedData: []
  series: Series[]
}

export interface SiteOptions {
  idName: string
  loadedData: []
  series: Series[]
}

export interface PieOptions {
  idName: string
  loadedData: []
  series: Series[]
}
