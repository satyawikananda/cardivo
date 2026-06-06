import process from 'node:process'
import { cleanEnv, str } from 'envalid'

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
  LOG_LEVEL: str({ choices: ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'], default: 'info' }),
  ALLOWED_IMAGE_HOST: str({ default: '*' }),
})

export type Env = typeof env
