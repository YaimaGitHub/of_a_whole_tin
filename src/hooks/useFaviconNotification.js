"use client"

import { useEffect, useState, useCallback } from "react"
import products from "../data"

const useFaviconNotification = () => {
  const [hasNewProducts, setHasNewProducts] = useState(false)
  const [originalFavicon, setOriginalFavicon] = useState("/favicon.png")

  // Función para crear un favicon con badge de notificación
  const createNotificationFavicon = useCallback(
    (text = "NEW") => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const size = 32

      canvas.width = size
      canvas.height = size

      // Crear imagen base del favicon
      const img = new Image()
      img.crossOrigin = "anonymous"

      return new Promise((resolve) => {
        img.onload = () => {
          // Dibujar el favicon original
          ctx.drawImage(img, 0, 0, size, size)

          // Configurar el badge
          const badgeSize = 12
          const badgeX = size - badgeSize
          const badgeY = 0

          // Dibujar círculo rojo para el badge
          ctx.fillStyle = "#FF3B30"
          ctx.beginPath()
          ctx.arc(badgeX + badgeSize / 2, badgeY + badgeSize / 2, badgeSize / 2, 0, 2 * Math.PI)
          ctx.fill()

          // Dibujar borde blanco
          ctx.strokeStyle = "#FFFFFF"
          ctx.lineWidth = 1
          ctx.stroke()

          // Dibujar texto "NEW"
          ctx.fillStyle = "#FFFFFF"
          ctx.font = "bold 6px Arial"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText("NEW", badgeX + badgeSize / 2, badgeY + badgeSize / 2)

          // Convertir canvas a data URL
          const dataURL = canvas.toDataURL("image/png")
          resolve(dataURL)
        }

        img.onerror = () => {
          // Si falla cargar la imagen, crear un favicon simple con badge
          ctx.fillStyle = "#4A90E2"
          ctx.fillRect(0, 0, size, size)

          // Badge
          const badgeSize = 12
          const badgeX = size - badgeSize
          const badgeY = 0

          ctx.fillStyle = "#FF3B30"
          ctx.beginPath()
          ctx.arc(badgeX + badgeSize / 2, badgeY + badgeSize / 2, badgeSize / 2, 0, 2 * Math.PI)
          ctx.fill()

          ctx.fillStyle = "#FFFFFF"
          ctx.font = "bold 6px Arial"
          ctx.textAlign = "center"
          ctx.textBaseline = "middle"
          ctx.fillText("NEW", badgeX + badgeSize / 2, badgeY + badgeSize / 2)

          const dataURL = canvas.toDataURL("image/png")
          resolve(dataURL)
        }

        img.src = originalFavicon
      })
    },
    [originalFavicon],
  )

  // Función para actualizar el favicon
  const updateFavicon = useCallback(
    async (showNotification = false) => {
      try {
        let faviconUrl = originalFavicon

        if (showNotification) {
          faviconUrl = await createNotificationFavicon()
        }

        // Actualizar todos los elementos de favicon
        const links = document.querySelectorAll('link[rel*="icon"]')
        links.forEach((link) => {
          link.href = faviconUrl
        })

        // Si no existe ningún link de favicon, crear uno
        if (links.length === 0) {
          const link = document.createElement("link")
          link.rel = "icon"
          link.type = "image/png"
          link.href = faviconUrl
          document.head.appendChild(link)
        }
      } catch (error) {
        console.error("Error updating favicon:", error)
      }
    },
    [originalFavicon, createNotificationFavicon],
  )

  // Función para detectar productos nuevos
  const checkForNewProducts = useCallback(() => {
    try {
      // Obtener productos vistos desde localStorage
      const seenProductsStr = localStorage.getItem("seenProducts")
      const seenProducts = seenProductsStr ? JSON.parse(seenProductsStr) : []

      // Filtrar productos nuevos (últimos 30 días o marcados como nuevos)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const newProducts = products.filter((product) => {
        // Verificar si es un producto nuevo
        const isNew = product.isNew === true || (product.dateAdded && new Date(product.dateAdded) >= thirtyDaysAgo)

        // Verificar si no ha sido visto por el usuario
        const notSeen = !seenProducts.includes(product.id)

        return isNew && notSeen
      })

      const hasNew = newProducts.length > 0
      setHasNewProducts(hasNew)

      return hasNew
    } catch (error) {
      console.error("Error checking for new products:", error)
      return false
    }
  }, [])

  // Función para marcar productos como vistos
  const markProductsAsSeen = useCallback(
    (productIds = null) => {
      try {
        const seenProductsStr = localStorage.getItem("seenProducts")
        const seenProducts = seenProductsStr ? JSON.parse(seenProductsStr) : []

        if (productIds) {
          // Marcar productos específicos como vistos
          const idsToAdd = Array.isArray(productIds) ? productIds : [productIds]
          const updatedSeen = [...new Set([...seenProducts, ...idsToAdd])]
          localStorage.setItem("seenProducts", JSON.stringify(updatedSeen))
        } else {
          // Marcar todos los productos actuales como vistos
          const allProductIds = products.map((p) => p.id)
          localStorage.setItem("seenProducts", JSON.stringify(allProductIds))
        }

        // Recheck después de marcar como vistos
        const stillHasNew = checkForNewProducts()
        if (!stillHasNew) {
          updateFavicon(false)
        }
      } catch (error) {
        console.error("Error marking products as seen:", error)
      }
    },
    [checkForNewProducts, updateFavicon],
  )

  // Función para limpiar notificaciones
  const clearNotifications = useCallback(() => {
    markProductsAsSeen()
    setHasNewProducts(false)
    updateFavicon(false)
  }, [markProductsAsSeen, updateFavicon])

  // Effect para verificar productos nuevos al montar el componente
  useEffect(() => {
    const hasNew = checkForNewProducts()
    updateFavicon(hasNew)
  }, [checkForNewProducts, updateFavicon])

  // Effect para actualizar el favicon cuando cambia el estado
  useEffect(() => {
    updateFavicon(hasNewProducts)
  }, [hasNewProducts, updateFavicon])

  // Effect para verificar periódicamente productos nuevos
  useEffect(() => {
    const interval = setInterval(() => {
      checkForNewProducts()
    }, 60000) // Verificar cada minuto

    return () => clearInterval(interval)
  }, [checkForNewProducts])

  // Effect para limpiar el favicon al desmontar
  useEffect(() => {
    return () => {
      updateFavicon(false)
    }
  }, [updateFavicon])

  return {
    hasNewProducts,
    checkForNewProducts,
    markProductsAsSeen,
    clearNotifications,
    updateFavicon,
  }
}

export default useFaviconNotification
