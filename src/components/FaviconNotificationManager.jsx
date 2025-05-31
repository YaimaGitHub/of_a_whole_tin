"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import useFaviconNotification from "../hooks/useFaviconNotification"

const FaviconNotificationManager = () => {
  const router = useRouter()
  const { hasNewProducts, checkForNewProducts, markProductsAsSeen, clearNotifications } = useFaviconNotification()

  // Verificar productos nuevos cuando cambia la ruta
  useEffect(() => {
    const handleRouteChange = () => {
      // Pequeño delay para asegurar que la página se ha cargado
      setTimeout(() => {
        checkForNewProducts()
      }, 500)
    }

    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events, checkForNewProducts])

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

  // Limpiar notificaciones cuando el usuario interactúa con productos nuevos
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

  // Este componente no renderiza nada visible
  return null
}

export default FaviconNotificationManager
