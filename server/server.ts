import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import express, { Request, Response } from 'express'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from '../routers/_app'

const app = express()
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Goodbye, world!</h1>')
})

const t = initTRPC.create()
export const router = t.router
export const procedure = t.procedure

const port = Number(process.env.PORT) || 3000
app.use('/trpc', createExpressMiddleware({
    router: appRouter,
    createContext: () => ({})
}))
const start = (port: number) => {
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`)
    })
}

start(port)