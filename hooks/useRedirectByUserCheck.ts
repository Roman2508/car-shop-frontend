import React from 'react'
import { checkUserAuthFx } from '@/app/api/auth'
import { setUser } from '@/context/user'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@/redux/store'
import { authAPI } from '@/api/api'
import { setUserData } from '@/redux/auth/authSlice'

const useRedirectByUserCheck = (isAuthPage = false) => {
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
      setUserData(user)
      setShouldLoadContent(true)

      if (router.route === '/') {
        router.push('/dashboard')
      }
      return
    }

    if (!user) {
      if (router.route === '/profile' || router.route === '/create-ad') {
        router.push('/')
      }

      setShouldLoadContent(true)
    }
  }

  return { shouldLoadContent }
}

export default useRedirectByUserCheck
