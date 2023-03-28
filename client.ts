import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from ".";
import { userList } from ".";

const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000/trpc'
        })
    ]
})

console.log();

console.log(userList)

const createObject = async (name: string) => {
    const user = trpc.userCreate.mutate({ name: name })
}

createObject('Arjun')

console.log(userList)