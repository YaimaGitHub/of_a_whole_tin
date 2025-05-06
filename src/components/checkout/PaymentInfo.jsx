"use client"

import { Box, Text, Flex, Icon, useColorMode } from "@chakra-ui/core"
import { BiInfoCircle, BiQr } from "react-icons/bi"

export default function PaymentInfo({ paymentMethod }) {
  const { colorMode } = useColorMode()

  // Colors for modern UI
  const bgColor = colorMode === "light" ? "orange.50" : "gray.700"
  const borderColor = colorMode === "light" ? "orange.200" : "orange.800"
  const textColor = colorMode === "light" ? "gray.700" : "gray.200"
  const highlightColor = colorMode === "light" ? "orange.500" : "orange.300"

  if (paymentMethod !== "transfer") {
    return null
  }

  return (
    <Box mt="6" p="4" bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor} className="fade-in">
      <Flex align="center" mb="3">
        <Icon as={BiInfoCircle} color={highlightColor} size="24px" mr="2" />
        <Text fontWeight="bold" color={highlightColor}>
          Información de Pago - Transferencia Bancaria
        </Text>
      </Flex>

      <Text fontSize="sm" color={textColor} mb="3">
        Has seleccionado pago por transferencia bancaria. Se ha aplicado un recargo del 15% al subtotal de tu compra.
      </Text>

      <Box
        p="4"
        bg={colorMode === "light" ? "white" : "gray.800"}
        borderRadius="md"
        borderWidth="1px"
        borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
        mb="3"
      >
        <Flex direction="column" align="center">
          <Icon as={BiQr} size="48px" color={highlightColor} mb="2" />
          <Text fontSize="sm" fontWeight="medium" mb="2" textAlign="center">
            Después de confirmar tu pedido, envía una foto de alta calidad del comprobante de transferencia al mismo
            número de WhatsApp.
          </Text>
          <Text fontSize="xs" color={colorMode === "light" ? "gray.500" : "gray.400"} textAlign="center">
            El código QR para la transferencia te será proporcionado por el vendedor.
          </Text>
        </Flex>
      </Box>

      <Text fontSize="xs" color={colorMode === "light" ? "orange.600" : "orange.300"}>
        Nota: Tu pedido será procesado una vez que se confirme la transferencia.
      </Text>
    </Box>
  )
}
