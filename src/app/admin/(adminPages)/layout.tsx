"use client"

import { useRouter } from "next/navigation"
import type React from "react"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import axios from "axios"
import { setAuthToken, setUser } from "@/redux/features/authSlice"

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLogin } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const fetchProfile = async () => {
      if (isLogin) {
        try {
          const { data } = await axios.get("/users/profile")
          dispatch(setUser({ user: data }))
        } catch (error) {
          console.error("Failed to get user profile:", error)
          dispatch(setUser({ user: null }))
          dispatch(setAuthToken({ token: "" }))
          router.push("/admin/login")
        }
      } else {
        router.push("/admin/login")
      }
    }

    fetchProfile()
  }, [isLogin, dispatch, router])

  // If not logged in, don't render children
  if (!isLogin) {
    return null
  }

  return <>{children}</>
}

export default AuthLayout

