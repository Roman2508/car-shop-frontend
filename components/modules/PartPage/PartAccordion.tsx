/* eslint-disable @next/next/no-img-element */
import { useSelector } from 'react-redux'

import { IPartAccordionProps } from '@/types/part'
import styles from '@/styles/part/index.module.scss'
import { themeSelector } from '@/redux/theme/themeSlice'
import Accordion from '@/components/elements/Accordion/Accordion'

const PartAccordion = ({ children, title }: IPartAccordionProps) => {
  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const handleExpandAccordion = (expanded: boolean) => {
    const accordionTitles = document.querySelectorAll(`.${styles.part__accordion__title}`)

    accordionTitles.forEach((title) => {
      const item = title as HTMLElement

      if (!expanded) {
        item.style.borderBottomLeftRadius = '0'
        item.style.borderBottomRightRadius = '0'
      } else {
        item.style.borderBottomLeftRadius = '4px'
        item.style.borderBottomRightRadius = '4px'
      }
    })
  }

  return (
    <Accordion
      title={title}
      titleClass={`${styles.part__accordion__title} ${darkModeClass}`}
      arrowOpenClass={styles.open}
      boxShadowStyle="0px 2px 8px rgba(0, 0, 0, 0.1)"
      callback={handleExpandAccordion}
    >
      {children}
    </Accordion>
  )
}

export default PartAccordion
