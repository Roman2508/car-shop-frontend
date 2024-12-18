import React from 'react'
import { io } from 'socket.io-client'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/redux/store'
import { formatDate } from '@/utils/formatDate'
import { authSelector } from '@/redux/auth/authSlice'
import { createImageUrl } from '@/utils/createImageUrl'
import { themeSelector } from '@/redux/theme/themeSlice'
import { DialogType } from '@/redux/dialogs/dialogsTypes'
import styles from '@/styles/profileForm/index.module.scss'
import GarbageSvg from '@/components/elements/GarbageSvg/GarbageSvg'
import { addMessage, dialogsSelector } from '@/redux/dialogs/dialogsSlice'
import { deleteDialog, getDialogs, getMessages } from '@/redux/dialogs/dialogsAsyncActions'

const MesagesTab = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const ref = React.useRef<HTMLDivElement>(null)

  const { auth } = useSelector(authSelector)
  const { dialogs, messages } = useSelector(dialogsSelector)

  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const [text, setText] = React.useState('')
  const [me, setMe] = React.useState<null | { id: number; username: string; avatarUrl: string }>(null)

  const socket = io(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:7777')

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

  const onDeleteDialog = async () => {
    if (!activeDalog) return
    if (!window.confirm('Ви дійсто хочете видалити діалог?\n(діалог буде видалено для всіх учасників)')) return
    try {
      await dispatch(deleteDialog(activeDalog.id))
      setActiveDialog(null)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    if (!activeDalog) return

    console.log(activeDalog)

    socket.on('connect', () => {
      dispatch(getMessages(activeDalog.id))
    })

    return () => {
      socket.off()
    }
  }, [activeDalog])

  React.useEffect(() => {
    if (!activeDalog || !auth) return
    const me = activeDalog.members.find((el) => el.id !== auth.id)
    if (me) setMe(me)
  }, [activeDalog, auth])

  React.useEffect(() => {
    if (messages && messages.length) {
      ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [messages])

  const sendMessage = () => {
    if (!activeDalog || !auth) return
    const message = {
      dialog: activeDalog.id,
      text: text,
      sender: auth.id,
    }

    socket.emit('sendMessage', message)
    setText('')
  }

  socket.on('recMessage', (message: any) => {
    if (message.dialog.id !== activeDalog?.id) return
    // @ts-ignore
    socket.on('connection', dispatch(addMessage(message)))
  })

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

  if (!auth) return <h1>Loading...</h1>

  return (
    <div className={styles.messages__wrapper}>
      <div className={`${styles.messages__left_col} ${darkModeClass}`}>
        {/*  */}
        {dialogs ? (
          dialogs.map((el) => {
            const filename = el.advertisement?.photos ? el.advertisement?.photos[0]?.filename : ''

            return (
              <div
                className={`${styles.messages__chats_list_item} ${
                  activeDalog?.id === el.id ? styles.active : ''
                } ${darkModeClass}`}
                onClick={() => {
                  updateRoteParam(String(el.id))
                  setActiveDialog(el)
                }}
              >
                <img src={createImageUrl(filename)} alt="advertisement image" />

                <div>
                  <div className={styles.messages__chats_top}>
                    <p className={styles.messages__chats_nickname}>
                      {el.members.find((el) => el.id !== auth?.id)?.username}
                    </p>

                    <p className={styles.messages__chats_sending_time}>{formatDate(el.advertisement.createdAt)}</p>
                  </div>
                  <div className={styles.messages__chats_bottom}>
                    <p>{el.advertisement.status}</p>
                  </div>
                  <div className={styles.messages__chats_bottom}>
                    <h6>{el.advertisement.title}</h6>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>У Вас поки немає діалогів</div>
        )}

        {/*  */}
      </div>

      {activeDalog ? (
        <div className={`${styles.messages__right_col} ${darkModeClass}`}>
          <div className={`${styles.messages__right_col_top} ${darkModeClass}`}>
            <div className={styles.messages__right_col_top_user_data}>
              {me ? (
                <img alt="user avatar" src={createImageUrl(me.avatarUrl || '')} />
              ) : (
                <div className={styles.messages__right_col_top_user_data_img}>
                  <p>{activeDalog.members.find((el) => el.id !== auth.id)?.username}</p>
                </div>
              )}
              <p>{me?.username}</p>
            </div>

            <div onClick={onDeleteDialog}>
              <GarbageSvg darkModeClass={darkModeClass} />
            </div>
          </div>

          <div className={`${styles.messages__right_col_advertisement} ${darkModeClass}`}>
            <div className={`${styles.messages__chats_list_item} ${darkModeClass}`}>
              <img
                src={createImageUrl(
                  activeDalog.advertisement?.photos ? activeDalog.advertisement?.photos[0]?.filename : ''
                )}
                alt="advertisement"
              />

              <div>
                <div className={styles.messages__chats_top}>
                  <p className={styles.messages__chats_nickname}>{me?.username}</p>

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
            {(messages || []).map((message) => {
              const isSelf = message.sender.id === auth?.id

              return (
                <div
                  className={`${`${styles.messages__right_col_chat_message} ${
                    isSelf ? styles.self : ''
                  }`} ${darkModeClass}`}
                >
                  <div
                    className={`${styles.messages__right_col_chat_message_body} ${darkModeClass}`}
                    style={isSelf ? { textAlign: 'right' } : {}}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`${styles.messages__right_col_chat_message_sending_time} ${darkModeClass}`}
                    style={isSelf ? { textAlign: 'right' } : {}}
                  >
                    {formatDate(message.sendAt, 'datetime')}
                  </div>
                </div>
              )
            })}

            <div ref={ref} />
          </div>

          <div className={`${styles.messages__right_col_actions} ${darkModeClass}`}>
            <input
              placeholder="Напишіть повідомлення..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.code === 'Enter' && sendMessage()}
            />
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
