// Utilidades para manejo del favicon
export const createFaviconWithBadge = (originalFaviconUrl, badgeText = "NEW") => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const size = 32

    canvas.width = size
    canvas.height = size

    const img = new Image()
    img.crossOrigin = "anonymous"

    img.onload = () => {
      try {
        // Dibujar favicon original
        ctx.drawImage(img, 0, 0, size, size)

        // Configurar badge
        const badgeSize = 14
        const badgeX = size - badgeSize - 1
        const badgeY = 1

        // Sombra del badge
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)"
        ctx.shadowBlur = 2
        ctx.shadowOffsetX = 1
        ctx.shadowOffsetY = 1

        // Círculo rojo del badge
        ctx.fillStyle = "#FF3B30"
        ctx.beginPath()
        ctx.arc(badgeX + badgeSize / 2, badgeY + badgeSize / 2, badgeSize / 2, 0, 2 * Math.PI)
        ctx.fill()

        // Resetear sombra
        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0

        // Borde blanco
        ctx.strokeStyle = "#FFFFFF"
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Texto del badge
        ctx.fillStyle = "#FFFFFF"
        ctx.font = "bold 7px Arial, sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(badgeText, badgeX + badgeSize / 2, badgeY + badgeSize / 2)

        const dataURL = canvas.toDataURL("image/png")
        resolve(dataURL)
      } catch (error) {
        reject(error)
      }
    }

    img.onerror = () => {
      // Crear favicon de respaldo si falla la carga
      try {
        ctx.fillStyle = "#4A90E2"
        ctx.fillRect(0, 0, size, size)

        // Badge de respaldo
        const badgeSize = 14
        const badgeX = size - badgeSize - 1
        const badgeY = 1

        ctx.fillStyle = "#FF3B30"
        ctx.beginPath()
        ctx.arc(badgeX + badgeSize / 2, badgeY + badgeSize / 2, badgeSize / 2, 0, 2 * Math.PI)
        ctx.fill()

        ctx.fillStyle = "#FFFFFF"
        ctx.font = "bold 7px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(badgeText, badgeX + badgeSize / 2, badgeY + badgeSize / 2)

        const dataURL = canvas.toDataURL("image/png")
        resolve(dataURL)
      } catch (error) {
        reject(error)
      }
    }

    img.src = originalFaviconUrl
  })
}

export const updateFaviconInDOM = (faviconUrl) => {
  try {
    // Buscar todos los elementos de favicon existentes
    const existingLinks = document.querySelectorAll('link[rel*="icon"]')

    if (existingLinks.length > 0) {
      // Actualizar los existentes
      existingLinks.forEach((link) => {
        link.href = faviconUrl
      })
    } else {
      // Crear nuevo elemento si no existe
      const link = document.createElement("link")
      link.rel = "icon"
      link.type = "image/png"
      link.href = faviconUrl
      document.head.appendChild(link)
    }

    // También actualizar shortcut icon si existe
    const shortcutIcon = document.querySelector('link[rel="shortcut icon"]')
    if (shortcutIcon) {
      shortcutIcon.href = faviconUrl
    }

    return true
  } catch (error) {
    console.error("Error updating favicon in DOM:", error)
    return false
  }
}

export const getNewProductsCount = (products) => {
  try {
    const seenProductsStr = localStorage.getItem("seenProducts")
    const seenProducts = seenProductsStr ? JSON.parse(seenProductsStr) : []

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const newProducts = products.filter((product) => {
      const isNew = product.isNew === true || (product.dateAdded && new Date(product.dateAdded) >= thirtyDaysAgo)
      const notSeen = !seenProducts.includes(product.id)
      return isNew && notSeen
    })

    return newProducts.length
  } catch (error) {
    console.error("Error getting new products count:", error)
    return 0
  }
}
