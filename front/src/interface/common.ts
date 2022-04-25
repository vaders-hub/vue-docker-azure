export interface ApiService {
  [key: string]: (payload: Record<string, unknown>) => void
}

export type SessionTimeout = {
  limit: number
  intvObj: number
  start: () => void
  reset: () => void
}

export type InputEvents = {
  initDetection: () => void
}
