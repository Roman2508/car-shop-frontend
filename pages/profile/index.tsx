import Head from 'next/head'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import ProfilePage from '@/components/templates/ProfilePage/ProfilePage'

function Profile() {
  const { shouldLoadContent } = useRedirectByUserCheck()
  const getDefaultTextGenerator = () => ''
  const getTextGenerator = () => ''

  return (
    <>
      <Head>
        <title>Профіль | {shouldLoadContent ? 'Главная' : ''}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
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
