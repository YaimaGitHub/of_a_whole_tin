"use client"

import { useRecentProducts } from "../hooks/useRecentProducts"
import FaviconClickHandler from "./others/FaviconClickHandler"
import RecentProductsNotification from "./others/RecentProductsNotification"

const AppContent = ({ Component, pageProps }) => {
  const { recentProducts, showNotification, setShowNotification, clearRecentProducts, isClient } = useRecentProducts()

  if (!isClient) {
    return <Component {...pageProps} />
  }

  return (
    <>
      <FaviconClickHandler />
      <Component {...pageProps} />
      <RecentProductsNotification
        isOpen={showNotification}
        onClose={() => setShowNotification(false)}
        recentProducts={recentProducts}
        onClearAll={clearRecentProducts}
      />
    </>
  )
}

export default AppContent
