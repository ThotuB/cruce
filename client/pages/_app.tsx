import type { AppProps } from 'next/app'
import "tailwindcss/tailwind.css"
import Layout from 'layouts/Layout'
import { UserProvider } from 'contexts/UserContext'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

global.XMLHttpRequest = require("xhr2")

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Cruce</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <UserProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </UserProvider>
            </QueryClientProvider>
        </>
    )
}

export default App
