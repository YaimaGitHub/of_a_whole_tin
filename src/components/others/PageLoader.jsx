"use client"

import { useEffect, useState } from "react"
import Loader from "./Loader"

export default function PageLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time (you can remove this in production)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return <Loader message="Yero Shop de todo un tin" />
}
