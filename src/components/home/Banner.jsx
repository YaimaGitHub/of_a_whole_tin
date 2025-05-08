"use client"

import { Box, Flex, Text, Button, useColorMode } from "@chakra-ui/core"
import { useState, useEffect } from "react"

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { colorMode } = useColorMode()

  const bannerImages = [
    {
      image: "/images/logo9.jpg",
      title: "Bienvenido a Shop Mart",
      subtitle: "Los mejores productos al mejor precio",
    },
    {
      image: "/images/mejores-marcas-de-electrodomesticos.webp",
      title: "Electrodomésticos",
      subtitle: "Las mejores marcas disponibles",
    },
    {
      image: "/images/jcr_content.jpg",
      title: "Productos Farmacéuticos",
      subtitle: "Calidad y variedad garantizada",
    },
    {
      image: "/images/images_licencias-actividad-apertura-madrid.webp",
      title: "Ropa y Calzado",
      subtitle: "Estilo y confort para toda la familia",
    },
    {
      image: "/images/469454327_122178956048245479_3310703735322335385_n.jpg",
      title: "Panadería y Dulcería",
      subtitle: "Variedades de dulces y exquisitos trabajo de repostería!!!",
    },
    {
      image: "/images/1590150435542.jpg",
      title: "Tienda: Yero Shop",
      subtitle: "Una mejor manera de comprar los productos que te encantan.!!!",
    },
    {
      image: "/images/free-delivery-express-moto-scooter-260nw-1934715215.jpg",
      title: "Entrega rápida",
      subtitle: "Puedes comprar tus artículos en línea y recogerlos o recibirlos directamente en tu domicilio.!!!",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1))
    }, 7000)
    return () => clearInterval(interval)
  }, [bannerImages.length])

  const handleDotClick = (index) => {
    setCurrentSlide(index)
  }

  return (
    <Box
      w="100%"
      h={["200px", "250px", "300px", "350px"]}
      position="relative"
      overflow="hidden"
      borderRadius="lg"
      boxShadow="xl"
    >
      {bannerImages.map((banner, index) => (
        <Box
          key={index}
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          opacity={currentSlide === index ? 1 : 0}
          transition="opacity 0.7s ease, transform 0.7s ease"
          transform={currentSlide === index ? "scale(1)" : "scale(1.05)"}
          style={{
            backgroundImage: `url(${banner.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            position="absolute"
            bottom="0"
            left="0"
            w="100%"
            p="6"
            background="linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))"
          >
            <Box
              opacity={currentSlide === index ? 1 : 0}
              transform={currentSlide === index ? "translateY(0)" : "translateY(20px)"}
              transition="opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s"
            >
              <Text
                fontSize={["xl", "2xl", "3xl"]}
                fontWeight="bold"
                color="white"
                textShadow="1px 1px 3px rgba(0,0,0,0.6)"
              >
                {banner.title}
              </Text>
              <Text fontSize={["sm", "md", "lg"]} color="white" textShadow="1px 1px 2px rgba(0,0,0,0.6)" mb="3">
                {banner.subtitle}
              </Text>
              <Button
                size="sm"
                colorScheme="blue"
                bg="bluex.500"
                _hover={{ bg: "bluex.600" }}
                display={currentSlide === index ? "inline-flex" : "none"}
              >
                Ver Productos
              </Button>
            </Box>
          </Box>
        </Box>
      ))}

      {/* Navigation dots */}
      <Flex position="absolute" bottom="4" right="4" zIndex="10" bg="rgba(0,0,0,0.3)" borderRadius="full" p="1">
        {bannerImages.map((_, index) => (
          <Box
            key={index}
            w="2"
            h="2"
            borderRadius="full"
            bg={currentSlide === index ? "white" : "gray.400"}
            mx="1"
            cursor="pointer"
            onClick={() => handleDotClick(index)}
            transition="all 0.2s"
            _hover={{ transform: "scale(1.2)" }}
          />
        ))}
      </Flex>
    </Box>
  )
}
