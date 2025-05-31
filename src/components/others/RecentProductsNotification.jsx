"use client"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Text,
  Flex,
  Image,
  Badge,
  Button,
  VStack,
  HStack,
  Divider,
  useColorMode,
} from "@chakra-ui/core"
import { useRecoilValue } from "recoil"
import { selectedCurrency } from "../../recoil/state"

// Función helper para formatear moneda
const formatCurrencyFallback = (amount, currency = "USD") => {
  try {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(amount)
  } catch (error) {
    return `$${amount.toFixed(2)}`
  }
}

const RecentProductsNotification = ({ isOpen, onClose, recentProducts = [], onClearAll }) => {
  const currency = useRecoilValue(selectedCurrency)
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark"

  // Colores basados en el modo
  const bgColor = isDark ? "gray.800" : "white"
  const borderColor = isDark ? "gray.600" : "gray.200"
  const textColor = isDark ? "white" : "gray.800"
  const mutedTextColor = isDark ? "gray.400" : "gray.500"

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return "Tiempo desconocido"

    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / (1000 * 60))

    if (minutes < 1) return "Hace un momento"
    if (minutes === 1) return "Hace 1 minuto"
    if (minutes < 60) return `Hace ${minutes} minutos`

    const hours = Math.floor(minutes / 60)
    if (hours === 1) return "Hace 1 hora"
    return `Hace ${hours} horas`
  }

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll()
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent bg={bgColor} mx={4} maxH="80vh" color={textColor}>
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Text fontSize="lg" fontWeight="bold">
              Productos Recientes
            </Text>
            <Badge colorScheme="blue" variant="solid">
              {recentProducts.length}
            </Badge>
          </Flex>
          <Text fontSize="sm" color={mutedTextColor} mt={1}>
            Productos agregados en los últimos 5 minutos
          </Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6} overflowY="auto">
          {recentProducts.length === 0 ? (
            <Box textAlign="center" py={8}>
              <Text color={mutedTextColor} fontSize="md">
                No hay productos agregados recientemente
              </Text>
              <Text color={mutedTextColor} fontSize="sm" mt={2}>
                Los productos aparecerán aquí cuando los agregues al carrito
              </Text>
              <Box mt={4} p={3} bg={isDark ? "gray.700" : "gray.50"} borderRadius="md">
                <Text color={mutedTextColor} fontSize="xs">
                  💡 <strong>Tip:</strong> Usa <kbd>Alt + F</kbd> para abrir esta ventana rápidamente
                </Text>
              </Box>
            </Box>
          ) : (
            <VStack spacing={3} align="stretch">
              {recentProducts.map((product, index) => (
                <Box key={`${product.id}-${index}-${product.timestamp}`}>
                  <Flex align="center" spacing={3}>
                    <Image
                      src={product.image || "/placeholder.svg?height=50&width=50"}
                      alt={product.name || "Producto"}
                      boxSize="50px"
                      objectFit="cover"
                      borderRadius="md"
                      border="1px"
                      borderColor={borderColor}
                      fallbackSrc="/placeholder.svg?height=50&width=50"
                    />

                    <Box flex="1" ml={3}>
                      <Text fontWeight="medium" fontSize="sm" noOfLines={2} color={textColor}>
                        {product.name || "Producto sin nombre"}
                      </Text>
                      <HStack spacing={2} mt={1}>
                        <Text fontSize="sm" fontWeight="bold" color="blue.500">
                          {formatCurrencyFallback(product.price || 0, currency)}
                        </Text>
                        <Badge size="sm" colorScheme="green">
                          x{product.quantity || 1}
                        </Badge>
                      </HStack>
                      <Text fontSize="xs" color={mutedTextColor} mt={1}>
                        {formatTimeAgo(product.timestamp)}
                      </Text>
                    </Box>
                  </Flex>

                  {index < recentProducts.length - 1 && <Divider mt={3} borderColor={borderColor} />}
                </Box>
              ))}

              <Box pt={4}>
                <VStack spacing={2}>
                  <HStack spacing={2} w="100%">
                    <Button size="sm" variant="outline" colorScheme="red" flex="1" onClick={handleClearAll}>
                      Limpiar historial
                    </Button>
                    <Button size="sm" variant="outline" flex="1" onClick={onClose}>
                      Cerrar
                    </Button>
                  </HStack>
                  <Box p={2} bg={isDark ? "gray.700" : "gray.50"} borderRadius="md" w="100%">
                    <Text fontSize="xs" color={mutedTextColor} textAlign="center">
                      ⏰ Los productos se eliminan automáticamente después de 5 minutos
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </VStack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default RecentProductsNotification
