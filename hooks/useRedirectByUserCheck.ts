import React from 'react'
import { useRouter } from 'next/router'

import { authAPI } from '@/api/api'
import { useAppDispatch } from '@/redux/store'
import { setUserData } from '@/redux/auth/authSlice'

const useRedirectByUserCheck = () => {
  const dispatch = useAppDispatch()

  const [shouldLoadContent, setShouldLoadContent] = React.useState(false)
  const router = useRouter()
  const shouldCheckAuth = React.useRef(true)

  React.useEffect(() => {
    if (shouldCheckAuth.current) {
      shouldCheckAuth.current = false
      checkUser()
    }
  }, [])

  const checkUser = async () => {
    const { data: user } = await authAPI.getMe()

    if (user) {
      dispatch(setUserData(user))
      setShouldLoadContent(true)

      if (router.route === '/auth') {
        router.push('/')
      }
      return
    }

    if (!user) {
      if (router.asPath.includes('/profile') || router.route === '/create-ad') {
        router.push('/auth')
      }

      setShouldLoadContent(true)
    }
  }

  return { shouldLoadContent }
}

export default useRedirectByUserCheck
