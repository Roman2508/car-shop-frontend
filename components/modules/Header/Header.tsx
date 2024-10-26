import HeaderBottom from './HeaderBottom'
import HeaderTop from './HeaderTop'
import styles from '@/styles/header/index.module.scss'

const Header = ({ isAuthPage = false }: { isAuthPage: boolean }) => {
  return (
    <header className={styles.header}>
      <HeaderTop />

      {!isAuthPage && <HeaderBottom />}
    </header>
  )
}

export default Header
