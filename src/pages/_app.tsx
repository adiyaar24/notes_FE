// src/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { NoteContextProvider } from '@/context/NoteContext'
import { AuthProvider } from '@/context/AuthContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <NoteContextProvider>
          <Component {...pageProps} />
        </NoteContextProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}
