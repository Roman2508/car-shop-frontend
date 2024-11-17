import Head from 'next/head'

import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import ProfilePage from '@/components/templates/ProfilePage/ProfilePage'

const Profile = () => {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const getDefaultTextGenerator = () => 'Профіль'
  const getTextGenerator = () => ''

  return (
    <>
      <Head>
        <title>Профіль | {shouldLoadContent ? 'Головна' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/img/favicon/site.webmanifest"></link>
      </Head>
      {shouldLoadContent && (
        <Layout>
          <main>
            <Breadcrumbs getDefaultTextGenerator={getDefaultTextGenerator} getTextGenerator={getTextGenerator} />
            <ProfilePage />
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  )
}

export default Profile
