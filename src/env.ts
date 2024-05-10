import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['production', 'development', 'test']),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_NEXT_API_URL: z.string(),
  },
  runtimeEnv: {
    // Server
    NODE_ENV: process.env.NODE_ENV,

    // Client
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_NEXT_API_URL: process.env.NEXT_PUBLIC_NEXT_API_URL,
  },
})
