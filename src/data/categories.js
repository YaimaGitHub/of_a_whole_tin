// Define the category hierarchy with subcategories and their icons
export const categoryHierarchy = {
  Electrodomésticos: {
    icon: "tv",
    subcategories: [
      { name: "Cocina", icon: "utensils" },
      { name: "Refrigeración", icon: "refrigerator" },
      { name: "Limpieza", icon: "spray-can" },
      { name: "Televisores", icon: "tv" },
    ],
  },
  Farmacia: {
    icon: "pill",
    subcategories: [
      { name: "Antimicrobianos", icon: "pill" },
      { name: "Antiinflamatorios", icon: "thermometer" },
      { name: "Vitaminas", icon: "vitamin" },
      { name: "Analgésicos", icon: "stethoscope" },
    ],
  },
  meat: {
    icon: "beef",
    subcategories: [
      { name: "Arroz", icon: "drumstick" },
      { name: "Beef", icon: "beef" },
      { name: "Pork", icon: "bacon" },
      { name: "Fishhhhhh", icon: "fish" },
    ],
  },
  bakery: {
    icon: "cake",
    subcategories: [
      { name: "Bread", icon: "bread" },
      { name: "Toast", icon: "toast" },
      { name: "Cookies", icon: "cookie" },
      { name: "Muffin", icon: "cake" },
    ],
  },
  drink: {
    icon: "coffee",
    subcategories: [
      { name: "Coffee", icon: "coffee" },
      { name: "Tea", icon: "cup-soda" },
      { name: "Soda", icon: "glass-water" },
      { name: "Juice", icon: "lemon" },
    ],
  },
  Ropa_calzado_accesorios: {
    icon: "shirt",
    subcategories: [
      { name: "Ropa", icon: "shirt" },
      { name: "Calzado", icon: "boot" },
      { name: "Accesorios", icon: "watch" },
    ],
  },

//Fotografía y Accesorios
Photography: {
  icon: "Fotografía",
    subcategories: [
      { name: "Cámaras de fotos", icon: "Photography" },
      { name: "Cámaras por marca", icon: "boot" },
      { name: "Accesorios de fotografía", icon: "watch" },
      { name: "Cámaras de vídeo", icon: "watch" },
    ],
  },

  //Componentes de PC
  Components: {
    icon: "cpu",
    subcategories: [
      { name: "Placas base", icon: "motherboard" },
      { name: "Tarjetas gráficas", icon: "gpu-card" },
      { name: "Procesadores", icon: "cpu" },
      { name: "Discos duros", icon: "hard-drive" },
      { name: "Refrigeración", icon: "hard-drive" },
      { name: "RAM", icon: "memory-stick" },
      { name: "Fuentes de alimentación", icon: "power" },
      { name: "Otros componentes", icon: "component" },
    ],
   },

   //Ordenadores
Computers: {
    icon: "Computers",
    subcategories: [
      { name: "Portátiles", icon: "Ordenadores" },
      { name: "Portátiles por marca", icon: "marca" },
      { name: "Accesorios para portátiles", icon: "accesorios" },
      { name: "PC sobremesa por marca", icon: "desktop" },
      { name: "Software", icon: "hard-drive" },
    ],
  },
}

// Map to translate category IDs to display names
export const categoryDisplayNames = {
  Electrodomésticos: "Electrodomésticos",
  Farmacia: "Farmacia F+",
  meat: "Pastas, granos y cereales",
  bakery: "Panadería y Dulcería",
  drink: "Bebidas",
  Ropa_calzado_accesorios: "Ropa, calzado y accesorios",
  Components: "Componentes Informáticos",
}

// Function to get all subcategories flat list
export const getAllSubcategories = () => {
  const allSubcategories = []

  Object.entries(categoryHierarchy).forEach(([category, data]) => {
    data.subcategories.forEach((subcategory) => {
      allSubcategories.push({
        name: typeof subcategory === "object" ? subcategory.name : subcategory,
        icon: typeof subcategory === "object" ? subcategory.icon : null,
        parentCategory: category,
      })
    })
  })

  return allSubcategories
}

// Function to get subcategory by ID
export const getSubcategoryById = (id) => {
  const allSubcategories = getAllSubcategories()
  return allSubcategories.find((sub) => sub.name.toLowerCase() === id.toLowerCase())
}

// Function to get parent category by subcategory ID
export const getParentCategoryBySubcategoryId = (subcategoryId) => {
  const allSubcategories = getAllSubcategories()
  const subcategory = allSubcategories.find((sub) => sub.name.toLowerCase() === subcategoryId.toLowerCase())
  return subcategory ? subcategory.parentCategory : null
}

// Function to get subcategory icon
export const getSubcategoryIcon = (subcategoryName) => {
  const allSubcategories = getAllSubcategories()
  const subcategory = allSubcategories.find((sub) => sub.name === subcategoryName)
  return subcategory?.icon || "tag"
}
