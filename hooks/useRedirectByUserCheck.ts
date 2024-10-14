import React from 'react'
import { checkUserAuthFx } from '@/app/api/auth'
import { setUser } from '@/context/user'
import { useRouter } from 'next/router'

const useRedirectByUserCheck = (isAuthPage = false) => {
  // const [shouldLoadContent, setShouldLoadContent] = React.useState(false)
  const [shouldLoadContent, setShouldLoadContent] = React.useState(true)
  const router = useRouter()
  const shouldCheckAuth = React.useRef(true)

  // React.useEffect(() => {
  //   if (shouldCheckAuth.current) {
  //     shouldCheckAuth.current = false
  //     checkUser()
  //   }
  // }, [])

  const checkUser = async () => {
    const user = await checkUserAuthFx('/users/login-check')

    if (isAuthPage) {
      if (!user) {
        setShouldLoadContent(true)
        return
      }

      router.push('/dashboard')
      return
    }

    if (user) {
      setUser(user)
      setShouldLoadContent(true)
      return
    }

    router.push('/')
  }

  return { shouldLoadContent }
}

export default useRedirectByUserCheck
