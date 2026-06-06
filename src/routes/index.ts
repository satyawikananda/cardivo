import type { Routes } from '../app'
import { handler as card } from './card'

export const routes: Routes = [
  ['GET', '/api', card],
  ['GET', '/api/card', card],
]
