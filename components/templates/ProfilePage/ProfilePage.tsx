import React from 'react'
import { useRouter } from 'next/router'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import styles from '@/styles/profile/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import ProfileForm from '@/components/modules/ProfilePage/ProfileForm'
import MesagesTab from '@/components/modules/ProfilePage/MesagesTab'
import Advertisements from '@/components/modules/ProfilePage/Advertisements'
import Administration from '@/components/modules/ProfilePage/Administration'

const tabs = [
  { link: 'profile', label: 'Профіль' },
  { link: 'messages', label: 'Повідомлення' },
  { link: 'advertisement', label: 'Мої оголошення' },
  { link: 'admin', label: 'Адміністрування' },
]

const ProfilePage = () => {
  const router = useRouter()

  const mode = useStore($mode)
  const isMobile560 = useMediaQuery(560)
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
            {tabs.map((el) => (
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
            ))}
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

              {activeTab === tabs[2].label && <Advertisements />}

              {activeTab === tabs[3].label && <Administration />}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProfilePage
