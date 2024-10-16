import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useCallback, useEffect, useState } from 'react'
import { useStore } from 'effector-react'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import { IQueryParams } from '@/types/catalog'
import { $boilerPart, setBoilerPart } from '@/context/boilerPart'
import { getBoilerPartFx } from '@/app/api/boilerParts'
import PartPage from '@/components/templates/PartPage/PartPage'
import Custom404 from '../404'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import { useAppDispatch } from '@/redux/store'
import { getAdvertisementById } from '@/redux/advertisements/advertisementsAsyncActions'
import { useSelector } from 'react-redux'
import { advertisementsSelector } from '@/redux/advertisements/advertisementsSlice'

function CatalogPartPage({ query }: { query: IQueryParams }) {
  const dispatch = useAppDispatch()

 

  const { shouldLoadContent } = useRedirectByUserCheck()
  const boilerPart = useStore($boilerPart)
  const [error, setError] = useState(false)
  const router = useRouter()
  const getDefaultTextGenerator = useCallback((subpath: string) => subpath.replace('catalog', 'Каталог'), [])
  const getTextGenerator = useCallback((param: string) => ({}[param]), [])
  const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

  useEffect(() => {
    loadBoilerPart()
  }, [router.asPath])

  useEffect(() => {
    if (lastCrumb) {
      lastCrumb.textContent = boilerPart.name
    }
  }, [lastCrumb, boilerPart])

  const loadBoilerPart = async () => {
    try {
      // const data = await getBoilerPartFx(`/boiler-parts/find/${query.partId}`)
      
      await dispatch(getAdvertisementById(query.partId))

      // if (!data) {
      //   setError(true)
      //   return
      // }

      const data = {
        id: 1,
        boiler_manufacturer: 'Bosch',
        price: 299.99,
        parts_manufacturer: 'Siemens',
        vendor_code: 'BOS-001',
        name: 'Heat Exchanger',
        description:
          'High-efficiency heat exchanger for Bosch boilers. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis debitis quisquam nemo eaque? Consequatur eius repellat aut vel fugit iusto adipisci. Voluptatibus recusandae velit nobis cumque cupiditate laudantium mollitia in.',
        images: JSON.stringify([
          'https://el.kz/storage/storage/element/2023/12/04/mainphoto/79454/1200xauto_KLC4GWu2jz6bzzQMIyUkCySKs6nDBsKzZX8A6uP1.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/c/ce/Cybertruck-fremont-cropped.jpg',
          'https://www.topgear.com/sites/default/files/cars-car/image/2023/11/1-Tesla-Cybertruck-review.jpg?w=1280&h=720',
          'https://cdn.geekwire.com/wp-content/uploads/2024/03/cybertruck1.jpeg',
          'https://nextcar.ua/images/blog/568/tesla-cybertruck__1_.jpg',
          'https://autopark.ua/photos/8/Statti/stattya0801-1.jpg',
        ]),
        in_stock: 50,
        bestseller: true,
        new: false,
        popularity: 85,
        compatibility: 'Bosch Series 5000',
      }

      setBoilerPart(data)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <>
      <Head>
        <title>Car Shop | {shouldLoadContent ? boilerPart.name : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
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
