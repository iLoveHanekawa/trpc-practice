import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import express, { Request, Response } from 'express'
import { createExpressMiddleware } from '@trpc/server/adapters/express'

const app = express()
app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Goodbye, world!</h1>')
})

const t = initTRPC.create()
const appRouter = t.router({
    findmany: t.procedure.query(async() => {
        const res = await fetch('http://localhost:4000/superheroes')
        const data = await res.json()
        return { heroes: data }
    }),
    findone: t.procedure.input(z.number()).query(async(req) => {
        const { input } = req
        const res = await fetch(`http://localhost:4000/superheroes/${input}`)
        console.log(`http://localhost:4000/superheroes/${input}`)
        const data = await res.json()
        return { hero: data }
    }),
    create: t.procedure.input(z.object({
        name: z.string(),
        alterEgo: z.string()
    })).mutation(async (req) => {
        const { input } = req
        const hero = await fetch('http://localhost:4000/superheroes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        const data = await hero.json()
        return { hero: data }
    }),
    delete: t.procedure.input(z.number()).mutation(async(req) => {
        const { input } = req
        await fetch(`http://localhost:4000/superheroes/${input}`, {
            method: 'DELETE'
        })
    }),
    update: t.procedure.input(z.object({
        id: z.number(),
        name: z.string()
    })).mutation(async (req) => {
        const { input } = req
        const hero = await fetch(`http://localhost:4000/superheroes/${input.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: input.name })
        })
        return { hero }
    })
})


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

export type AppRouter = typeof appRouter