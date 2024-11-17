import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { ICrumbProps } from '@/types/common'
import { themeSelector } from '@/redux/theme/themeSlice'
import styles from '@/styles/breadcrumbs/index.module.scss'
import CrumbArrowSvg from '@/components/elements/CrumbArrowSvg/CrumbArrowSvg'

const Crumb = ({ text: defaultText, textGenerator, href, last = false }: ICrumbProps) => {
  const [text, setText] = useState(defaultText)
  const { mode } = useSelector(themeSelector)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  useEffect(() => {
    handleTextGenerate()
  }, [textGenerator])

  const handleTextGenerate = async () => {
    if (!Boolean(textGenerator)) {
      return
    }

    const finalText = await textGenerator()
    setText(finalText)
  }

  if (last) {
    return (
      <a>
        <span className={`${styles.breadcrumbs__item__icon} ${darkModeClass}`} style={{ marginRight: 13 }}>
          <CrumbArrowSvg />
        </span>
        <span className={`last-crumb ${styles.breadcrumbs__item__text}`}>{text}</span>
      </a>
    )
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <a>
        <span className={`${styles.breadcrumbs__item__icon} ${darkModeClass}`} style={{ marginRight: 13 }}>
          <CrumbArrowSvg />
        </span>
        <span className={styles.breadcrumbs__item__text}>{text}</span>
      </a>
    </Link>
  )
}

export default Crumb
