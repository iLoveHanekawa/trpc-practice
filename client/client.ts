import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [ httpBatchLink({
    url: 'http://localhost:3000/trpc'
  }) ]
})

async function greet() {
  const greeting = await trpc.say.query('Arjun')
  console.log(greeting)
  return greeting
}

greet()