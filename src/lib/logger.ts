import winston from 'winston'
import { env } from './env'

const { combine, timestamp, errors, splat, json, colorize, printf, align } = winston.format

const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({ format: 'HH:MM:ss' }),
  align(),
  printf((info) => {
    const { level, message, timestamp: ts, ...meta } = info
    const splatKeys = (info as { splat?: unknown[] }).splat
    const splatObj = Array.isArray(splatKeys) && splatKeys.length > 0 && typeof splatKeys[0] === 'object'
      ? splatKeys[0] as Record<string, unknown>
      : {}
    const merged = { ...meta, ...splatObj }
    const metaStr = Object.keys(merged).length ? ` ${JSON.stringify(merged)}` : ''
    return `${ts} ${level} ${message}${metaStr}`
  }),
)

const fileFormat = combine(timestamp(), errors({ stack: true }), splat(), json())

export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  defaultMeta: { service: 'cardivo' },
  transports: [
    new winston.transports.Console({
      format: env.NODE_ENV === 'production' ? fileFormat : consoleFormat,
    }),
  ],
})
