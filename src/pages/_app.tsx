import '@/styles/globals.css'
import { trpcClient } from '@/utils/trpc'
import type { AppProps } from 'next/app'

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default trpcClient.withTRPC(App)
