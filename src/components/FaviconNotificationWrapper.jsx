"use client"

import { useEffect } from "react"
import useFaviconNotification from "../hooks/useFaviconNotification"

const FaviconNotificationWrapper = () => {
  const { hasNewProducts, checkForNewProducts, clearNotifications } = useFaviconNotification()

  // Verificar productos nuevos al montar
  useEffect(() => {
    checkForNewProducts()
  }, [checkForNewProducts])

  // Verificar cuando la ventana vuelve a tener foco
  useEffect(() => {
    const handleFocus = () => {
      checkForNewProducts()
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkForNewProducts()
      }
    }

    window.addEventListener("focus", handleFocus)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      window.removeEventListener("focus", handleFocus)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [checkForNewProducts])

  // Limpiar notificaciones cuando el usuario ve productos nuevos
  useEffect(() => {
    const handleNewProductsViewed = (event) => {
      if (event.detail && event.detail.action === "viewedNewProducts") {
        clearNotifications()
      }
    }

    window.addEventListener("newProductsViewed", handleNewProductsViewed)
    return () => {
      window.removeEventListener("newProductsViewed", handleNewProductsViewed)
    }
  }, [clearNotifications])

  return null
}

export default FaviconNotificationWrapper
