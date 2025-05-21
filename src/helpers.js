import fetch from "isomorphic-unfetch"
import { nanoid } from "nanoid"

//fetcher
export const fetcher = (url) => fetch(url).then((r) => r.json())

export const getFormValidations = () => {
  return {
    //name
    name: {
      required: {
        value: true,
        message: "El nombre es obligatorio",
      },
      maxLength: {
        value: 20,
        message: "Longitud máxima 20 caracteres",
      },
      minLength: {
        value: 5,
        message: "Longitud mínima 5 caracteres",
      },
      pattern: {
        value: /^[A-Za-z ]{5,20}$/,
        message: "Nombre incorrecto",
      },
    },

    //phone
    phone: {
      required: {
        value: true,
        message: "Se requiere teléfono",
      },
      maxLength: {
        value: 20,
        message: "Longitud máxima 20 caracteres",
      },
      minLength: {
        value: 5,
        message: "Longitud mínima 5 caracteres",
      },
      pattern: {
        value: /^[0-9]{5,20}$/,
        message: "Teléfono incorrecto",
      },
    },
    //address
    address: {
      required: {
        value: true,
        message: "Se requiere dirección",
      },
      maxLength: {
        value: 50,
        message: "Longitud máxima 50 caracteres",
      },
      minLength: {
        value: 5,
        message: "Longitud mínima 5 caracteres",
      },
      // Removed restrictive pattern to allow special characters
    },
    //city
    city: {
      required: {
        value: true,
        message: "Se requiere el lugar de entrega",
      },
    },
    //schedule
    schedule: {
      required: {
        value: true,
        message: "Se requiere horario",
      },
    },
    //delivery date
    deliveryDate: {
      required: {
        value: true,
        message: "Se requiere fecha de entrega",
      },
    },
    //extra comment
    /* Esto es un comentario adicional (controlar la cantidad de caracteres escritos por el usuario maximo 25 por defecto) */
    comment: {
      maxLength: {
        value: 30,
        message: "Longitud máxima 30 caracteres",
      },
    },
  }
}

export const getLocationPrices = () => {
  return {
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
    "Carretera del morro": 300,
    Rajayoja: 500,
    "San Pedrito": 250,
    Marialina: 250,
    "Antonio maceo": 500,
    "La Barca de Oro": 100,
  }
}

// Update the getWspUrl function to include payment method information
export function getWspUrl(orderData) {
  const N = process.env.NEXT_PUBLIC_MY_PHONE_NUMBER
  const ID = nanoid(8)
  const { cartItems, subTotal, locationFee, surcharge, total, formData, paymentMethod } = orderData
  const { name, phone, address, city, schedule, deliveryDate, comment } = formData

  // Format date for better readability
  const formattedDate = new Date(deliveryDate).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Create a more structured and readable message
  let message = `🛒 *CONFIRMACIÓN DE PEDIDO* 🛒\n\n`

  // Order information section
  message += `📋 *INFORMACIÓN DEL PEDIDO*\n`
  message += `------------------------------------------\n`
  message += `🆔 *Número de Orden:* ${ID}\n`
  message += `📅 *Fecha de Pedido:* ${new Date().toLocaleDateString("es-ES")}\n\n`

  // Customer information section
  message += `👤 *INFORMACIÓN DEL CLIENTE*\n`
  message += `------------------------------------------\n`
  message += `*Nombre:* ${name}\n`
  message += `*Teléfono:* ${phone}\n`
  message += `*Dirección:* ${address}\n`
  message += `*Zona de entrega:* ${city}\n\n`

  // Delivery information section
  message += `🚚 *INFORMACIÓN DE ENTREGA*\n`
  message += `------------------------------------------\n`
  message += `*Fecha de entrega:* ${formattedDate}\n`
  message += `*Horario programado:* ${schedule}\n`
  if (comment) {
    message += `*Instrucciones especiales:* ${comment}\n`
  }
  message += `\n`

  // Payment information section
  message += `💳 *MÉTODO DE PAGO*\n`
  message += `------------------------------------------\n`
  message += `*Método seleccionado:* ${paymentMethod === "cash" ? "Efectivo" : "Transferencia Bancaria"}\n`
  if (paymentMethod === "bank") {
    message += `*IMPORTANTE:* Se aplica un recargo del 15% por pago con transferencia bancaria.\n`
    message += `*Por favor, solicite el código QR para realizar la transferencia.*\n\n`
  } else {
    message += `*Pago en efectivo al momento de la entrega.*\n\n`
  }

  // Products section
  message += `📦 *PRODUCTOS ORDENADOS*\n`
  message += `------------------------------------------\n`

  // Format each product in the cart
  Object.values(cartItems).forEach((item, index) => {
    const { title, title1, price, offerPrice, qty } = item
    const actualPrice = offerPrice || price
    const itemTotal = (actualPrice * qty).toFixed(2)

    message += `${index + 1}. *${title}*${title1 ? ` (${title1})` : ""}\n`
    message += `   • Cantidad: ${qty}\n`
    message += `   • Precio: ${actualPrice} CUP${offerPrice ? ` (Oferta: ${price} CUP)` : ""}\n`
    message += `   • Subtotal: ${itemTotal} CUP\n\n`
  })

  // Order summary section
  message += `💰 *RESUMEN DEL PEDIDO*\n`
  message += `------------------------------------------\n`
  message += `*Subtotal:* ${subTotal} CUP\n`
  message += `*Tarifa de entrega (${city}):* ${locationFee} CUP\n`
  if (paymentMethod === "bank") {
    message += `*Recargo por transferencia (15%):* ${surcharge} CUP\n`
  }
  message += `*TOTAL A PAGAR:* ${total} CUP\n\n`

  // Store policies and thank you message
  message += `✅ *INFORMACIÓN ADICIONAL*\n`
  message += `------------------------------------------\n`
  message += `• Su pedido será preparado y enviado según el horario seleccionado.\n`
  message += `• Para cambios o cancelaciones, contáctenos con al menos 2 horas de anticipación.\n`
  if (paymentMethod === "cash") {
    message += `• Pago en efectivo al momento de la entrega.\n\n`
  } else {
    message += `• Por favor realice la transferencia bancaria antes de la entrega.\n\n`
  }
  message += `¡Gracias por su compra! 🙏\n`

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message)

  // Create the WhatsApp URL
  return `https://api.whatsapp.com/send/?phone=${N}&text=${encodedMessage}`
}
