"use client"

import { useEffect, useRef } from "react"
import { useRecentProducts } from "../../hooks/useRecentProducts"
import { getFaviconBadge } from "../../utils/faviconBadge"

const FaviconClickHandler = () => {
  const { recentCount, toggleNotification, isClient } = useRecentProducts()
  const faviconBadgeRef = useRef(null)
  const overlayRef = useRef(null)
  const keyListenerRef = useRef(null)

  // Inicializar favicon badge solo en el cliente
  useEffect(() => {
    if (!isClient) return

    faviconBadgeRef.current = getFaviconBadge()
  }, [isClient])

  // Actualizar badge del favicon cuando cambie el conteo
  useEffect(() => {
    if (!isClient || !faviconBadgeRef.current) return

    faviconBadgeRef.current.updateBadge(recentCount)
  }, [recentCount, isClient])

  // Actualizar el título de la página
  useEffect(() => {
    if (!isClient || typeof document === "undefined") return

    const updateTitle = () => {
      const baseTitle = "Efectos - Tu tienda online"

      if (recentCount > 0) {
        document.title = `(${recentCount}) ${baseTitle}`
      } else {
        document.title = baseTitle
      }
    }

    updateTitle()

    return () => {
      if (typeof document !== "undefined") {
        document.title = "Efectos - Tu tienda online"
      }
    }
  }, [recentCount, isClient])

  // Manejar eventos de teclado
  useEffect(() => {
    if (!isClient || typeof document === "undefined") return

    const handleKeyPress = (e) => {
      if (e.altKey && e.key.toLowerCase() === "f") {
        e.preventDefault()
        toggleNotification()
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    keyListenerRef.current = handleKeyPress

    return () => {
      if (keyListenerRef.current) {
        document.removeEventListener("keydown", keyListenerRef.current)
      }
    }
  }, [toggleNotification, isClient])

  // Crear área clickeable para simular click en favicon
  useEffect(() => {
    if (!isClient || typeof document === "undefined") return

    // Limpiar overlay anterior
    if (overlayRef.current && overlayRef.current.parentNode) {
      overlayRef.current.parentNode.removeChild(overlayRef.current)
    }

    if (recentCount > 0) {
      // Crear overlay invisible para capturar clicks
      const overlay = document.createElement("div")
      overlay.style.cssText = `
        position: fixed;
        top: 10px;
        left: 10px;
        width: 32px;
        height: 32px;
        z-index: 10000;
        cursor: pointer;
        background: transparent;
        border-radius: 4px;
        pointer-events: auto;
      `

      overlay.title = `${recentCount} productos agregados recientemente - Click para ver (Alt+F)`

      const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleNotification()
      }

      overlay.addEventListener("click", handleClick)
      document.body.appendChild(overlay)
      overlayRef.current = overlay
    }

    return () => {
      if (overlayRef.current && overlayRef.current.parentNode) {
        overlayRef.current.parentNode.removeChild(overlayRef.current)
      }
    }
  }, [recentCount, toggleNotification, isClient])

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (faviconBadgeRef.current) {
        faviconBadgeRef.current.reset()
      }
    }
  }, [])

  return null
}

export default FaviconClickHandler
