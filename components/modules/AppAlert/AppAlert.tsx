import React from 'react'
import { toast } from 'sonner'
import { Toaster } from 'sonner'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '@/redux/store'
import { clearAppAlert, selectAppStatus } from '@/redux/appStatus/appStatusSlice'

const AppAlert: React.FC = () => {
  const dispatch = useAppDispatch()

  const { message, status } = useSelector(selectAppStatus)

  React.useEffect(() => {
    if (!message || !status) return

    toast[status](message)
    dispatch(clearAppAlert())
  }, [message, status, dispatch])

  return <Toaster expand richColors closeButton position="top-right" toastOptions={{ duration: 2500 }} />
}

export default AppAlert
