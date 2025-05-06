// Map of subcategory images - these would be actual paths to images in your project
const SUBCATEGORY_IMAGES = {
  // Electrodomésticos
  Cocina: "/images/subcategories/cocina.jpg",
  Refrigeración: "/images/subcategories/refrigeracion.jpg",
  Limpieza: "/images/subcategories/limpieza.jpg",
  Televisores: "/images/subcategories/televisores.jpg",

  // Farmacia
  Antimicrobianos: "/images/subcategories/antimicrobianos.jpg",
  Antiinflamatorios: "/images/subcategories/antiinflamatorios.jpg",
  Vitaminas: "/images/subcategories/vitaminas.jpg",
  Analgésicos: "/images/subcategories/analgesicos.jpg",

  // Meat
  Res: "/images/subcategories/res.jpg",
  Pescados: "/images/subcategories/pescados.jpg",
  Aves: "/images/subcategories/aves.jpg",

  // Bakery
  Panes: "/images/subcategories/panes.jpg",
  Tostadas: "/images/subcategories/tostadas.jpg",
  Galletas: "/images/subcategories/galletas.jpg",
  Muffins: "/images/subcategories/muffins.jpg",

  // Drink
  Té: "/images/subcategories/te.jpg",
  Café: "/images/subcategories/cafe.jpg",
  Refrescos: "/images/subcategories/refrescos.jpg",
  Agua: "/images/subcategories/agua.jpg",

  // Ropa_calzado_accesorios
  Camisas: "/images/subcategories/camisas.jpg",
  Pantalones: "/images/subcategories/pantalones.jpg",
  Zapatos: "/images/subcategories/zapatos.jpg",

  // Components
  Motherboards: "/images/subcategories/motherboards.png",
  "Graphics Cards": "/images/subcategories/graphics-cards.png",
  Processors: "/images/subcategories/processors.png",
  "Hard Drives": "/images/subcategories/hard-drives.png",
  RAM: "/images/subcategories/ram.png",
  "Power Supplies": "/images/subcategories/power-supplies.png",
  "Other Components": "/images/subcategories/other-components.png",
}

export function getSubcategoryImage(subcategoryId) {
  // If we have a specific image for this subcategory, use it
  if (SUBCATEGORY_IMAGES[subcategoryId]) {
    return SUBCATEGORY_IMAGES[subcategoryId]
  }

  // Otherwise, generate a placeholder with the subcategory name
  return `/placeholder.svg?height=30&width=30&text=${encodeURIComponent(subcategoryId)}`
}

// Generate a preview image for a product in a specific subcategory
export function getSubcategoryPreview(categoryId, subcategoryId) {
  // First try to get a specific image for this subcategory
  if (SUBCATEGORY_IMAGES[subcategoryId]) {
    return SUBCATEGORY_IMAGES[subcategoryId]
  }

  // If no specific image, try to find a product image from this subcategory
  // This would require access to your product data
  // For now, we'll just use a placeholder
  return `/placeholder.svg?height=30&width=30&text=${encodeURIComponent(subcategoryId)}`
}
