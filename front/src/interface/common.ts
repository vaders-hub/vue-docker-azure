export interface ApiService {
  [key: string]: (payload: Record<string, unknown>) => void
}

export type SessionTimeout = {
  limit: number
  intvObj: number
  start: (this: SessionTimeout) => void
  reset: (this: SessionTimeout) => void
}

export type InputEvents = {
  initDetection: () => void
}
