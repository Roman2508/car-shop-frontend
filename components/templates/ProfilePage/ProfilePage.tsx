import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { authSelector } from '@/redux/auth/authSlice'
import styles from '@/styles/profile/index.module.scss'
import { themeSelector } from '@/redux/theme/themeSlice'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const UsersTab = dynamic(() => import('@/components/modules/ProfilePage/UsersTab'), { ssr: false })
const MesagesTab = dynamic(() => import('@/components/modules/ProfilePage/MesagesTab'), { ssr: false })
const ProfileForm = dynamic(() => import('@/components/modules/ProfilePage/ProfileForm'), { ssr: false })
const Administration = dynamic(() => import('@/components/modules/ProfilePage/Administration'), { ssr: false })
const MyAdvertisements = dynamic(() => import('@/components/modules/ProfilePage/MyAdvertisements'), { ssr: false })

const tabs = [
  { link: 'profile', label: 'Профіль' },
  { link: 'messages', label: 'Повідомлення' },
  { link: 'advertisement', label: 'Мої оголошення' },
  { link: 'admin', label: 'Адміністрування' },
  { link: 'users', label: 'Користувачі' },
]

const ProfilePage = () => {
  const router = useRouter()

  const { auth } = useSelector(authSelector)
  const { mode } = useSelector(themeSelector)

  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const [activeTab, setActiveTab] = React.useState<string | null>(null)

  const updateRoteParam = (tab: string) =>
    router.push(
      {
        query: {
          ...router.query,
          tab,
        },
      },
      undefined,
      { shallow: true }
    )

  React.useEffect(() => {
    switch (router.query.tab) {
      case tabs[0].link:
        setActiveTab(tabs[0].label)
        break
      case tabs[1].link:
        setActiveTab(tabs[1].label)
        break
      case tabs[2].link:
        setActiveTab(tabs[2].label)
        break
      case tabs[3].link:
        setActiveTab(tabs[3].label)
        break
      case tabs[4].link:
        setActiveTab(tabs[4].label)
        break
      default:
        setActiveTab(tabs[0].label)
        break
    }
  }, [router.query.tab])

  return (
    <section className={styles.profile}>
      <div className="container">
        <div className={styles.profile__top}>
          <h2 className={`${styles.profile__title} ${darkModeClass}`}>{activeTab}</h2>

          <ul className={styles.profile__tabs}>
            {tabs.map((el) => {
              const isAdmin = auth?.role === 'ADMIN' || auth?.role === 'SUPER_ADMIN'

              if (!isAdmin && el.link === 'admin') {
                return
              }
              if (!isAdmin && el.link === 'users') {
                return
              }

              return (
                <li
                  className={`${styles.profile__tab} ${activeTab === el.label ? styles.active : ''} ${darkModeClass}`}
                  key={el.link}
                  onClick={() => {
                    updateRoteParam(el.link)
                    setActiveTab(el.label)
                  }}
                >
                  {el.label}
                </li>
              )
            })}
          </ul>
        </div>

        <div className={styles.profile__inner}>
          {!activeTab ? (
            <div style={{ position: 'relative', padding: '40px' }}>
              <span
                className={spinnerStyles.spinner}
                style={{ top: '50%', left: '47%', width: '40px', height: '40px' }}
              />
            </div>
          ) : (
            <>
              {activeTab === tabs[0].label && <ProfileForm />}

              {activeTab === tabs[1].label && <MesagesTab />}

              {activeTab === tabs[2].label && <MyAdvertisements />}

              {activeTab === tabs[3].label && <Administration />}

              {activeTab === tabs[4].label && <UsersTab />}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
