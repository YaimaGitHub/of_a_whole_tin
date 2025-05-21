import { atom, selector } from "recoil"
import { fetcher } from "../helpers"
import { categoryHierarchy } from "../data/categories"

//ATOMS
export const selectedCategory = atom({
  key: "selectedCategory",
  default: "all",
})

export const selectedSubcategory = atom({
  key: "selectedSubcategory",
  default: "all",
})

export const orderOptions = atom({
  key: "orderOptions",
  default: ["Ascendente", "Descendente", "Precio mínimo", "Precio máximo"],
})

export const sortMode = atom({
  key: "sortMode",
  default: "Ascendente",
})

export const searchValue = atom({
  key: "searchValue",
  default: "",
})

export const cart = atom({
  key: "cart",
  default: {},
})

export const cartLength = atom({
  key: "cartLength",
  default: 0,
})

export const cartTotal = atom({
  key: "cartTotal",
  default: 0,
})

export const selectedLocation = atom({
  key: "selectedLocation",
  default: "",
})

export const selectedPaymentMethod = atom({
  key: "selectedPaymentMethod",
  default: "cash",
})

export const formState = atom({
  key: "formState",
  default: {},
})

export const productStock = atom({
  key: "productStock",
  default: {},
})

// New selector to check if bank transfer is allowed for all cart items
export const isBankTransferAllowed = selector({
  key: "isBankTransferAllowed",
  get: ({ get }) => {
    const cartItems = get(cart)
    return Object.values(cartItems).every((item) => item.allowBankTransfer !== false)
  },
})

//SELECTORS
export const availableSubcategories = selector({
  key: "availableSubcategories",
  get: ({ get }) => {
    const category = get(selectedCategory)

    if (category === "all") {
      return []
    }

    const categoryData = categoryHierarchy[category]
    if (!categoryData || !categoryData.subcategories) {
      return []
    }

    return categoryData.subcategories.map((subcat) => (typeof subcat === "object" ? subcat.name : subcat))
  },
})

export const subcategoryIcons = selector({
  key: "subcategoryIcons",
  get: ({ get }) => {
    const category = get(selectedCategory)

    if (category === "all") {
      return {}
    }

    const categoryData = categoryHierarchy[category]
    if (!categoryData || !categoryData.subcategories) {
      return {}
    }

    const icons = {}
    categoryData.subcategories.forEach((subcat) => {
      if (typeof subcat === "object") {
        icons[subcat.name] = subcat.icon
      }
    })

    return icons
  },
})

export const itemsList = selector({
  key: "itemsList",
  get: async ({ get }) => {
    const category = get(selectedCategory)
    const subcategory = get(selectedSubcategory)
    const sort = get(sortMode)
    const search = get(searchValue)
    let url = `/api?category=${category}&sort=${sort}`

    if (search.length > 0) {
      url += `&search=${search}`
    }

    if (subcategory !== "all") {
      url += `&subcategory=${subcategory}`
    }

    return await fetcher(url)
  },
})

export const subcategories = selector({
  key: "subcategories",
  get: ({ get }) => {
    const category = get(selectedCategory)

    if (category === "all") {
      return []
    }

    const categoryData = categoryHierarchy[category]
    if (!categoryData || !categoryData.subcategories) {
      return []
    }

    return categoryData.subcategories.map((subcat) => (typeof subcat === "object" ? subcat.name : subcat))
  },
})

export const productCountsByCategory = selector({
  key: "productCountsByCategory",
  get: async ({ get }) => {
    // Get all products
    const allProducts = await fetcher("/api?category=all&sort=Ascendente")

    // Initialize counts object
    const counts = {}

    // Count products by category and subcategory
    allProducts.forEach((product) => {
      const category = product.category
      const subcategory = product.subcategory

      // Initialize category if not exists
      if (!counts[category]) {
        counts[category] = {
          total: 0,
          subcategories: {},
        }
      }

      // Increment category total
      counts[category].total++

      // If product has a subcategory, count it
      if (subcategory) {
        if (!counts[category].subcategories[subcategory]) {
          counts[category].subcategories[subcategory] = 0
        }
        counts[category].subcategories[subcategory]++
      }
    })

    return counts
  },
})

export const refreshCart = selector({
  key: "refreshCart",
  set: ({ get, set }, { item, n }) => {
    const currentCart = { ...get(cart) }

    if (n === 1) {
      // add item to cart
      currentCart[item.id] = { ...item, qty: 1 }
    } else if (n > 0 && n <= item.stock) {
      // refresh item in cart
      currentCart[item.id] = { ...item, qty: n }
    } else if (n < 1) {
      // remove item to cart
      delete currentCart[item.id]
    }

    const cartToArray = Object.values(currentCart)
    let total = 0
    cartToArray.forEach((item) => {
      const actualPrice = item.offerPrice || item.price
      total += actualPrice * item.qty
    })

    set(cart, currentCart) //set cart state
    set(cartLength, cartToArray.length) //set cart lenght
    set(cartTotal, total) //set cart total
  },
})

export const locationFee = selector({
  key: "locationFee",
  get: ({ get }) => {
    const location = get(selectedLocation)
    const locationPrices = {
      Ferreiro: 250,
      "Santa Bárbara": 500,
      "Vista Alegre": 300,
      Altamira: 300,
      Versalles: 500,
      Chicharrones: 500,
      Clinico: 500,
      Pastorita: 500,
      "Distrito Jose Marti (hasta micro 9)": 200,
      "Los cangrejitos": 250,
      "Vista hermosa": 500,
      Portuondo: 500,
      Sorribe: 500,
      "Los olmos": 500,
      "Los pinos": 200,
      "Veguita de Galo": 500,
      Alameda: 250,
      Quintero: 250,
      "Nuevo vista alegre": 100,
      Agüero: 100,
      Modelo: 500,
      "Martí (hasta la iglesia)": 250,
      "Calle 4": 250,
      "30 de Noviembre": 500,
      "Micro 7": 250,
      "Micro 8": 250,
      "Carretera del morro": 320,
      Rajayoja: 500,
      "San Pedrito": 250,
      Marialina: 250,
      "Antonio maceo": 500,
      "La Barca de Oro": 100,
    }

    return location ? locationPrices[location] : 0
  },
})

export const orderDetails = selector({
  key: "orderDetails",
  get: ({ get }) => {
    const cartItems = get(cart)
    const subTotal = get(cartTotal)
    const location = get(selectedLocation)
    const deliveryFee = get(locationFee)
    const formData = get(formState)
    const paymentMethod = get(selectedPaymentMethod)

    // Calculate surcharge for bank transfer (15%)
    const surcharge = paymentMethod === "bank" ? subTotal * 0.15 : 0
    const total = subTotal + deliveryFee + surcharge

    return {
      cartItems,
      subTotal: subTotal.toFixed(2),
      location,
      locationFee: deliveryFee.toFixed(2),
      surcharge: surcharge.toFixed(2),
      total: total.toFixed(2),
      formData,
      paymentMethod,
    }
  },
})

export const resetState = selector({
  key: "resetState",
  set: ({ get, set }) => {
    set(selectedCategory, "all")
    set(sortMode, "Ascendente")
    set(selectedLocation, "")
    set(cart, {})
    set(cartLength, 0)
    set(cartTotal, 0)
    set(formState, {})
  },
})

export const completePurchase = selector({
  key: "completePurchase",
  set: ({ get, set }) => {
    const currentCart = get(cart)
    const currentStock = get(productStock)

    // Update stock levels for purchased items
    const newStock = { ...currentStock }

    Object.values(currentCart).forEach((item) => {
      const { id, qty } = item
      const currentItemStock = newStock[id] !== undefined ? newStock[id] : item.stock

      // Reduce stock by purchased quantity
      newStock[id] = Math.max(0, currentItemStock - qty)
    })

    // Update stock state
    set(productStock, newStock)
  },
})

export const stockNotifications = atom({
  key: "stockNotifications",
  default: [],
})

export const clearNotification = selector({
  key: "clearNotification",
  set: ({ get, set }, notificationId) => {
    const currentNotifications = get(stockNotifications)
    set(
      stockNotifications,
      currentNotifications.filter((n) => n.id !== notificationId),
    )
  },
})

export const currencyRates = atom({
  key: "currencyRates",
  default: {
    USD: 24.5,
    EUR: 26.8,
    CAD: 18.2,
  },
})

export const selectedCurrency = atom({
  key: "selectedCurrency",
  default: "CUP",
})

export const paymentCurrency = atom({
  key: "paymentCurrency",
  default: "CUP",
})
