// Define color schemes for subcategories
export const subcategoryColorMap = {
  // Electrodomésticos subcategories
  Cocina: { primary: "#3182CE", secondary: "#63B3ED", gradient: "linear-gradient(135deg, #3182CE 0%, #63B3ED 100%)" },
  Refrigeración: {
    primary: "#2B6CB0",
    secondary: "#4299E1",
    gradient: "linear-gradient(135deg, #2B6CB0 0%, #4299E1 100%)",
  },
  Limpieza: { primary: "#2C5282", secondary: "#90CDF4", gradient: "linear-gradient(135deg, #2C5282 0%, #90CDF4 100%)" },
  Televisores: {
    primary: "#1A365D",
    secondary: "#63B3ED",
    gradient: "linear-gradient(135deg, #1A365D 0%, #63B3ED 100%)",
  },

  // Farmacia subcategories
  Antimicrobianos: {
    primary: "#E53E3E",
    secondary: "#FC8181",
    gradient: "linear-gradient(135deg, #E53E3E 0%, #FC8181 100%)",
  },
  Antiinflamatorios: {
    primary: "#C53030",
    secondary: "#FEB2B2",
    gradient: "linear-gradient(135deg, #C53030 0%, #FEB2B2 100%)",
  },
  Vitaminas: {
    primary: "#9B2C2C",
    secondary: "#FC8181",
    gradient: "linear-gradient(135deg, #9B2C2C 0%, #FC8181 100%)",
  },
  Analgésicos: {
    primary: "#822727",
    secondary: "#FEB2B2",
    gradient: "linear-gradient(135deg, #822727 0%, #FEB2B2 100%)",
  },

  // Meat subcategories
  Poultry: { primary: "#DD6B20", secondary: "#F6AD55", gradient: "linear-gradient(135deg, #DD6B20 0%, #F6AD55 100%)" },
  Beef: { primary: "#C05621", secondary: "#FBD38D", gradient: "linear-gradient(135deg, #C05621 0%, #FBD38D 100%)" },
  Pork: { primary: "#9C4221", secondary: "#F6AD55", gradient: "linear-gradient(135deg, #9C4221 0%, #F6AD55 100%)" },
  Fish: { primary: "#7B341E", secondary: "#FBD38D", gradient: "linear-gradient(135deg, #7B341E 0%, #FBD38D 100%)" },

  // Bakery subcategories
  Bread: { primary: "#D69E2E", secondary: "#F6E05E", gradient: "linear-gradient(135deg, #D69E2E 0%, #F6E05E 100%)" },
  Toast: { primary: "#B7791F", secondary: "#FAF089", gradient: "linear-gradient(135deg, #B7791F 0%, #FAF089 100%)" },
  Cookies: { primary: '#975A16  gradient: "linear-gradient(135deg, #B7791F 0%, #FAF089 100%)' },
  Cookies: { primary: "#975A16", secondary: "#F6E05E", gradient: "linear-gradient(135deg, #975A16 0%, #F6E05E 100%)" },
  Muffin: { primary: "#744210", secondary: "#FAF089", gradient: "linear-gradient(135deg, #744210 0%, #FAF089 100%)" },

  // Drink subcategories
  Coffee: { primary: "#38A169", secondary: "#68D391", gradient: "linear-gradient(135deg, #38A169 0%, #68D391 100%)" },
  Tea: { primary: "#2F855A", secondary: "#9AE6B4", gradient: "linear-gradient(135deg, #2F855A 0%, #9AE6B4 100%)" },
  Soda: { primary: "#276749", secondary: "#68D391", gradient: "linear-gradient(135deg, #276749 0%, #68D391 100%)" },
  Juice: { primary: "#22543D", secondary: "#9AE6B4", gradient: "linear-gradient(135deg, #22543D 0%, #9AE6B4 100%)" },

  // Ropa_calzado_accesorios subcategories
  Ropa: { primary: "#805AD5", secondary: "#B794F4", gradient: "linear-gradient(135deg, #805AD5 0%, #B794F4 100%)" },
  Calzado: { primary: "#6B46C1", secondary: "#D6BCFA", gradient: "linear-gradient(135deg, #6B46C1 0%, #D6BCFA 100%)" },
  Accesorios: {
    primary: "#553C9A",
    secondary: "#B794F4",
    gradient: "linear-gradient(135deg, #553C9A 0%, #B794F4 100%)",
  },

  // Components subcategories
  Motherboards: {
    primary: "#2C5282",
    secondary: "#4299E1",
    gradient: "linear-gradient(135deg, #2C5282 0%, #4299E1 100%)",
  },
  "Graphics Cards": {
    primary: "#2A4365",
    secondary: "#63B3ED",
    gradient: "linear-gradient(135deg, #2A4365 0%, #63B3ED 100%)",
  },
  Processors: {
    primary: "#1A365D",
    secondary: "#4299E1",
    gradient: "linear-gradient(135deg, #1A365D 0%, #4299E1 100%)",
  },
  "Hard Drives": {
    primary: "#2C5282",
    secondary: "#90CDF4",
    gradient: "linear-gradient(135deg, #2C5282 0%, #90CDF4 100%)",
  },
  RAM: { primary: "#2A4365", secondary: "#63B3ED", gradient: "linear-gradient(135deg, #2A4365 0%, #63B3ED 100%)" },
  "Power Supplies": {
    primary: "#1A365D",
    secondary: "#90CDF4",
    gradient: "linear-gradient(135deg, #1A365D 0%, #90CDF4 100%)",
  },
  "Other Components": {
    primary: "#2C5282",
    secondary: "#4299E1",
    gradient: "linear-gradient(135deg, #2C5282 0%, #4299E1 100%)",
  },

  // Default
  default: { primary: "#4A5568", secondary: "#718096", gradient: "linear-gradient(135deg, #4A5568 0%, #718096 100%)" },
}

// Get color scheme for a subcategory
export const getSubcategoryColorScheme = (subcategoryName) => {
  return subcategoryColorMap[subcategoryName] || subcategoryColorMap.default
}

// Get parent category color scheme based on subcategory
export const getCategoryColorForSubcategory = (subcategoryName) => {
  // Map subcategories to their parent categories
  const subcategoryToCategory = {
    // Electrodomésticos
    Cocina: "Electrodomésticos",
    Refrigeración: "Electrodomésticos",
    Limpieza: "Electrodomésticos",
    Televisores: "Electrodomésticos",

    // Farmacia
    Antimicrobianos: "Farmacia",
    Antiinflamatorios: "Farmacia",
    Vitaminas: "Farmacia",
    Analgésicos: "Farmacia",

    // Meat
    Poultry: "meat",
    Beef: "meat",
    Pork: "meat",
    Fish: "meat",

    // Bakery
    Bread: "bakery",
    Toast: "bakery",
    Cookies: "bakery",
    Muffin: "bakery",

    // Drink
    Coffee: "drink",
    Tea: "drink",
    Soda: "drink",
    Juice: "drink",

    // Ropa_calzado_accesorios
    Ropa: "Ropa_calzado_accesorios",
    Calzado: "Ropa_calzado_accesorios",
    Accesorios: "Ropa_calzado_accesorios",

    // Components
    Motherboards: "Components",
    "Graphics Cards": "Components",
    Processors: "Components",
    "Hard Drives": "Components",
    RAM: "Components",
    "Power Supplies": "Components",
    "Other Components": "Components",
  }

  const categoryColors = {
    all: { primary: "#4A5568", secondary: "#718096" },
    Electrodomésticos: { primary: "#3182CE", secondary: "#63B3ED" },
    Farmacia: { primary: "#E53E3E", secondary: "#FC8181" },
    meat: { primary: "#DD6B20", secondary: "#F6AD55" },
    bakery: { primary: "#D69E2E", secondary: "#F6E05E" },
    drink: { primary: "#38A169", secondary: "#68D391" },
    Ropa_calzado_accesorios: { primary: "#805AD5", secondary: "#B794F4" },
    Components: { primary: "#2C5282", secondary: "#4299E1" },
  }

  const parentCategory = subcategoryToCategory[subcategoryName] || "all"
  return categoryColors[parentCategory] || categoryColors.all
}
