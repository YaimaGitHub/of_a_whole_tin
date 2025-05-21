// Translations file for the application
export const translations = {
  es: {
    // Categories
    categories: {
      title: "CATEGORÍAS",
      all: "Todos los Productos",
      appliances: "Electrodomésticos",
      pharmacy: "Farmacia F+",
      meat: "Pastas, granos y cereales",
      bakery: "Panadería y Dulcería",
      drinks: "Bebidas",
      clothing: "Ropa, calzado",
      Computers: "Ordenadores",
      components: "Componentes de PC",
      Photography: "Fotografía y Accesorios",
    },
    // Settings
    settings: {
      title: "CONFIGURACIÓN",
      language: "Idioma",
      currency: "Moneda",
    },
    // Product details
    product: {
      addToCart: "Añadir a la cesta",
      inCart: "Producto en la cesta",
      description: "Descripción",
      specifications: "Especificaciones",
      stock: "Stock disponible",
      units: "unidades",
      warranty: "Garantía",
      days: "días",
      promotion: "Promoción",
      id: "ID",
      category: "Categoría",
    },
    // Cart
    cart: {
      title: "Cesta de Compra",
      empty: "No hay productos en tu cesta",
      emptyMessage: "Agrega productos para continuar con tu compra",
      subTotal: "Sub Total",
      shipping: "Envío",
      shippingCalc: "Calculado en el checkout",
      total: "Total",
      checkout: "Verificar Compra",
      price: "Precio",
      remove: "Eliminar",
      added: "Producto agregado a la cesta de compra.",
      removed: "Producto eliminado de la cesta de compra.",
    },
    // Checkout
    checkout: {
      deliveryInfo: "Información de Entrega",
      whatsappInfo: "Al finalizar, recibirás un mensaje detallado de tu pedido vía WhatsApp",
      name: "Nombre",
      namePlaceholder: "Su nombre completo",
      phone: "Teléfono",
      phonePlaceholder: "Número de teléfono",
      address: "Dirección",
      addressPlaceholder: "Calle, número, apartamento, referencias...",
      deliveryZone: "Zona de Entrega",
      deliveryZonePlaceholder: "-- Seleccione zona de entrega --",
      paymentMethod: "Método de Pago",
      cash: "Efectivo",
      cashDescription: "Pago en efectivo al momento de la entrega",
      bankTransfer: "Transferencia Bancaria",
      bankTransferDescription: "Transferencia a la tarjeta del propietario",
      bankSurchargeWarning: "Se aplicará un recargo del 15% al total de los productos",
      bankQRInfo: "Recibirá un código QR para realizar la transferencia vía WhatsApp",
      deliveryDate: "Fecha de Entrega",
      deliveryDatePlaceholder: "Fecha de entrega",
      deliveryTime: "Horario de Entrega",
      deliveryTimePlaceholder: "-- Seleccione horario de entrega --",
      morning: "9:00AM a 12:00PM",
      afternoon: "02:00PM a 05:00PM",
      additionalComments: "Comentarios Adicionales",
      commentsPlaceholder: "¿Alguna instrucción especial?",
      confirmOrder: "CONFIRMAR PEDIDO",
      orderSummary: "Resumen del Pedido",
      deliveryFee: "Tarifa de entrega",
      surcharge: "Recargo (15%)",
      messagePreview: "Vista previa del mensaje",
      hidePreview: "Ocultar vista previa",
    },
    // Validation messages
    validation: {
      required: "Este campo es requerido",
      minLength: "Debe tener al menos {0} caracteres",
      maxLength: "Debe tener como máximo {0} caracteres",
      pattern: "Formato inválido",
    },
  },
  en: {
    // Categories
    categories: {
      title: "CATEGORIES",
      all: "All Products",
      appliances: "Home Appliances",
      pharmacy: "Pharmacy F+",
      meat: "Meat",
      bakery: "Bakery & Sweets",
      drinks: "Beverages",
      clothing: "Clothing & Footwear",
      components: "PC Components",
    },
    // Settings
    settings: {
      title: "SETTINGS",
      language: "Language",
      currency: "Currency",
    },
    // Product details
    product: {
      addToCart: "Add to cart",
      inCart: "Product in cart",
      description: "Description",
      specifications: "Specifications",
      stock: "Available stock",
      units: "units",
      warranty: "Warranty",
      days: "days",
      promotion: "Promotion",
      id: "ID",
      category: "Category",
    },
    // Cart
    cart: {
      title: "Shopping Cart",
      empty: "Your cart is empty",
      emptyMessage: "Add products to continue with your purchase",
      subTotal: "Sub Total",
      shipping: "Shipping",
      shippingCalc: "Calculated at checkout",
      total: "Total",
      checkout: "Checkout",
      price: "Price",
      remove: "Remove",
      added: "Product added to your cart.",
      removed: "Product removed from your cart.",
    },
    // Checkout
    checkout: {
      deliveryInfo: "Delivery Information",
      whatsappInfo: "Upon completion, you will receive a detailed message of your order via WhatsApp",
      name: "Name",
      namePlaceholder: "Your full name",
      phone: "Phone",
      phonePlaceholder: "Phone number",
      address: "Address",
      addressPlaceholder: "Street, number, apartment, landmarks...",
      deliveryZone: "Delivery Zone",
      deliveryZonePlaceholder: "-- Select delivery zone --",
      paymentMethod: "Payment Method",
      cash: "Cash",
      cashDescription: "Cash payment upon delivery",
      bankTransfer: "Bank Transfer",
      bankTransferDescription: "Transfer to the owner's card",
      bankSurchargeWarning: "A 15% surcharge will be applied to the total of the products",
      bankQRInfo: "You will receive a QR code to make the transfer via WhatsApp",
      deliveryDate: "Delivery Date",
      deliveryDatePlaceholder: "Delivery date",
      deliveryTime: "Delivery Time",
      deliveryTimePlaceholder: "-- Select delivery time --",
      morning: "9:00AM to 12:00PM",
      afternoon: "02:00PM to 05:00PM",
      additionalComments: "Additional Comments",
      commentsPlaceholder: "Any special instructions?",
      confirmOrder: "CONFIRM ORDER",
      orderSummary: "Order Summary",
      deliveryFee: "Delivery fee",
      surcharge: "Surcharge (15%)",
      messagePreview: "Message preview",
      hidePreview: "Hide preview",
    },
    // Validation messages
    validation: {
      required: "This field is required",
      minLength: "Must have at least {0} characters",
      maxLength: "Must have at most {0} characters",
      pattern: "Invalid format",
    },
  },
}

// Helper function to get translations
export const getTranslation = (language, key) => {
  const keys = key.split(".")
  let result = translations[language]

  for (const k of keys) {
    if (!result[k]) return key // Return the key if translation not found
    result = result[k]
  }

  return result
}

// Function to translate validation messages
export const translateValidation = (language, type, params = []) => {
  let message = getTranslation(language, `validation.${type}`)

  // Replace parameters in the message
  params.forEach((param, index) => {
    message = message.replace(`{${index}}`, param)
  })

  return message
}
