import { initTRPC } from "@trpc/server";
import express from 'express'
import { createExpressMiddleware } from '@trpc/server/adapters/express'

const app = express();

const t = initTRPC.create();

const appRouter = t.router({
  say: t.procedure.input(v => {
    if(typeof v === 'string') return v
    throw new Error('Type of arg is not string')
  }).query(req => {
    const { input } = req
    return `Hello, ${input}`
  })
})

app.get('/', (req, res) => {
  res.send('<h1>Hi, mom</h1>')
}) 

app.use('/trpc', createExpressMiddleware({
  router: appRouter
}))

app.listen(3000, () => { console.log('Server listening at http://localhost:3000')})

export type AppRouter = typeof appRouter