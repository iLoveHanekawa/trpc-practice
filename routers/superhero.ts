import { router } from "../server/server";
import { procedure } from "../server/server";
import { z } from 'zod'

export const superheroRouter = router({
    getSuperheroes: procedure.query(async() => {
        try {
            const res = await fetch('http://localhost:4000/superheroes')
            const data = await res.json()
            return { heroes: data }
        } catch (error) {
            if(error instanceof Error) console.log(error.message)
        }
    })
})