export class FaviconBadge {
  constructor() {
    this.canvas = null
    this.ctx = null
    this.originalFavicon = "/logo.svg"
    this.isInitialized = false
    this.currentCount = 0
  }

  init() {
    // Solo inicializar en el cliente
    if (typeof window === "undefined" || typeof document === "undefined") {
      return false
    }

    try {
      // Crear canvas para dibujar el favicon con badge
      this.canvas = document.createElement("canvas")
      this.canvas.width = 32
      this.canvas.height = 32
      this.ctx = this.canvas.getContext("2d")

      if (!this.ctx) {
        console.error("No se pudo obtener el contexto del canvas")
        return false
      }

      // Obtener el favicon original
      const favicon = document.querySelector('link[rel="icon"]')
      if (favicon && favicon.href) {
        this.originalFavicon = favicon.href
      }

      this.isInitialized = true
      return true
    } catch (error) {
      console.error("Error initializing favicon badge:", error)
      return false
    }
  }

  updateBadge(count) {
    // Evitar actualizaciones innecesarias
    if (this.currentCount === count) return
    this.currentCount = count

    if (!this.isInitialized && !this.init()) {
      return
    }

    if (!this.ctx || typeof document === "undefined") return

    try {
      // Limpiar canvas
      this.ctx.clearRect(0, 0, 32, 32)

      if (count === 0) {
        // Si no hay productos, restaurar favicon original
        this.reset()
        return
      }

      // Crear favicon con badge
      this.createFaviconWithBadge(count)
    } catch (error) {
      console.error("Error updating badge:", error)
    }
  }

  createFaviconWithBadge(count) {
    try {
      // Dibujar fondo azul para el favicon
      this.ctx.fillStyle = "#4299e1"
      this.ctx.fillRect(0, 0, 32, 32)

      // Dibujar un ícono simple (círculo blanco)
      this.ctx.fillStyle = "#ffffff"
      this.ctx.beginPath()
      this.ctx.arc(16, 16, 10, 0, 2 * Math.PI)
      this.ctx.fill()

      if (count > 0) {
        // Dibujar el badge
        const badgeSize = 14
        const x = 32 - badgeSize - 2
        const y = 2

        // Círculo rojo para el badge
        this.ctx.fillStyle = "#ef4444"
        this.ctx.beginPath()
        this.ctx.arc(x + badgeSize / 2, y + badgeSize / 2, badgeSize / 2, 0, 2 * Math.PI)
        this.ctx.fill()

        // Borde blanco
        this.ctx.strokeStyle = "#ffffff"
        this.ctx.lineWidth = 2
        this.ctx.stroke()

        // Texto del número
        this.ctx.fillStyle = "#ffffff"
        this.ctx.font = "bold 9px Arial"
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"

        const text = count > 99 ? "99+" : count.toString()
        this.ctx.fillText(text, x + badgeSize / 2, y + badgeSize / 2)
      }

      // Actualizar el favicon
      this.updateFaviconLink()
    } catch (error) {
      console.error("Error creating favicon with badge:", error)
    }
  }

  updateFaviconLink() {
    if (typeof document === "undefined") return

    try {
      // Convertir canvas a data URL
      const dataURL = this.canvas.toDataURL("image/png")

      // Actualizar o crear el link del favicon
      let favicon = document.querySelector('link[rel="icon"]')
      if (!favicon) {
        favicon = document.createElement("link")
        favicon.rel = "icon"
        favicon.type = "image/png"
        document.head.appendChild(favicon)
      }

      favicon.href = dataURL
    } catch (error) {
      console.error("Error updating favicon link:", error)
    }
  }

  reset() {
    if (typeof document === "undefined") return

    try {
      // Restaurar favicon original
      const favicon = document.querySelector('link[rel="icon"]')
      if (favicon) {
        favicon.href = this.originalFavicon
      }
      this.currentCount = 0
    } catch (error) {
      console.error("Error resetting favicon:", error)
    }
  }
}

// Instancia singleton
let faviconBadgeInstance = null

export const getFaviconBadge = () => {
  if (typeof window !== "undefined" && !faviconBadgeInstance) {
    faviconBadgeInstance = new FaviconBadge()
  }
  return faviconBadgeInstance
}
