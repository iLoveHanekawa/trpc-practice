// import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
// import { type AppRouter } from '.'

// const trpc = createTRPCProxyClient<AppRouter>({
//     links: [
//         httpBatchLink({
//             url: 'http://localhost:3000/trpc'
//         })
//     ]
// })

// async function main() {
//     const { name } = await trpc.getUser.query("hi")
//     console.log(name)
// }

// main()