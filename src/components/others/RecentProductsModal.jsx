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
  Image,
  Badge,
  Button,
  Flex,
  useDisclosure,
} from "@chakra-ui/core"

const RecentProductsModal = ({ children, recentCount = 0 }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  // Mock data para demostración
  const mockRecentProducts = [
    {
      id: "1",
      name: "Smartphone Samsung Galaxy S24",
      price: 899.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "Electrónicos",
      addedAt: new Date(Date.now() - 1000 * 60 * 5),
      rating: 4.8,
      isNew: true,
    },
    {
      id: "2",
      name: "Auriculares Sony WH-1000XM5",
      price: 349.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "Audio",
      addedAt: new Date(Date.now() - 1000 * 60 * 15),
      rating: 4.9,
      isNew: false,
    },
    {
      id: "3",
      name: 'MacBook Pro 14" M3',
      price: 1999.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "Computadoras",
      addedAt: new Date(Date.now() - 1000 * 60 * 30),
      rating: 4.7,
      isNew: true,
    },
    {
      id: "4",
      name: "iPad Air 5ta Generación",
      price: 599.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "Tablets",
      addedAt: new Date(Date.now() - 1000 * 60 * 60),
      rating: 4.6,
      isNew: false,
    },
    {
      id: "5",
      name: "Apple Watch Series 9",
      price: 399.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "Wearables",
      addedAt: new Date(Date.now() - 1000 * 60 * 120),
      rating: 4.5,
      isNew: false,
    },
  ].slice(0, recentCount)

  const formatTimeAgo = (date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Hace un momento"
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} min`
    if (diffInMinutes < 1440) return `Hace ${Math.floor(diffInMinutes / 60)} h`
    return `Hace ${Math.floor(diffInMinutes / 1440)} días`
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  const ProductCard = ({ product, index }) => (
    <Box
      key={product.id}
      padding={4}
      borderRadius="12px"
      border="1px solid"
      borderColor={product.isNew ? "#fed7aa" : "#e2e8f0"}
      borderLeftWidth="4px"
      borderLeftColor={product.isNew ? "#fb923c" : "#60a5fa"}
      backgroundColor={product.isNew ? "#fff7ed" : "white"}
      boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1)"
      _hover={{
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transform: "translateY(-4px)",
        borderColor: product.isNew ? "#fdba74" : "#93c5fd",
      }}
      transition="all 0.4s ease"
      marginBottom={index < mockRecentProducts.length - 1 ? 4 : 0}
      className="slide-in-up"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: "both",
      }}
      position="relative"
      overflow="hidden"
    >
      {/* Badge "Nuevo" */}
      {product.isNew && (
        <Badge
          position="absolute"
          top={2}
          right={2}
          backgroundColor="#ea580c"
          color="white"
          variant="solid"
          fontSize="xs"
          borderRadius="12px"
          paddingX={2}
          paddingY={1}
          className="slide-in-up"
          style={{ animationDelay: "0.8s", animationFillMode: "both" }}
        >
          ¡Nuevo!
        </Badge>
      )}

      <Flex direction={{ base: "column", sm: "row" }} align="center">
        {/* Product Image */}
        <Box flexShrink={0} marginRight={{ base: 0, sm: 4 }} marginBottom={{ base: 3, sm: 0 }}>
          <Box
            position="relative"
            width={{ base: "80px", sm: "100px" }}
            height={{ base: "80px", sm: "100px" }}
            borderRadius="12px"
            overflow="hidden"
            backgroundColor="#f7fafc"
            boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1)"
            _hover={{ transform: "scale(1.05)" }}
            transition="transform 0.3s ease"
          >
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>
        </Box>

        {/* Product Info */}
        <Box flex={1} minWidth={0} textAlign={{ base: "center", sm: "left" }}>
          <Flex
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            align={{ base: "center", sm: "flex-start" }}
            marginBottom={2}
          >
            <Text
              fontWeight="bold"
              color="#1a202c"
              fontSize={{ base: "md", md: "lg" }}
              _hover={{ color: "#2563eb" }}
              transition="color 0.2s"
              marginBottom={{ base: 2, sm: 0 }}
              noOfLines={2}
            >
              {product.name}
            </Text>
            <Badge
              backgroundColor={product.isNew ? "#fed7aa" : "#dbeafe"}
              color={product.isNew ? "#ea580c" : "#2563eb"}
              variant="outline"
              fontSize="xs"
              borderRadius="12px"
            >
              {product.category}
            </Badge>
          </Flex>

          <Flex
            direction={{ base: "column", sm: "row" }}
            justify="space-between"
            align={{ base: "center", sm: "center" }}
            marginBottom={4}
          >
            <Flex align="center" marginBottom={{ base: 2, sm: 0 }}>
              <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="#2563eb" marginRight={3}>
                {formatPrice(product.price)}
              </Text>
              {product.rating && (
                <Flex align="center" backgroundColor="#fefce8" paddingX={2} paddingY={1} borderRadius="12px">
                  <Text fontSize="sm" marginRight={1}>
                    ⭐
                  </Text>
                  <Text fontSize="sm" fontWeight="semibold" color="#a16207">
                    {product.rating}
                  </Text>
                </Flex>
              )}
            </Flex>

            <Flex
              align="center"
              fontSize="sm"
              color="#6b7280"
              backgroundColor="#f9fafb"
              paddingX={3}
              paddingY={1}
              borderRadius="12px"
            >
              <Text marginRight={1}>🕒</Text>
              <Text fontWeight="medium">{formatTimeAgo(product.addedAt)}</Text>
            </Flex>
          </Flex>

          {/* Action Buttons */}
          <Flex direction={{ base: "column", sm: "row" }} gap={3}>
            <Button
              size="sm"
              backgroundColor={product.isNew ? "#ea580c" : "#2563eb"}
              color="white"
              flex={{ base: 1, sm: "none" }}
              _hover={{
                transform: "translateY(-2px)",
                backgroundColor: product.isNew ? "#dc2626" : "#1d4ed8",
              }}
              transition="all 0.2s ease"
            >
              🛒 Agregar al carrito
            </Button>
            <Button
              size="sm"
              variant="outline"
              borderColor="#d1d5db"
              color="#374151"
              flex={{ base: 1, sm: "none" }}
              _hover={{
                transform: "translateY(-2px)",
                backgroundColor: "#f9fafb",
              }}
              transition="all 0.2s ease"
            >
              👁️ Ver detalles
            </Button>
          </Flex>
        </Box>
      </Flex>

      {/* Estilos CSS para animaciones */}
      <style jsx>{`
        .slide-in-up {
          animation: slide-in-up 0.6s ease-out;
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  )

  return (
    <>
      <Box onClick={onOpen} cursor="pointer">
        {children}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "full", sm: "xl", md: "3xl", lg: "5xl" }}>
        <ModalOverlay backgroundColor="rgba(0, 0, 0, 0.4)" backdropFilter="blur(10px)" />
        <ModalContent maxHeight="90vh" borderRadius={{ base: 0, sm: "12px" }}>
          <ModalHeader
            background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            color="white"
            borderTopRadius={{ base: 0, sm: "12px" }}
            paddingY={6}
          >
            <Flex align="center">
              <Box
                padding={3}
                backgroundColor="rgba(255, 255, 255, 0.2)"
                borderRadius="50%"
                marginRight={4}
                backdropFilter="blur(10px)"
                border="1px solid rgba(255, 255, 255, 0.3)"
              >
                <Text fontSize="2xl">🕒</Text>
              </Box>
              <Box>
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" marginBottom={1}>
                  Productos Vistos Recientemente
                </Text>
                <Text fontSize="sm" opacity={0.9}>
                  Tus últimas búsquedas y productos de interés
                </Text>
              </Box>
              <Box marginLeft="auto">
                <Badge
                  backgroundColor="rgba(255, 255, 255, 0.2)"
                  color="white"
                  variant="solid"
                  fontSize="md"
                  paddingX={3}
                  paddingY={1}
                  borderRadius="12px"
                  border="1px solid rgba(255, 255, 255, 0.3)"
                >
                  {mockRecentProducts.length}
                </Badge>
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton color="white" size="lg" />

          <ModalBody padding={6} overflowY="auto">
            {mockRecentProducts.length === 0 ? (
              <Box textAlign="center" paddingY={16}>
                <Box
                  padding={6}
                  backgroundColor="#f7fafc"
                  borderRadius="50%"
                  display="inline-block"
                  marginBottom={6}
                  className="slide-in-up"
                >
                  <Text fontSize="4xl">🛍️</Text>
                </Box>
                <Text fontSize="xl" fontWeight="bold" color="#4a5568" marginBottom={3}>
                  No hay productos recientes
                </Text>
                <Text color="#718096" maxWidth="md" marginX="auto" lineHeight="tall">
                  Los productos que veas se mostrarán aquí para que puedas acceder a ellos fácilmente y continuar tu
                  experiencia de compra
                </Text>
              </Box>
            ) : (
              <Box>
                {mockRecentProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </Box>
            )}
          </ModalBody>

          {mockRecentProducts.length > 0 && (
            <Box
              padding={6}
              paddingTop={4}
              background="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              color="white"
              borderBottomRadius={{ base: 0, sm: "12px" }}
            >
              <Flex direction={{ base: "column", sm: "row" }} justify="space-between" align="center">
                <Text
                  fontSize="sm"
                  opacity={0.9}
                  textAlign={{ base: "center", sm: "left" }}
                  marginBottom={{ base: 3, sm: 0 }}
                >
                  Mostrando {mockRecentProducts.length} productos recientes • Actualizado hace un momento
                </Text>
                <Flex gap={3} width={{ base: "full", sm: "auto" }}>
                  <Button
                    variant="outline"
                    size="sm"
                    flex={{ base: 1, sm: "none" }}
                    color="white"
                    borderColor="rgba(255, 255, 255, 0.4)"
                    _hover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                  >
                    Limpiar historial
                  </Button>
                  <Button
                    backgroundColor="rgba(255, 255, 255, 0.2)"
                    color="white"
                    size="sm"
                    flex={{ base: 1, sm: "none" }}
                    _hover={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                    backdropFilter="blur(10px)"
                  >
                    Ver todos los productos
                  </Button>
                </Flex>
              </Flex>
            </Box>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default RecentProductsModal
