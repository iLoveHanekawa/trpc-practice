import { initTRPC, inferAsyncReturnType } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'

export const createContext = ({req, res}: trpcExpress.CreateExpressContextOptions) => ({});
type context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<context>().create()

export const router = t.router
export const procudure = t.procedure
export const middleware = t.middleware

