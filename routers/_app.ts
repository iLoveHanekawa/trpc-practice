import { router } from "../server/server";
import { superheroRouter } from "./superhero";
export const appRouter = router({
    heroes: superheroRouter
})

export type AppRouter = typeof appRouter