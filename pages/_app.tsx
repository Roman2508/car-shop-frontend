import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import NextNProgress from 'nextjs-progressbar'

import '@/styles/globals.css'
import { store } from '@/redux/store'
import 'react-toastify/dist/ReactToastify.css'
import AppAlert from '@/components/modules/AppAlert/AppAlert'

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted && (
      <Provider store={store}>
        <NextNProgress color="#1c629e" height={5} />
        <Component {...pageProps} />

        <AppAlert />
      </Provider>
    )
  )
}

export default App
