import Head from 'next/head'
import { useCallback } from 'react'
import Layout from '@/components/layout/Layout'
import AboutPage from '@/components/templates/AboutPage/AboutPage'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'

function About() {
  const getDefaultTextGenerator = useCallback(() => 'О компании', [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])

  return (
    <>
      <Head>
        <title>Car shop | О компании</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/img/favicon/site.webmanifest"></link>
      </Head>
      <Layout>
        <main>
          <Breadcrumbs getDefaultTextGenerator={getDefaultTextGenerator} getTextGenerator={getTextGenerator} />
          <AboutPage />
          <div className="overlay" />
        </main>
      </Layout>
    </>
  )
}

export default About
