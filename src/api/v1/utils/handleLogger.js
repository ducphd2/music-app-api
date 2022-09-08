import winston, { format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'path'
import * as rTracer from 'cls-rtracer'

const loggerFormatter = format.printf(({ level, message, originalTimestamp, ...metadata }) => {
  const rid = rTracer.id()
  const timestamp = new Date().toISOString()
  return JSON.stringify({
    '@timestamp': timestamp,
    level,
    message,
    traceId: rid,
    ...metadata,
  })
})

export const logger = winston.createLogger({
  format: format.combine(format.errors({ stack: true }), loggerFormatter, format.splat()),
  transports: [
    new DailyRotateFile({
      filename: `${prefixPath}logs/%DATE%.log`,
      datePattern: 'YYYY-MM-DD',
      maxFiles: 15,
      timestamp: true,
    }),
    new winston.transports.Console(),
  ],
})
