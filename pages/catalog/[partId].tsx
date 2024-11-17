import Head from 'next/head'
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'

import Custom404 from '../404'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/redux/store'
import { IQueryParams } from '@/types/catalog'
import Layout from '@/components/layout/Layout'
import PartPage from '@/components/templates/PartPage/PartPage'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { advertisementsSelector } from '@/redux/advertisements/advertisementsSlice'
import { getAdvertisementById } from '@/redux/advertisements/advertisementsAsyncActions'

function CatalogPartPage({ query }: { query: IQueryParams }) {
  const dispatch = useAppDispatch()

  const { fullAdvertisement } = useSelector(advertisementsSelector)

  const { shouldLoadContent } = useRedirectByUserCheck()
  const [error, setError] = useState(false)
  const router = useRouter()
  const getDefaultTextGenerator = useCallback((subpath: string) => subpath.replace('catalog', 'Каталог'), [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])
  const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

  useEffect(() => {
    loadAdvertisements()
  }, [router.asPath])

  useEffect(() => {
    if (!fullAdvertisement) return

    if (lastCrumb) {
      lastCrumb.textContent = fullAdvertisement.title
    }
  }, [lastCrumb, fullAdvertisement])

  const loadAdvertisements = async () => {
    const { payload } = await dispatch(getAdvertisementById(Number(query.partId)))

    if (!payload) {
      setError(true)
      return
    }
  }

  return (
    <>
      <Head>
        <title>Car Shop | {shouldLoadContent && fullAdvertisement ? fullAdvertisement.title : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/img/favicon/site.webmanifest"></link>
      </Head>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <Layout>
            <main>
              <Breadcrumbs getDefaultTextGenerator={getDefaultTextGenerator} getTextGenerator={getTextGenerator} />
              <PartPage />
              <div className="overlay" />
            </main>
          </Layout>
        )
      )}
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query } },
  }
}

export default CatalogPartPage
