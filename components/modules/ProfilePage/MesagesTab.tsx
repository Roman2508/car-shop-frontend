import React from 'react'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import styles from '@/styles/ProfileForm/index.module.scss'
import GarbageSvg from '@/components/elements/GarbageSvg/GarbageSvg'
import { useAppDispatch } from '@/redux/store'
import { getDialogs } from '@/redux/dialogs/dialogsAsyncActions'
import { useSelector } from 'react-redux'
import { authSelector } from '@/redux/auth/authSlice'
import { dialogsSelector } from '@/redux/dialogs/dialogsSlice'
import { DialogType } from '@/redux/dialogs/dialogsTypes'
import { formatDate } from '@/utils/formatDate'
import { createImageUrl } from '@/utils/createImageUrl'
import { useRouter } from 'next/router'

const MesagesTab = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { auth } = useSelector(authSelector)
  const { dialogs } = useSelector(dialogsSelector)

  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const [activeDalog, setActiveDialog] = React.useState<DialogType | null>(null)

  const updateRoteParam = (id: string) =>
    router.push(
      {
        query: {
          ...router.query,
          id,
        },
      },
      undefined,
      { shallow: true }
    )

  React.useEffect(() => {
    if (!auth) return
    dispatch(getDialogs(auth.id))
  }, [])

  React.useEffect(() => {
    if (!router.query.id || !dialogs) return
    const activeDialog = dialogs.find((el) => el.id === Number(router.query.id))
    if (!activeDialog) return
    setActiveDialog(activeDialog)
  }, [router.query.id, dialogs])

  return (
    <div className={styles.messages__wrapper}>
      <div className={`${styles.messages__left_col} ${darkModeClass}`}>
        {/*  */}
        {dialogs ? (
          dialogs.map((el) => (
            <div
              className={`${styles.messages__chats_list_item} ${
                activeDalog?.id === el.id ? styles.active : ''
              } ${darkModeClass}`}
              onClick={() => {
                updateRoteParam(String(el.id))
                setActiveDialog(el)
              }}
            >
              <img src={createImageUrl(el.advertisement?.photos[0]?.filename)} alt="advertisement image" />

              <div>
                <div className={styles.messages__chats_top}>
                  <p className={styles.messages__chats_nickname}>
                    {el.members.find((el) => el.id !== auth?.id)?.username}
                  </p>

                  <p className={styles.messages__chats_sending_time}>{formatDate(el.advertisement.createdAt)}</p>
                </div>
                <div className={styles.messages__chats_bottom}>
                  <p>{el.advertisement.status}</p>
                  <h6>{el.advertisement.title}</h6>
                </div>

                <p className={styles.messages__chats_message_body}>message message message message message message</p>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>У Вас поки немає діалогів</div>
        )}

        {/*  */}
      </div>

      {activeDalog ? (
        <div className={`${styles.messages__right_col} ${darkModeClass}`}>
          <div className={`${styles.messages__right_col_top} ${darkModeClass}`}>
            <div className={styles.messages__right_col_top_user_data}>
              {activeDalog.members.find((el) => el.id !== auth?.id)?.avatarUrl ? (
                <img
                  alt="user avatar"
                  src={createImageUrl(activeDalog.members.find((el) => el.id !== auth?.id)?.avatarUrl || '')}
                />
              ) : (
                <div className={styles.messages__right_col_top_user_data_img}>
                  <p>{activeDalog.members.find((el) => el.id !== auth?.id)?.username[0]}</p>
                </div>
              )}
              <p>{activeDalog.members.find((el) => el.id !== auth?.id)?.username}</p>
            </div>

            <GarbageSvg darkModeClass={darkModeClass} />
          </div>

          <div className={`${styles.messages__right_col_advertisement} ${darkModeClass}`}>
            <div className={`${styles.messages__chats_list_item} ${darkModeClass}`}>
              <img
                src="https://m.atcdn.co.uk/ect/media/%7Bresize%7D/4b14ab0c7868451baf5912779f112f40.jpg"
                alt="advertisement avatar"
              />

              <div>
                <div className={styles.messages__chats_top}>
                  <p className={styles.messages__chats_nickname}>
                    {activeDalog.members.find((el) => el.id !== auth?.id)?.username}
                  </p>

                  <p className={styles.messages__chats_sending_time}>
                    {formatDate(activeDalog.advertisement.createdAt)}
                  </p>
                </div>
                <div className={styles.messages__chats_bottom}>
                  <p style={{ width: 'auto' }}>{activeDalog.advertisement.status}</p>
                  <h6 style={{ maxWidth: '600px' }}>{activeDalog.advertisement.title}</h6>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.messages__right_col_chat}>
            {Array(15)
              .fill(null)
              .map((el, index) => (
                <div
                  className={`${`${styles.messages__right_col_chat_message} ${
                    index % 2 == 0 ? styles.self : ''
                  }`} ${darkModeClass}`}
                >
                  <div className={`${styles.messages__right_col_chat_message_body} ${darkModeClass}`}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s.
                  </div>
                  <div className={`${styles.messages__right_col_chat_message_sending_time} ${darkModeClass}`}>
                    12:45
                  </div>
                </div>
              ))}
          </div>

          <div className={`${styles.messages__right_col_actions} ${darkModeClass}`}>
            <input placeholder="Напишіть повідомлення..." />
          </div>
        </div>
      ) : (
        <div
          style={{ padding: '40px 20px', textAlign: 'center' }}
          className={`${styles.messages__right_col} ${darkModeClass}`}
        >
          <h3 style={{ fontWeight: 500 }}>Виберіть кому б хотіли написати</h3>
        </div>
      )}
    </div>
  )
}

export default MesagesTab
