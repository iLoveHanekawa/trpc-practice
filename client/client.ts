import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '../server/server'

const client = createTRPCProxyClient<AppRouter>({
    links: [ httpBatchLink({
        url: 'http://localhost:3000/trpc'
    }) ]
})

async function main() {
    const data = await client.findone.query('2')
    console.log(data)
}

main()
