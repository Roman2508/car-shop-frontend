import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { withHydrate } from 'effector-next'
import { useEffect, useState } from 'react'
import NextNProgress from 'nextjs-progressbar'

import '@/styles/globals.css'
import { store } from '@/redux/store'
import 'react-toastify/dist/ReactToastify.css'
import AppAlert from '@/components/modules/AppAlert/AppAlert'

const enhance = withHydrate()

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted && (
      <Provider store={store}>
        <NextNProgress />
        <Component {...pageProps} />

        <AppAlert />
      </Provider>
    )
  )
}

export default enhance(App as React.FC<AppProps>)
