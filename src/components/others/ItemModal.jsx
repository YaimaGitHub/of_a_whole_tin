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
  PseudoBox,
} from "@chakra-ui/core"
import { useSetRecoilState } from "recoil"
import { refreshCart } from "../../recoil/state"
import useIsInCart from "../../hooks/useIsInCart"
import { useState, useEffect, useRef, useCallback } from "react"
import useIsDesktop from "../../hooks/useIsDesktop"
import productDescriptions from "../../data/productDescriptions"

export default function ItemModal({ showModal, setModal, item }) {
  const { img, title, title1, price, offerPrice, category, id, stock, allowBankTransfer = true } = item || {}
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
    // Get product description from our descriptions database
    if (item && id) {
      // Try to find the specific product description
      const productDesc = productDescriptions[id]

      if (productDesc && productDesc.description) {
        setDescription(productDesc.description)
      } else {
        // Fallback to a generic description if specific one not found
        setDescription(
          `Producto de alta calidad seleccionado cuidadosamente para garantizar la mejor experiencia. Pertenece a la categoría ${category || "general"} y ofrece excelente relación calidad-precio.`,
        )
      }
    }
  }, [item, id, category])

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

      {/* Payment Method Badge - Mejorado para mayor contraste */}
      {!allowBankTransfer && (
        <PseudoBox
          position="absolute"
          top={offerPrice ? "16" : "6"}
          right="6"
          px="4"
          py="2"
          borderRadius="md"
          bg="#FF3B30" // Rojo más brillante para mejor contraste
          color="white"
          fontSize={isPc ? "sm" : "xs"}
          zIndex="2"
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 0 10px rgba(255, 59, 48, 0.7), 0 0 0 1px rgba(0, 0, 0, 0.1)"
          transition="all 0.3s ease"
          _hover={{
            transform: "scale(1.05)",
            boxShadow: "0 0 15px rgba(255, 59, 48, 0.9), 0 0 0 1px rgba(0, 0, 0, 0.2)",
          }}
          className="payment-restriction-badge"
          letterSpacing="0.5px"
        >
          <Icon name="lock" size="16px" mr="2" className="shake-icon" />
          <Text fontWeight="extrabold" textShadow="0px 1px 2px rgba(0,0,0,0.3)">
            Solo efectivo
          </Text>
        </PseudoBox>
      )}

      {/* Navigation Arrows */}
      <Flex
        position="absolute"
        top="50%"
        left="0"
        right="0"
        justify="space-between"
        transform="translateY(-50%)"
        px="3"
        zIndex="2"
      >
        <Box
          bg="blackAlpha.600"
          color="white"
          borderRadius="full"
          w={isPc ? "40px" : "30px"}
          h={isPc ? "40px" : "30px"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onClick={(e) => {
            e.stopPropagation()
            onSelect((currentIndex - 1 + images.length) % images.length)
          }}
          _hover={{ bg: "blackAlpha.800", transform: "scale(1.1)" }}
          transition="all 0.2s"
          boxShadow="md"
        >
          <Icon name="chevron-left" size={isPc ? "24px" : "18px"} />
        </Box>
        <Box
          bg="blackAlpha.600"
          color="white"
          borderRadius="full"
          w={isPc ? "40px" : "30px"}
          h={isPc ? "40px" : "30px"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onClick={(e) => {
            e.stopPropagation()
            onSelect((currentIndex + 1) % images.length)
          }}
          _hover={{ bg: "blackAlpha.800", transform: "scale(1.1)" }}
          transition="all 0.2s"
          boxShadow="md"
        >
          <Icon name="chevron-right" size={isPc ? "24px" : "18px"} />
        </Box>
      </Flex>
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

              {/* Payment Method Information - Mejorado para mayor contraste */}
              <PseudoBox
                bg={allowBankTransfer ? "green.50" : "#FFEFEF"} // Fondo más claro para el rojo
                p="4"
                borderRadius="md"
                mb="4"
                fontSize="sm"
                color={allowBankTransfer ? "green.700" : "#D10000"} // Rojo más oscuro para mejor contraste
                position="relative"
                overflow="hidden"
                boxShadow={
                  allowBankTransfer
                    ? "0 0 10px rgba(72, 187, 120, 0.3)"
                    : "0 0 10px rgba(245, 101, 101, 0.3), 0 0 0 1px rgba(255, 0, 0, 0.1)"
                }
                transition="all 0.3s ease"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: allowBankTransfer
                    ? "0 0 15px rgba(72, 187, 120, 0.4)"
                    : "0 0 15px rgba(245, 101, 101, 0.4), 0 0 0 1px rgba(255, 0, 0, 0.2)",
                }}
                className={!allowBankTransfer ? "fade-in-out" : ""}
              >
                {/* Animated background gradient for restricted payment */}
                {!allowBankTransfer && (
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bg="linear-gradient(45deg, rgba(245, 101, 101, 0.1) 0%, rgba(245, 101, 101, 0.2) 50%, rgba(245, 101, 101, 0.1) 100%)"
                    className="pulse-bg"
                    zIndex="0"
                  />
                )}

                <Flex align="center" position="relative" zIndex="1">
                  <PseudoBox
                    as={Icon}
                    name={allowBankTransfer ? "check-circle" : "warning"}
                    mr="3"
                    color={allowBankTransfer ? "green.500" : "#D10000"} // Rojo más oscuro
                    size="24px"
                    className={!allowBankTransfer ? "shake-icon" : ""}
                  />
                  <Box>
                    <Text fontWeight="bold" fontSize="md">
                      {allowBankTransfer ? "Métodos de pago disponibles" : "Restricción de pago"}
                    </Text>
                    <Text mt="1" fontWeight="medium">
                      {allowBankTransfer
                        ? "Este producto acepta pago en efectivo y transferencia bancaria"
                        : "Este producto solo puede pagarse en efectivo"}
                    </Text>
                  </Box>
                </Flex>
              </PseudoBox>

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
                    <Text color="green.500">
                      "{title}" en la cesta ({counter})
                    </Text>
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
                  <Flex justify="space-between" mb="2">
                    <Text color={textColor}>Garantía:</Text>
                    <Text color={subTextColor}>30 días</Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Text color={textColor}>Pago por transferencia:</Text>
                    <PseudoBox
                      color={allowBankTransfer ? "green.500" : "#D10000"} // Rojo más oscuro
                      fontWeight="bold"
                      display="flex"
                      alignItems="center"
                    >
                      <Icon
                        name={allowBankTransfer ? "check-circle" : "lock"}
                        mr="1"
                        className={!allowBankTransfer ? "shake-icon" : ""}
                      />
                      {allowBankTransfer ? "Permitido" : "No permitido"}
                    </PseudoBox>
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
                  <Text color="green.500">
                    "{title}" en la cesta ({counter})
                  </Text>
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

                  {/* Desktop Navigation Arrows */}
                  <Flex
                    position="absolute"
                    top="50%"
                    left="0"
                    right="0"
                    justify="space-between"
                    transform="translateY(-50%)"
                    px="4"
                    zIndex="2"
                  >
                    <Box
                      bg="blackAlpha.600"
                      color="white"
                      borderRadius="full"
                      w="50px"
                      h="50px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImage((selectedImage - 1 + productImages.length) % productImages.length)
                      }}
                      _hover={{ bg: "blackAlpha.800", transform: "scale(1.1)" }}
                      transition="all 0.2s"
                      boxShadow="lg"
                    >
                      <Icon name="chevron-left" size="24px" />
                    </Box>
                    <Box
                      bg="blackAlpha.600"
                      color="white"
                      borderRadius="full"
                      w="50px"
                      h="50px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImage((selectedImage + 1) % productImages.length)
                      }}
                      _hover={{ bg: "blackAlpha.800", transform: "scale(1.1)" }}
                      transition="all 0.2s"
                      boxShadow="lg"
                    >
                      <Icon name="chevron-right" size="24px" />
                    </Box>
                  </Flex>
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

              {/* Payment Method Badge - Mejorado para mayor contraste */}
              {!allowBankTransfer && (
                <PseudoBox
                  position="absolute"
                  top={offerPrice ? "16" : "6"}
                  right="6"
                  px="4"
                  py="2"
                  borderRadius="md"
                  bg="#FF3B30" // Rojo más brillante para mejor contraste
                  color="white"
                  fontSize="md"
                  fontWeight="bold"
                  zIndex="2"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 0 10px rgba(255, 59, 48, 0.7), 0 0 0 1px rgba(0, 0, 0, 0.1)"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "scale(1.05)",
                    boxShadow: "0 0 15px rgba(255, 59, 48, 0.9), 0 0 0 1px rgba(0, 0, 0, 0.2)",
                  }}
                  className="payment-restriction-badge"
                  letterSpacing="0.5px"
                >
                  <PseudoBox as={Icon} name="lock" size="18px" mr="2" className="shake-icon" />
                  <Text fontWeight="extrabold" textShadow="0px 1px 2px rgba(0,0,0,0.3)">
                    Solo efectivo
                  </Text>
                </PseudoBox>
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

                {/* Payment Method Information Box - Mejorado para mayor contraste */}
                <PseudoBox
                  bg={allowBankTransfer ? "green.50" : "#FFEFEF"} // Fondo más claro para el rojo
                  p="5"
                  borderRadius="lg"
                  mb="6"
                  boxShadow={
                    allowBankTransfer
                      ? "0 0 10px rgba(72, 187, 120, 0.3)"
                      : "0 0 10px rgba(245, 101, 101, 0.3), 0 0 0 1px rgba(255, 0, 0, 0.1)"
                  }
                  position="relative"
                  overflow="hidden"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: allowBankTransfer
                      ? "0 0 15px rgba(72, 187, 120, 0.4)"
                      : "0 0 15px rgba(245, 101, 101, 0.4), 0 0 0 1px rgba(255, 0, 0, 0.2)",
                  }}
                  className={!allowBankTransfer ? "fade-in-out" : ""}
                >
                  {/* Animated background gradient for restricted payment */}
                  {!allowBankTransfer && (
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      bg="linear-gradient(45deg, rgba(245, 101, 101, 0.1) 0%, rgba(245, 101, 101, 0.2) 50%, rgba(245, 101, 101, 0.1) 100%)"
                      className="pulse-bg"
                      zIndex="0"
                    />
                  )}

                  <Flex align="center" position="relative" zIndex="1">
                    <PseudoBox
                      as={Icon}
                      name={allowBankTransfer ? "check-circle" : "lock"}
                      size="28px"
                      color={allowBankTransfer ? "green.500" : "#D10000"} // Rojo más oscuro
                      mr="3"
                      className={!allowBankTransfer ? "shake-icon" : ""}
                    />
                    <Box>
                      <Text fontSize="xl" fontWeight="bold" color={allowBankTransfer ? "green.700" : "#D10000"}>
                        {allowBankTransfer ? "Métodos de pago disponibles" : "Restricción de pago"}
                      </Text>
                      <Text
                        fontSize="md"
                        color={allowBankTransfer ? "green.600" : "#D10000"}
                        mt="1"
                        fontWeight="medium"
                      >
                        {allowBankTransfer
                          ? "Este producto acepta pago en efectivo y transferencia bancaria"
                          : "Este producto solo puede pagarse en efectivo"}
                      </Text>
                    </Box>
                  </Flex>
                </PseudoBox>

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
                        "{title}" en la cesta ({counter})
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
