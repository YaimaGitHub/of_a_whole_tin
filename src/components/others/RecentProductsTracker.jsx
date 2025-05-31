"use client"

import { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { recentProductsState, newProductsCountState } from "../../recoil/state"

const RecentProductsTracker = () => {
  const [recentProducts, setRecentProducts] = useRecoilState(recentProductsState)
  const setNewProductsCount = useSetRecoilState(newProductsCountState)

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("recentProducts")
      if (saved) {
        try {
          const parsedProducts = JSON.parse(saved)
          setRecentProducts(parsedProducts)
        } catch (error) {
          console.error("Error loading recent products:", error)
        }
      }
    }
  }, [setRecentProducts])

  // Simulate adding products periodically (for demo purposes)
  useEffect(() => {
    const interval = setInterval(() => {
      // Fetch products from API to check for new ones
      fetch("/api?category=all&sort=default")
        .then((response) => response.json())
        .then((products) => {
          if (products && products.length > 0) {
            const currentTime = Date.now()
            const existingIds = recentProducts.map((p) => p.id || p.img) // Use img as fallback ID

            // Get the first few products as "new" (simulate new products)
            const potentialNewProducts = products.slice(0, 3)
            const newProducts = potentialNewProducts.filter(
              (product) => product && !existingIds.includes(product.id || product.img),
            )

            if (newProducts.length > 0) {
              // Add timestamp and ID to new products
              const productsWithTimestamp = newProducts.map((product, index) => ({
                ...product,
                id: product.id || product.img || `product_${currentTime}_${index}`,
                addedAt: currentTime,
              }))

              // Update recent products (keep last 50)
              const updatedProducts = [...productsWithTimestamp, ...recentProducts].slice(0, 50)

              setRecentProducts(updatedProducts)
              setNewProductsCount((prev) => prev + newProducts.length)

              // Save to localStorage
              if (typeof window !== "undefined") {
                localStorage.setItem("recentProducts", JSON.stringify(updatedProducts))
              }

              console.log(`${newProducts.length} nuevos productos agregados`)
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error)
        })
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [recentProducts, setRecentProducts, setNewProductsCount])

  return null // This component doesn't render anything
}

export default RecentProductsTracker
