"use client"

import { Box, Divider, Flex, Heading, Text, Badge, Button, useColorMode, Alert, AlertIcon } from "@chakra-ui/core"
import OrderItem from "./OrderItem"
import { useRecoilValue } from "recoil"
import { orderDetails } from "../../recoil/state"
import { BiMessageDetail } from "react-icons/bi"
import { useState } from "react"

function OrderDetails() {
  const { cartItems, subTotal, location, locationFee, surcharge, total, paymentMethod } = useRecoilValue(orderDetails)
  const { colorMode } = useColorMode()
  const [showPreview, setShowPreview] = useState(false)

  // Colors for modern UI
  const bgColor = colorMode === "light" ? "white" : "gray.800"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.700"
  const headingColor = colorMode === "light" ? "bluex.600" : "white"
  const textColor = colorMode === "light" ? "gray.700" : "gray.300"
  const highlightColor = colorMode === "light" ? "bluex.500" : "bluex.300"
  const gray50 = colorMode === "light" ? "gray.50" : "gray.700"
  const gray500_400 = colorMode === "light" ? "gray.500" : "gray.400"

  return (
    <Box
      w={["100%", "90%", "46%", "35%"]}
      height="max-content"
      p="6"
      mx="2"
      bg={bgColor}
      borderRadius="lg"
      boxShadow="lg"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Heading as="h3" size="md" textAlign="center" mb="6" color={headingColor}>
        Resumen del Pedido
      </Heading>

      {Object.values(cartItems).length > 0 ? (
        <>
          <Box p="4" borderRadius="md" bg={gray50} mb="4" maxHeight="400px" overflowY="auto" boxShadow="sm">
            <Flex direction="column" align="center" w="100%" gap="3">
              {Object.values(cartItems).map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </Flex>
          </Box>

          <Divider my="4" borderColor={borderColor} />

          <Box p="2" w="100%">
            <Flex w="100%" justify="space-between" mb="3" align="center">
              <Text color={textColor} fontWeight="medium">
                Sub Total:
              </Text>
              <Text fontWeight="medium">$ {subTotal} CUP</Text>
            </Flex>

            <Flex w="100%" justify="space-between" mb="3" align="center">
              <Flex align="center">
                <Text color={textColor} fontWeight="medium" mr="2">
                  Tarifa de entrega:
                </Text>
                {location && (
                  <Badge variantColor="blue" borderRadius="full" px="2">
                    {location}
                  </Badge>
                )}
              </Flex>
              <Text fontWeight="medium">$ {locationFee} CUP</Text>
            </Flex>

            {/* Display payment method */}
            <Flex w="100%" justify="space-between" mb="3" align="center">
              <Text color={textColor} fontWeight="medium">
                Método de pago:
              </Text>
              <Badge variantColor={paymentMethod === "cash" ? "green" : "orange"} borderRadius="full" px="2">
                {paymentMethod === "cash" ? "Efectivo" : "Transferencia Bancaria"}
              </Badge>
            </Flex>

            {/* Display surcharge if bank transfer is selected */}
            {paymentMethod === "bank" && (
              <Flex w="100%" justify="space-between" mb="3" align="center">
                <Text color="orange.500" fontWeight="medium">
                  Recargo (15%):
                </Text>
                <Text fontWeight="medium" color="orange.500">
                  $ {surcharge} CUP
                </Text>
              </Flex>
            )}

            <Divider my="3" borderColor={borderColor} />

            <Flex w="100%" justify="space-between" p="3" bg={gray50} borderRadius="md" boxShadow="sm">
              <Text fontSize="lg" fontWeight="bold" color={highlightColor}>
                Total:
              </Text>
              <Text fontSize="lg" fontWeight="bold" color={highlightColor}>
                $ {total} CUP
              </Text>
            </Flex>

            {/* Add bank transfer info if selected */}
            {paymentMethod === "bank" && (
              <Alert status="info" mt="3" borderRadius="md">
                <AlertIcon />
                <Box fontSize="sm">
                  <Text>Recibirá un código QR para realizar la transferencia bancaria vía WhatsApp</Text>
                </Box>
              </Alert>
            )}

            {/* Add a button to toggle message preview */}
            <Button
              leftIcon={BiMessageDetail}
              variant="outline"
              size="sm"
              mt="4"
              w="100%"
              onClick={() => setShowPreview(!showPreview)}
              color={highlightColor}
              borderColor={borderColor}
            >
              {showPreview ? "Ocultar vista previa" : "Ver vista previa del mensaje"}
            </Button>

            {/* Message preview section */}
            {showPreview && (
              <Box
                mt="3"
                p="3"
                bg={gray50}
                borderRadius="md"
                fontSize="xs"
                color={textColor}
                borderWidth="1px"
                borderColor={borderColor}
                maxHeight="200px"
                overflowY="auto"
                className="fade-in"
              >
                <Text fontWeight="bold" mb="2">
                  Vista previa del mensaje de WhatsApp:
                </Text>
                <Text whiteSpace="pre-line">
                  🛒 *CONFIRMACIÓN DE PEDIDO* 🛒 📋 *INFORMACIÓN DEL PEDIDO* ------------------------------------------
                  🆔 *Número de Orden:* XXXXXXXX 👤 *INFORMACIÓN DEL CLIENTE* ------------------------------------------
                  *Nombre:* {location ? "Cliente" : "Complete el formulario"}
                  *Método de pago:* {paymentMethod === "cash" ? "Efectivo" : "Transferencia Bancaria"}
                  {paymentMethod === "bank" ? "*Incluye recargo del 15%*" : ""}📦 *PRODUCTOS ORDENADOS*
                  ------------------------------------------
                  {Object.values(cartItems).map(
                    (item, index) =>
                      `${index + 1}. *${item.title}*\n   • Cantidad: ${item.qty}\n   • Subtotal: ${(item.offerPrice || item.price) * item.qty} CUP\n`,
                  )}
                  💰 *RESUMEN DEL PEDIDO* ------------------------------------------ *Subtotal:* {subTotal} CUP *Tarifa
                  de entrega:* {locationFee} CUP
                  {paymentMethod === "bank" ? `*Recargo (15%):* ${surcharge} CUP` : ""}
                  *TOTAL A PAGAR:* {total} CUP
                </Text>
              </Box>
            )}
          </Box>
        </>
      ) : (
        <Flex direction="column" align="center" justify="center" p="8" bg={gray50} borderRadius="md" boxShadow="sm">
          <Text color={textColor} fontSize="lg" textAlign="center">
            No hay productos en tu cesta
          </Text>
          <Text color={gray500_400} fontSize="sm" textAlign="center" mt="2">
            Agrega productos para continuar con tu compra
          </Text>
        </Flex>
      )}
    </Box>
  )
}

export default OrderDetails
