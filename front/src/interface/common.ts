export interface ApiService {
  [key: string]: (payload: Record<string, unknown>) => void
}
