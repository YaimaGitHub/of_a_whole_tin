"use client"

import { useEffect } from "react"
import { useSetRecoilState } from "recoil"
import { productTrackingState } from "../recoil/state"

export default function ProductTrackingInitializer() {
  const setProductTracking = useSetRecoilState(productTrackingState)

  useEffect(() => {
    // Initialize product tracking on app load
    const initializeProductTracking = async () => {
      try {
        const response = await import("../data")
        const allProducts = response.default

        // Update the product tracking state with current products
        setProductTracking({
          initialized: true,
          lastChecked: new Date().toISOString(),
          productIds: allProducts.map((p) => p.id),
          categoryStats: {},
        })
      } catch (error) {
        console.error("Error initializing product tracking:", error)
      }
    }

    initializeProductTracking()
  }, [setProductTracking])

  // This component doesn't render anything
  return null
}
