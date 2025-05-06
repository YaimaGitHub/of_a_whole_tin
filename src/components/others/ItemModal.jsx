"use client"

import {
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Box,
  Flex,
  Text,
  Badge,
  Button,
  useColorMode,
  Grid,
  Icon,
} from "@chakra-ui/core"
import { useSetRecoilState } from "recoil"
import { refreshCart } from "../../recoil/state"
import useIsInCart from "../../hooks/useIsInCart"
import { useState, useEffect, useRef, useCallback } from "react"
import useIsDesktop from "../../hooks/useIsDesktop"

export default function ItemModal({ showModal, setModal, item }) {
  const { img, title, title1, price, offerPrice, category, id, stock } = item || {}
  const setCart = useSetRecoilState(refreshCart)
  const counter = useIsInCart(item || {})
  const { colorMode } = useColorMode()
  const isDesktop = useIsDesktop()
  const [description, setDescription] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024)
  const slideInterval = useRef(null)
  const slideDelay = 3000 // Time in ms between slides

  const isSmallScreen = windowWidth <= 480
  const isTablet = windowWidth > 480 && windowWidth <= 768
  const isPc = windowWidth > 768

  // Generate product images array with main image and additional images
  const productImages = [
    img, // Main image
    ...(item.additionalImages || []), // Additional images if they exist
  ]

  // Function to advance to the next slide
  const nextSlide = useCallback(() => {
    if (!isPaused) {
      setSelectedImage((prevIndex) => (prevIndex + 1) % productImages.length)
    }
  }, [isPaused, productImages.length])

  // Setup automatic slideshow
  useEffect(() => {
    if (showModal) {
      slideInterval.current = setInterval(nextSlide, slideDelay)
    }
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current)
      }
    }
  }, [showModal, nextSlide])

  useEffect(() => {
    if (typeof window === "undefined") return

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Theme colors
  const bgColor = colorMode === "light" ? "white" : "gray.800"
  const textColor = colorMode === "light" ? "gray.800" : "white"
  const subTextColor = colorMode === "light" ? "gray.600" : "gray.300"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.700"
  const accentColor = "teal.500"
  const accentColorLight = "teal.400"
  const accentColorDark = "teal.600"
  const cardBgColor = colorMode === "light" ? "white" : "gray.700"

  useEffect(() => {
    // Generate a unique description based on the product
    if (item) {
      const descriptions = {
        // Descriptions for different categories
        Alimentos: `Este producto de alta calidad ofrece un sabor excepcional y frescura garantizada. Elaborado con ingredientes seleccionados cuidadosamente para asegurar la mejor experiencia gastronómica.`,
        Aseo: `Producto de limpieza de primera calidad que garantiza resultados impecables. Su fórmula avanzada elimina eficazmente la suciedad mientras cuida las superficies.`,
        Bebidas: `Refrescante bebida con un sabor único que satisface hasta los paladares más exigentes. Elaborada con ingredientes de primera calidad y un proceso que garantiza su frescura.`,
        Cárnicos: `Selección premium de carne con el mejor sabor y textura. Proveniente de animales criados en condiciones óptimas, garantizando la máxima calidad.`,
        Dulces: `Deliciosa golosina que combina sabores tradicionales con toques innovadores. Elaborada con ingredientes seleccionados para ofrecer una experiencia dulce incomparable.`,
        Embutidos: `Embutido artesanal elaborado siguiendo recetas tradicionales con un toque moderno. Su sabor único y textura perfecta lo convierten en el complemento ideal para sus comidas.`,
        Frutas: `Fruta fresca seleccionada en su punto óptimo de maduración. Rica en vitaminas y nutrientes esenciales para una dieta equilibrada.`,
        Lácteos: `Producto lácteo de la más alta calidad, elaborado con leche fresca y procesos que preservan todos sus nutrientes. Su cremosa textura y sabor equilibrado lo hacen perfecto.`,
        Limpieza: `Producto de limpieza profesional ahora disponible para su hogar. Su fórmula concentrada garantiza resultados superiores con menos producto.`,
        Otros: `Producto esencial para su hogar, diseñado pensando en la practicidad y eficiencia. Su calidad superior garantiza durabilidad y satisfacción en cada uso.`,
        Vegetales: `Vegetal fresco cultivado siguiendo prácticas sostenibles que respetan el medio ambiente. Rico en nutrientes esenciales y con un sabor auténtico.`,
      }

      // Default description if category not found
      const defaultDesc = `Este producto de alta calidad ha sido seleccionado cuidadosamente para garantizar la mejor experiencia. Su diseño versátil lo hace perfecto para múltiples usos.`

      // Set description based on category or use default
      setDescription(descriptions[category] || defaultDesc)
    }
  }, [item])

  if (!item) return null

  const handleAddToCart = () => {
    setCart({ item, n: 1 })
  }

  // Determine modal size based on screen size
  const getModalSize = () => {
    if (isSmallScreen) return "full"
    if (isTablet) return "xl"
    return "5xl"
  }

  // Determine if modal should be centered
  const isCentered = !isSmallScreen

  // Handler for when user manually selects an image
  const handleImageSelect = (index) => {
    setSelectedImage(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 5000) // Resume slideshow after 5 seconds
  }

  // Image Banner component with automatic slideshow
  const ImageBanner = ({ images, currentIndex, onSelect, height, showIndicators = true, showThumbnails = true }) => (
    <Box
      position="relative"
      paddingBottom={height || "75%"}
      width="100%"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image Slider */}
      <Box position="absolute" top="0" left="0" width="100%" height="100%">
        {images.map((imgSrc, index) => (
          <Box
            key={index}
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            opacity={currentIndex === index ? 1 : 0}
            transition="opacity 0.5s ease-in-out"
            zIndex={currentIndex === index ? 1 : 0}
          >
            <Image
              src={`/images/${imgSrc}`}
              fallbackSrc="/images/productosinimagen.jpg"
              alt={`${title} - imagen ${index + 1}`}
              objectFit="cover"
              width="100%"
              height="100%"
            />
          </Box>
        ))}
      </Box>

      {/* Indicators */}
      {showIndicators && (
        <Flex position="absolute" bottom="3" left="0" right="0" justify="center" gap="2" zIndex="2">
          {images.map((_, index) => (
            <Box
              key={index}
              w="8px"
              h="8px"
              borderRadius="full"
              bg={currentIndex === index ? "white" : "whiteAlpha.600"}
              cursor="pointer"
              onClick={() => onSelect(index)}
              transition="all 0.2s"
              _hover={{ transform: "scale(1.2)", bg: "white" }}
            />
          ))}
        </Flex>
      )}

      {/* Thumbnails */}
      {showThumbnails && !isSmallScreen && (
        <Flex position="absolute" bottom="4" left="0" right="0" justify="center" gap="3" zIndex="2">
          {images.map((imgSrc, index) => (
            <Box
              key={index}
              w={isPc ? "60px" : "50px"}
              h={isPc ? "60px" : "50px"}
              borderRadius="md"
              overflow="hidden"
              border="2px solid"
              borderColor={currentIndex === index ? "white" : "whiteAlpha.600"}
              cursor="pointer"
              onClick={() => onSelect(index)}
              transition="all 0.2s"
              _hover={{ transform: "scale(1.05)" }}
              boxShadow="md"
            >
              <Image
                src={`/images/${imgSrc}`}
                fallbackSrc="/images/productosinimagen.jpg"
                alt={`${title} - vista ${index + 1}`}
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </Box>
          ))}
        </Flex>
      )}

      {/* Category Badge */}
      <Badge
        position="absolute"
        top="3"
        left="3"
        px="2"
        py="1"
        borderRadius="md"
        variantColor="blue"
        fontSize={isPc ? "sm" : "xs"}
        zIndex="2"
        boxShadow="md"
      >
        {category}
      </Badge>

      {/* Offer Badge */}
      {offerPrice && (
        <Badge
          position="absolute"
          top="3"
          right="3"
          px="2"
          py="1"
          borderRadius="md"
          variantColor="red"
          fontSize={isPc ? "sm" : "xs"}
          zIndex="2"
          boxShadow="md"
        >
          Promoción
        </Badge>
      )}
    </Box>
  )

  return (
    <Modal onClose={() => setModal(false)} isOpen={showModal} size={getModalSize()} isCentered={isCentered}>
      <ModalOverlay bg="blackAlpha.600" />
      <ModalContent
        bg={bgColor}
        borderRadius={isSmallScreen ? "0" : "2xl"}
        overflow="hidden"
        maxW={isPc ? "1100px" : "100%"}
        marginY={isSmallScreen ? "0" : "auto"}
        height={isSmallScreen ? "100vh" : "auto"}
        maxH={isPc ? "85vh" : "100vh"}
        boxShadow="2xl"
      >
        <ModalCloseButton
          zIndex="10"
          color="white"
          bg="blackAlpha.500"
          borderRadius="full"
          size="md"
          _hover={{ bg: "blackAlpha.700" }}
        />

        {/* Mobile Layout */}
        {isSmallScreen && (
          <Box h="100%" overflowY="auto">
            {/* Product Image Banner */}
            <ImageBanner
              images={productImages}
              currentIndex={selectedImage}
              onSelect={handleImageSelect}
              height="75%"
              showThumbnails={false}
            />

            {/* Product Info */}
            <Box p="4">
              <Text fontSize="xl" fontWeight="bold" color={textColor} mb="1">
                {title}
              </Text>

              {title1 && (
                <Text fontSize="sm" color={subTextColor} mb="3">
                  {title1}
                </Text>
              )}

              <Flex align="center" mb="4">
                <Text fontSize="2xl" fontWeight="bold" color={accentColor}>
                  {offerPrice || price} CUP
                </Text>
                {offerPrice && (
                  <Text ml="2" fontSize="md" as="del" color="gray.400">
                    {price} CUP
                  </Text>
                )}
              </Flex>

              <Box
                bg={colorMode === "light" ? "gray.50" : "gray.700"}
                p="3"
                borderRadius="md"
                mb="4"
                fontSize="sm"
                color={textColor}
              >
                {description}
              </Box>

              <Flex
                bg={colorMode === "light" ? "gray.50" : "gray.700"}
                p="3"
                borderRadius="md"
                mb="4"
                justify="space-between"
                fontSize="sm"
              >
                <Text fontWeight="medium" color={textColor}>
                  Stock disponible:
                </Text>
                <Text color={subTextColor}>{stock} unidades</Text>
              </Flex>

              {/* Add to Cart Button */}
              <Box mt="4">
                {counter < 1 ? (
                  <Button
                    variantColor="teal"
                    size="lg"
                    width="100%"
                    onClick={handleAddToCart}
                    boxShadow="md"
                    _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                    transition="all 0.2s"
                  >
                    Añadir a la cesta
                  </Button>
                ) : (
                  <Flex align="center" justify="center" bg="green.50" p="3" borderRadius="md" boxShadow="md">
                    <Icon name="check-circle" color="green.500" mr="2" />
                    <Text color="green.500">Producto en la cesta ({counter})</Text>
                  </Flex>
                )}
              </Box>
            </Box>
          </Box>
        )}

        {/* Tablet Layout */}
        {isTablet && (
          <Grid templateColumns="1fr" gap="0" maxH="90vh" overflowY="auto">
            {/* Product Image Banner */}
            <ImageBanner
              images={productImages}
              currentIndex={selectedImage}
              onSelect={handleImageSelect}
              height="56.25%"
            />

            <Box p="5">
              <Flex justify="space-between" align="flex-start" mb="4">
                <Box>
                  <Text fontSize="2xl" fontWeight="bold" color={textColor} mb="1">
                    {title}
                  </Text>

                  {title1 && (
                    <Text fontSize="md" color={subTextColor}>
                      {title1}
                    </Text>
                  )}
                </Box>

                <Flex direction="column" align="flex-end">
                  <Text fontSize="2xl" fontWeight="bold" color={accentColor}>
                    {offerPrice || price} CUP
                  </Text>
                  {offerPrice && (
                    <Text fontSize="md" as="del" color="gray.400">
                      {price} CUP
                    </Text>
                  )}
                </Flex>
              </Flex>

              <Grid templateColumns="1fr 1fr" gap="4" mb="5">
                <Box
                  bg={colorMode === "light" ? "gray.50" : "gray.700"}
                  p="4"
                  borderRadius="lg"
                  fontSize="sm"
                  color={textColor}
                  boxShadow="sm"
                >
                  <Text fontWeight="bold" mb="2">
                    Descripción
                  </Text>
                  {description}
                </Box>

                <Box
                  bg={colorMode === "light" ? "gray.50" : "gray.700"}
                  p="4"
                  borderRadius="lg"
                  fontSize="sm"
                  boxShadow="sm"
                >
                  <Text fontWeight="bold" mb="2" color={textColor}>
                    Especificaciones
                  </Text>
                  <Flex justify="space-between" mb="2">
                    <Text color={textColor}>ID:</Text>
                    <Text color={subTextColor}>{id}</Text>
                  </Flex>
                  <Flex justify="space-between" mb="2">
                    <Text color={textColor}>Stock:</Text>
                    <Text color={subTextColor}>{stock} unidades</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color={textColor}>Garantía:</Text>
                    <Text color={subTextColor}>30 días</Text>
                  </Flex>
                </Box>
              </Grid>

              {/* Add to Cart Button */}
              {counter < 1 ? (
                <Button
                  variantColor="teal"
                  size="lg"
                  width="100%"
                  onClick={handleAddToCart}
                  boxShadow="md"
                  _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                  transition="all 0.2s"
                >
                  Añadir a la cesta
                </Button>
              ) : (
                <Flex align="center" justify="center" bg="green.50" p="3" borderRadius="md" boxShadow="md">
                  <Icon name="check-circle" color="green.500" mr="2" />
                  <Text color="green.500">Producto en la cesta ({counter})</Text>
                </Flex>
              )}
            </Box>
          </Grid>
        )}

        {/* Desktop Layout */}
        {isPc && (
          <Grid templateColumns="1fr 1fr" maxH="85vh">
            {/* Left Side - Image Banner */}
            <Box position="relative" bg={colorMode === "light" ? "gray.50" : "gray.900"}>
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p="6"
              >
                <Box
                  w="100%"
                  h="100%"
                  maxW="500px"
                  maxH="500px"
                  position="relative"
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="xl"
                >
                  {/* Image Slider */}
                  {productImages.map((imgSrc, index) => (
                    <Box
                      key={index}
                      position="absolute"
                      top="0"
                      left="0"
                      width="100%"
                      height="100%"
                      opacity={selectedImage === index ? 1 : 0}
                      transition="opacity 0.5s ease-in-out"
                      zIndex={selectedImage === index ? 1 : 0}
                    >
                      <Image
                        src={`/images/${imgSrc}`}
                        fallbackSrc="/images/productosinimagen.jpg"
                        alt={`${title} - imagen ${index + 1}`}
                        objectFit="cover"
                        width="100%"
                        height="100%"
                      />
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Category Badge */}
              <Badge
                position="absolute"
                top="6"
                left="6"
                px="3"
                py="1"
                borderRadius="md"
                variantColor="blue"
                fontSize="md"
                boxShadow="md"
                zIndex="2"
              >
                {category}
              </Badge>

              {/* Offer Badge */}
              {offerPrice && (
                <Badge
                  position="absolute"
                  top="6"
                  right="6"
                  px="3"
                  py="1"
                  borderRadius="md"
                  variantColor="red"
                  fontSize="md"
                  boxShadow="md"
                  zIndex="2"
                >
                  Promoción
                </Badge>
              )}

              {/* Image Thumbnails */}
              <Flex position="absolute" bottom="6" left="0" right="0" justify="center" gap="4" zIndex="2">
                {productImages.map((imgSrc, index) => (
                  <Box
                    key={index}
                    w="70px"
                    h="70px"
                    borderRadius="lg"
                    overflow="hidden"
                    border="3px solid"
                    borderColor={selectedImage === index ? "white" : "whiteAlpha.500"}
                    cursor="pointer"
                    onClick={() => handleImageSelect(index)}
                    transition="all 0.2s"
                    _hover={{ transform: "scale(1.05)" }}
                    boxShadow="md"
                  >
                    <Image
                      src={`/images/${imgSrc}`}
                      fallbackSrc="/images/productosinimagen.jpg"
                      alt={`${title} - vista ${index + 1}`}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                    />
                  </Box>
                ))}
              </Flex>
            </Box>

            {/* Right Side - Content */}
            <Box p="8" overflowY="auto">
              <Flex direction="column" h="100%">
                <Box mb="6">
                  <Text fontSize="3xl" fontWeight="bold" color={textColor} mb="2">
                    {title}
                  </Text>

                  {title1 && (
                    <Text fontSize="lg" color={subTextColor} mb="4">
                      {title1}
                    </Text>
                  )}

                  <Flex
                    align="center"
                    bg={colorMode === "light" ? "gray.50" : "gray.700"}
                    p="4"
                    borderRadius="lg"
                    boxShadow="sm"
                    mb="6"
                  >
                    <Text fontSize="3xl" fontWeight="bold" color={accentColor}>
                      {offerPrice || price} CUP
                    </Text>
                    {offerPrice && (
                      <Text ml="3" fontSize="xl" as="del" color="gray.400">
                        {price} CUP
                      </Text>
                    )}
                  </Flex>
                </Box>

                <Box bg={colorMode === "light" ? "gray.50" : "gray.700"} p="5" borderRadius="lg" mb="6" boxShadow="sm">
                  <Text fontSize="xl" fontWeight="bold" color={textColor} mb="3">
                    Descripción
                  </Text>
                  <Text fontSize="md" color={textColor} lineHeight="1.7">
                    {description}
                  </Text>
                </Box>

                <Box bg={colorMode === "light" ? "gray.50" : "gray.700"} p="5" borderRadius="lg" mb="6" boxShadow="sm">
                  <Text fontSize="xl" fontWeight="bold" color={textColor} mb="3">
                    Especificaciones
                  </Text>
                  <Grid templateColumns="1fr 1fr" gap="4">
                    <Flex justify="space-between" p="2" borderBottom="1px solid" borderColor={borderColor}>
                      <Text fontWeight="medium" color={textColor}>
                        ID:
                      </Text>
                      <Text color={subTextColor}>{id}</Text>
                    </Flex>
                    <Flex justify="space-between" p="2" borderBottom="1px solid" borderColor={borderColor}>
                      <Text fontWeight="medium" color={textColor}>
                        Categoría:
                      </Text>
                      <Text color={subTextColor}>{category}</Text>
                    </Flex>
                    <Flex justify="space-between" p="2" borderBottom="1px solid" borderColor={borderColor}>
                      <Text fontWeight="medium" color={textColor}>
                        Stock:
                      </Text>
                      <Text color={subTextColor}>{stock} unidades</Text>
                    </Flex>
                    <Flex justify="space-between" p="2" borderBottom="1px solid" borderColor={borderColor}>
                      <Text fontWeight="medium" color={textColor}>
                        Garantía:
                      </Text>
                      <Text color={subTextColor}>30 días</Text>
                    </Flex>
                  </Grid>
                </Box>

                <Box mt="auto">
                  {counter < 1 ? (
                    <Button
                      variantColor="teal"
                      size="lg"
                      width="100%"
                      height="60px"
                      onClick={handleAddToCart}
                      boxShadow="lg"
                      _hover={{ transform: "translateY(-2px)", boxShadow: "xl", bg: accentColorDark }}
                      _active={{ transform: "translateY(0)", boxShadow: "md", bg: accentColorDark }}
                      transition="all 0.2s"
                      fontSize="lg"
                    >
                      Añadir a la cesta
                    </Button>
                  ) : (
                    <Flex
                      align="center"
                      justify="center"
                      bg="green.50"
                      p="4"
                      borderRadius="lg"
                      boxShadow="md"
                      height="60px"
                    >
                      <Icon name="check-circle" color="green.500" mr="3" size="24px" />
                      <Text color="green.500" fontSize="lg">
                        Producto en la cesta ({counter})
                      </Text>
                    </Flex>
                  )}
                </Box>
              </Flex>
            </Box>
          </Grid>
        )}
      </ModalContent>
    </Modal>
  )
}
