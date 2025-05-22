"use client"

import { useEffect, useState, useRef } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Box,
  Flex,
  Image,
  Text,
  Badge,
  Grid,
  useToast,
  PseudoBox,
  useColorMode,
  Button,
  IconButton,
  Divider,
  Spinner,
} from "@chakra-ui/core"
import products from "../../data"
import { useRouter } from "next/router"
import CounterBtn from "./CounterBtn"
import { useRecoilValue } from "recoil"
import { cart } from "../../recoil/state"
import productDescriptions from "../../data/productDescriptions"

const NewProductsModal = ({ isOpen, onClose }) => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [newProducts, setNewProducts] = useState([])
  const [productDescription, setProductDescription] = useState("")
  const [isLoadingDescription, setIsLoadingDescription] = useState(false)
  const modalRef = useRef(null)
  const router = useRouter()
  const toast = useToast()
  const { colorMode } = useColorMode()

  // Mover el hook useRecoilValue al nivel superior del componente
  const currentCart = useRecoilValue(cart)

  // Calcular si el producto está en el carrito
  const getCartQuantity = (product) => {
    if (!product || !currentCart[product.id]) return 0
    return currentCart[product.id].qty
  }

  // Colores basados en el tema
  const cardBg = colorMode === "light" ? "white" : "gray.700"
  const textColor = colorMode === "light" ? "gray.800" : "white"
  const subTextColor = colorMode === "light" ? "gray.600" : "gray.300"
  const headerBg = colorMode === "light" ? "bluex.600" : "bluex.800"
  const headerColor = "white"
  const sectionBg = colorMode === "light" ? "gray.50" : "gray.800"

  useEffect(() => {
    // Filtrar productos nuevos (últimos 30 días)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const filtered = products
      .filter((product) => {
        // Primero verificar si isNew está explícitamente establecido como true
        if (product.isNew === true) return true

        // Si no, verificar la fecha de adición
        if (product.dateAdded) {
          const productDate = new Date(product.dateAdded)
          return productDate >= thirtyDaysAgo
        }

        return false
      })
      // Ordenar por fecha de adición (más recientes primero)
      .sort((a, b) => {
        if (!a.dateAdded) return 1
        if (!b.dateAdded) return -1
        return new Date(b.dateAdded) - new Date(a.dateAdded)
      })
      // Limitar a 10 productos
      .slice(0, 10)

    setNewProducts(filtered)
  }, [])

  // Actualizar la descripción cuando cambia el producto seleccionado
  useEffect(() => {
    if (!selectedProduct) {
      setProductDescription("")
      return
    }

    setIsLoadingDescription(true)

    // Función para obtener la descripción del producto
    const fetchProductDescription = async () => {
      try {
        // 1. Verificar si el producto tiene una descripción directa
        if (selectedProduct.description && typeof selectedProduct.description === "string") {
          setProductDescription(selectedProduct.description)
          setIsLoadingDescription(false)
          return
        }

        // 2. Buscar en productDescriptions por ID
        if (productDescriptions && typeof productDescriptions === "object") {
          const productId = selectedProduct.id.toString()

          // Buscar la descripción exacta por ID
          if (productDescriptions[productId]) {
            const desc = productDescriptions[productId]
            if (typeof desc === "string") {
              setProductDescription(desc)
              setIsLoadingDescription(false)
              return
            }
          }

          // Buscar por coincidencia parcial si no se encuentra exacta
          for (const [key, value] of Object.entries(productDescriptions)) {
            if (key.includes(productId) || productId.includes(key)) {
              if (typeof value === "string") {
                setProductDescription(value)
                setIsLoadingDescription(false)
                return
              }
            }
          }
        }

        // 3. Si no se encuentra descripción, buscar en el producto original
        const originalProduct = products.find((p) => p.id === selectedProduct.id)
        if (originalProduct && originalProduct.description && typeof originalProduct.description === "string") {
          setProductDescription(originalProduct.description)
          setIsLoadingDescription(false)
          return
        }

        // 4. Si no hay descripción disponible
        setProductDescription("Este producto no tiene descripción disponible.")
        setIsLoadingDescription(false)
      } catch (error) {
        console.error("Error al obtener la descripción del producto:", error)
        setProductDescription("Este producto no tiene descripción disponible.")
        setIsLoadingDescription(false)
      }
    }

    fetchProductDescription()
  }, [selectedProduct])

  // Manejar clic en producto
  const handleProductClick = (product) => {
    setSelectedProduct(product)
    // Añadir entrada al historial para manejar el botón atrás
    window.history.pushState({ modal: true, product: product.id }, "", window.location.pathname)
  }

  // Manejar botón atrás
  const handleBack = () => {
    setSelectedProduct(null)
    // Actualizar el historial para evitar comportamientos inesperados
    window.history.pushState({ modal: true }, "", window.location.pathname)
  }

  // Escuchar evento de navegación del navegador
  useEffect(() => {
    const handlePopState = (event) => {
      // Si estamos en la vista de detalle del producto, volver a la lista
      if (selectedProduct) {
        setSelectedProduct(null)
        // Prevenir que se cierre el modal
        if (isOpen) {
          event.preventDefault()
          window.history.pushState({ modal: true }, "", window.location.pathname)
        }
      } else if (isOpen) {
        // Si estamos en la lista de productos y se presiona atrás, cerrar el modal
        onClose()
      }
    }

    window.addEventListener("popstate", handlePopState)

    // Cuando se abre el modal, añadir entrada al historial
    if (isOpen && !selectedProduct) {
      window.history.pushState({ modal: true }, "", window.location.pathname)
    }

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [selectedProduct, isOpen, onClose])

  // Manejar gestos de deslizamiento en dispositivos móviles
  useEffect(() => {
    const modalElement = modalRef.current
    if (!modalElement) return

    let touchStartX = 0
    let touchEndX = 0

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX
    }

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX
      handleSwipe()
    }

    const handleSwipe = () => {
      // Si el deslizamiento es de izquierda a derecha (más de 100px)
      if (touchEndX - touchStartX > 100) {
        // Comportamiento de "atrás"
        if (selectedProduct) {
          handleBack()
        }
      }
    }

    modalElement.addEventListener("touchstart", handleTouchStart, false)
    modalElement.addEventListener("touchend", handleTouchEnd, false)

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("touchstart", handleTouchStart)
        modalElement.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [selectedProduct, modalRef])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent
        ref={modalRef}
        maxW={{ base: "100%", md: "90%", lg: "80%" }}
        maxH={{ base: "100%", md: "90%" }}
        my={{ base: 0, md: "5vh" }}
        borderRadius={{ base: 0, md: "md" }}
      >
        <ModalHeader
          bg={headerBg}
          color={headerColor}
          borderTopRadius={{ base: 0, md: "md" }}
          py={4}
          position="sticky"
          top="0"
          zIndex="10"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex align="center" flex="1">
            {selectedProduct && (
              <IconButton
                icon="arrow-back"
                variant="ghost"
                color={headerColor}
                fontSize="24px"
                mr={2}
                onClick={handleBack}
                aria-label="Volver a productos nuevos"
                _hover={{ bg: "rgba(255,255,255,0.2)" }}
              />
            )}
            <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" isTruncated>
              {selectedProduct ? selectedProduct.title : "Productos Nuevos"}
            </Text>
          </Flex>
          <IconButton
            icon="close"
            variant="ghost"
            color={headerColor}
            fontSize="20px"
            onClick={onClose}
            aria-label="Cerrar ventana"
            _hover={{ bg: "rgba(255,255,255,0.2)" }}
          />
        </ModalHeader>

        <ModalBody p={0} ref={modalRef}>
          {selectedProduct ? (
            // Vista detallada del producto - REORGANIZADA Y MEJORADA
            <Box>
              {/* 1. Imagen del producto a pantalla completa */}
              <Box position="relative" width="100%">
                <Image
                  src={`/images/${selectedProduct.img}`}
                  fallbackSrc="/images/productosinimagen.jpg"
                  alt={selectedProduct.title}
                  objectFit="contain"
                  width="100%"
                  height={{ base: "220px", sm: "280px", md: "350px", lg: "400px" }}
                  bg={colorMode === "light" ? "white" : "gray.900"}
                />

                {/* Badges sobre la imagen */}
                <Flex position="absolute" top="10px" right="10px" direction="column" align="flex-end">
                  {selectedProduct.offerPrice && (
                    <Badge variant="solid" variantColor="red" px="2" py="1" mb={2} borderRadius="full" boxShadow="md">
                      Promoción
                    </Badge>
                  )}

                  {!selectedProduct.allowBankTransfer && (
                    <PseudoBox
                      px="3"
                      py="1"
                      borderRadius="full"
                      fontSize="xs"
                      fontWeight="bold"
                      bg="#FF3B30"
                      color="white"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      boxShadow="0 0 8px rgba(255, 59, 48, 0.6), 0 0 0 1px rgba(0, 0, 0, 0.1)"
                    >
                      <PseudoBox as="span" display="inline-block" mr="1" fontSize="10px">
                        🔒
                      </PseudoBox>
                      <Text as="span" fontWeight="extrabold" textShadow="0px 1px 2px rgba(0,0,0,0.3)">
                        Solo efectivo
                      </Text>
                    </PseudoBox>
                  )}
                </Flex>
              </Box>

              {/* 2. Información del producto */}
              <Box p={{ base: 3, sm: 4, md: 5 }}>
                {/* Título y precio */}
                <Box mb={4}>
                  <Text fontSize={{ base: "lg", md: "xl", lg: "2xl" }} fontWeight="bold" color={textColor}>
                    {selectedProduct.title}
                  </Text>

                  {selectedProduct.title1 && (
                    <Text fontSize={{ base: "sm", md: "md" }} color={subTextColor} mt={1}>
                      {selectedProduct.title1}
                    </Text>
                  )}

                  <Flex align="center" mt={3}>
                    <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold" color={textColor}>
                      {selectedProduct.offerPrice || selectedProduct.price} CUP
                    </Text>
                    {selectedProduct.offerPrice && (
                      <Text ml="3" fontSize={{ base: "md", md: "md" }} fontWeight="medium" as="del" color="gray.400">
                        {selectedProduct.price} CUP
                      </Text>
                    )}
                  </Flex>
                </Box>

                <Divider />

                {/* 3. Categorías */}
                <Flex mt={4} mb={4} flexWrap="wrap">
                  <Badge variantColor="blue" mr={2} mb={2} fontSize={{ base: "xs", md: "sm" }}>
                    {selectedProduct.category}
                  </Badge>
                  <Badge variantColor="teal" mb={2} fontSize={{ base: "xs", md: "sm" }}>
                    {selectedProduct.subcategory}
                  </Badge>
                </Flex>

                {/* 4. Descripción del producto - CORREGIDA Y MEJORADA */}
                <Box
                  mt={4}
                  mb={4}
                  p={{ base: 3, md: 4 }}
                  bg={sectionBg}
                  borderRadius="md"
                  boxShadow="sm"
                  fontSize={{ base: "sm", md: "md" }}
                >
                  <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" mb={2} color={textColor}>
                    Descripción
                  </Text>

                  {isLoadingDescription ? (
                    <Flex justify="center" align="center" py={4}>
                      <Spinner size="md" color="blue.500" mr={3} />
                      <Text>Cargando descripción...</Text>
                    </Flex>
                  ) : (
                    <Text color={subTextColor} whiteSpace="pre-wrap" fontSize={{ base: "sm", md: "md" }}>
                      {productDescription}
                    </Text>
                  )}

                  {/* Características del producto */}
                  {selectedProduct.features && selectedProduct.features.length > 0 && (
                    <Box mt={4}>
                      <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" mb={2} color={textColor}>
                        Características:
                      </Text>
                      <Box as="ul" pl={4}>
                        {selectedProduct.features.map((feature, index) => (
                          <Box as="li" key={index} fontSize={{ base: "sm", md: "md" }} color={subTextColor} mb={1}>
                            {feature}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* 5. Botón para agregar al carrito */}
                <Box mt={6} mb={6}>
                  <CounterBtn
                    item={selectedProduct}
                    counter={getCartQuantity(selectedProduct)}
                    size={{ base: "md", md: "lg" }}
                    width="100%"
                  />
                </Box>

                {/* 6. Botón para volver a la lista */}
                <Button
                  leftIcon="arrow-back"
                  variant="outline"
                  width="100%"
                  onClick={handleBack}
                  fontWeight="medium"
                  size={{ base: "md", md: "md" }}
                  mb={{ base: 6, md: 4 }}
                >
                  Volver a productos nuevos
                </Button>
              </Box>
            </Box>
          ) : (
            // Lista de productos nuevos - AJUSTADA A 2 PRODUCTOS POR FILA
            <Box p={{ base: 2, sm: 3, md: 4 }}>
              <Grid templateColumns="repeat(2, 1fr)" gap={{ base: 2, sm: 3, md: 4 }}>
                {newProducts.map((product) => (
                  <Flex
                    key={product.id}
                    direction="column"
                    bg={cardBg}
                    rounded="md"
                    overflow="hidden"
                    shadow="md"
                    onClick={() => handleProductClick(product)}
                    cursor="pointer"
                    transition="transform 0.2s, box-shadow 0.2s"
                    _hover={{
                      transform: "translateY(-5px)",
                      shadow: "lg",
                    }}
                    role="button"
                    aria-label={`Ver detalles de ${product.title}`}
                    height="100%"
                  >
                    <Box position="relative" h={{ base: "120px", sm: "140px", md: "180px" }}>
                      <Image
                        src={`/images/${product.img}`}
                        fallbackSrc="/images/productosinimagen.jpg"
                        alt={product.title}
                        objectFit="cover"
                        size="100%"
                      />

                      {product.offerPrice && (
                        <Badge
                          variant="solid"
                          variantColor="red"
                          position="absolute"
                          px="2"
                          top="5px"
                          right="5px"
                          borderRadius="full"
                          fontSize="xs"
                        >
                          Promoción
                        </Badge>
                      )}

                      <Badge
                        variant="solid"
                        variantColor="green"
                        position="absolute"
                        px="2"
                        top="5px"
                        left="5px"
                        borderRadius="full"
                        fontSize="xs"
                      >
                        Nuevo
                      </Badge>
                    </Box>

                    <Box
                      p={{ base: 2, md: 3 }}
                      flex="1"
                      display="flex"
                      flexDirection="column"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Text
                          fontSize={{ base: "xs", sm: "sm", md: "sm" }}
                          fontWeight="bold"
                          noOfLines={2}
                          color={textColor}
                          mb={1}
                        >
                          {product.title}
                        </Text>

                        <Text fontSize={{ base: "2xs", sm: "xs", md: "xs" }} color={subTextColor} noOfLines={1}>
                          {product.category} - {product.subcategory}
                        </Text>
                      </Box>

                      <Flex align="flex-end" mt={2}>
                        <Text fontSize={{ base: "sm", md: "md" }} fontWeight="bold" color={textColor}>
                          {product.offerPrice || product.price} CUP
                        </Text>
                        {product.offerPrice && (
                          <Text ml="1" fontSize={{ base: "xs", md: "sm" }} as="del" color="gray.400">
                            {product.price} CUP
                          </Text>
                        )}
                      </Flex>
                    </Box>
                  </Flex>
                ))}
              </Grid>

              {newProducts.length === 0 && (
                <Box textAlign="center" py={10}>
                  <Text fontSize="lg" color={subTextColor}>
                    No hay productos nuevos disponibles en este momento.
                  </Text>
                </Box>
              )}
            </Box>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default NewProductsModal
