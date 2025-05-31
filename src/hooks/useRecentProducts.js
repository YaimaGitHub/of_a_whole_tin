"use client"

import { useState, useEffect, useCallback } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { cartState, recentProductsState, showRecentNotificationState } from "../recoil/state"

const RECENT_PRODUCTS_KEY = "recentProducts"
const RECENT_PRODUCTS_EXPIRY = 5 * 60 * 1000 // 5 minutos

export const useRecentProducts = () => {
  const [isClient, setIsClient] = useState(false)
  const [recentProducts, setRecentProducts] = useRecoilState(recentProductsState)
  const [showNotification, setShowNotification] = useRecoilState(showRecentNotificationState)
  const cart = useRecoilValue(cartState)
  const [previousCartLength, setPreviousCartLength] = useState(0)

  // Verificar que estamos en el cliente
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Función para limpiar productos expirados
  const cleanExpiredProducts = useCallback((products) => {
    const now = Date.now()
    return products.filter((item) => now - item.timestamp < RECENT_PRODUCTS_EXPIRY)
  }, [])

  // Cargar productos recientes del localStorage solo en el cliente
  useEffect(() => {
    if (!isClient || typeof window === "undefined") return

    try {
      const stored = localStorage.getItem(RECENT_PRODUCTS_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        const validProducts = cleanExpiredProducts(parsed)
        setRecentProducts(validProducts)

        // Actualizar localStorage si se limpiaron productos
        if (validProducts.length !== parsed.length) {
          localStorage.setItem(RECENT_PRODUCTS_KEY, JSON.stringify(validProducts))
        }
      }
    } catch (error) {
      console.error("Error parsing recent products:", error)
      if (typeof window !== "undefined") {
        localStorage.removeItem(RECENT_PRODUCTS_KEY)
      }
    }
  }, [isClient, setRecentProducts, cleanExpiredProducts])

  // Detectar nuevos productos agregados al carrito
  useEffect(() => {
    if (!isClient || typeof window === "undefined") return

    // Solo procesar si el carrito creció (se agregó un producto)
    if (cart.length > previousCartLength) {
      try {
        const stored = localStorage.getItem(RECENT_PRODUCTS_KEY)
        const existingProducts = stored ? JSON.parse(stored) : []

        // Encontrar productos nuevos comparando con el estado anterior
        const newProducts = cart.slice(previousCartLength)

        newProducts.forEach((cartItem) => {
          if (!cartItem || !cartItem.id) return

          const existingIndex = existingProducts.findIndex((item) => item.id === cartItem.id)

          const productData = {
            id: cartItem.id,
            name: cartItem.name || "Producto sin nombre",
            price: cartItem.price || 0,
            image: cartItem.image || "/placeholder.svg?height=50&width=50",
            quantity: cartItem.quantity || 1,
            timestamp: Date.now(),
          }

          if (existingIndex === -1) {
            // Producto completamente nuevo
            existingProducts.unshift(productData)
          } else {
            // Actualizar producto existente
            existingProducts[existingIndex] = productData
            // Mover al inicio
            const updated = existingProducts.splice(existingIndex, 1)[0]
            existingProducts.unshift(updated)
          }
        })

        // Mantener solo los últimos 10 productos
        if (existingProducts.length > 10) {
          existingProducts.splice(10)
        }

        // Limpiar productos expirados
        const cleanProducts = cleanExpiredProducts(existingProducts)

        localStorage.setItem(RECENT_PRODUCTS_KEY, JSON.stringify(cleanProducts))
        setRecentProducts(cleanProducts)
      } catch (error) {
        console.error("Error updating recent products:", error)
      }
    }

    setPreviousCartLength(cart.length)
  }, [cart, previousCartLength, isClient, setRecentProducts, cleanExpiredProducts])

  // Limpiar productos expirados periódicamente
  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      if (recentProducts.length > 0) {
        const cleanProducts = cleanExpiredProducts(recentProducts)
        if (cleanProducts.length !== recentProducts.length) {
          setRecentProducts(cleanProducts)
          if (typeof window !== "undefined") {
            localStorage.setItem(RECENT_PRODUCTS_KEY, JSON.stringify(cleanProducts))
          }
        }
      }
    }, 60000) // Verificar cada minuto

    return () => clearInterval(interval)
  }, [isClient, recentProducts, setRecentProducts, cleanExpiredProducts])

  const clearRecentProducts = useCallback(() => {
    if (typeof window === "undefined") return

    setRecentProducts([])
    localStorage.removeItem(RECENT_PRODUCTS_KEY)
  }, [setRecentProducts])

  const toggleNotification = useCallback(() => {
    setShowNotification((prev) => !prev)
  }, [setShowNotification])

  return {
    recentProducts,
    recentCount: recentProducts.length,
    showNotification,
    setShowNotification,
    toggleNotification,
    clearRecentProducts,
    isClient,
  }
}
