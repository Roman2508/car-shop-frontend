import React from 'react'
import { useStore } from 'effector-react'

import { $mode } from '@/context/mode'
import styles from '@/styles/ProfileForm/index.module.scss'
import GarbageSvg from '@/components/elements/GarbageSvg/GarbageSvg'

const MesagesTab = () => {
  const mode = useStore($mode)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={styles.messages__wrapper}>
      <div className={`${styles.messages__left_col} ${darkModeClass}`}>
        {/*  */}
        {Array(15)
          .fill(null)
          .map((el, index) => (
            <div className={`${styles.messages__chats_list_item} ${index === 1 ? styles.active : ''} ${darkModeClass}`}>
              <img
                src="https://m.atcdn.co.uk/ect/media/%7Bresize%7D/4b14ab0c7868451baf5912779f112f40.jpg"
                alt="advertisement avatar"
              />

              <div>
                <div className={styles.messages__chats_top}>
                  <p className={styles.messages__chats_nickname}>Nick Name</p>

                  <p className={styles.messages__chats_sending_time}>26.08 12:30</p>
                </div>
                <div className={styles.messages__chats_bottom}>
                  <p>АКТИВНЕ</p>
                  <h6>
                    Advertisement title Advertisement title Advertisement title Advertisement title Advertisement title
                  </h6>
                </div>

                <p className={styles.messages__chats_message_body}>
                  message message message message message message message message message message message message
                  message message message message message message
                </p>
              </div>
            </div>
          ))}
        {/*  */}
      </div>

      <div className={`${styles.messages__right_col} ${darkModeClass}`}>
        <div className={`${styles.messages__right_col_top} ${darkModeClass}`}>
          <div className={styles.messages__right_col_top_user_data}>
            <img src="https://thispersondoesnotexist.com/" alt="user avatar" />
            <p>Nick Name</p>
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
                <p className={styles.messages__chats_nickname}>Nick Name</p>

                <p className={styles.messages__chats_sending_time}>26.08 12:30</p>
              </div>
              <div className={styles.messages__chats_bottom}>
                <p>АКТИВНЕ</p>
                <h6>
                  Advertisement title Advertisement title Advertisement title Advertisement title Advertisement title
                </h6>
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
                <div className={`${styles.messages__right_col_chat_message_sending_time} ${darkModeClass}`}>12:45</div>
              </div>
            ))}
        </div>

        <div className={`${styles.messages__right_col_actions} ${darkModeClass}`}>
          <input placeholder="Напишіть повідомлення..." />
        </div>
      </div>
    </div>
  )
}

export default MesagesTab
