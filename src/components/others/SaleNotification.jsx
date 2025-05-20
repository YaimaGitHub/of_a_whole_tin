"use client"

import { Box, Flex, Text, Image, Badge, CloseButton, PseudoBox, useColorMode } from "@chakra-ui/core"
import { useEffect, useRef } from "react"

const SaleNotification = ({ isOpen, onClose, saleItems = [] }) => {
  const { colorMode } = useColorMode()
  const notificationRef = useRef(null)

  // Theme colors
  const bgColor = colorMode === "light" ? "white" : "gray.800"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.700"
  const textColor = colorMode === "light" ? "gray.800" : "white"

  useEffect(() => {
    // Add entrance animation when component mounts
    if (notificationRef.current) {
      notificationRef.current.classList.add("notification-enter")
    }

    // Handle click outside to close
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  if (!isOpen) return null

  return (
    <Box
      ref={notificationRef}
      position="absolute"
      top="100px"
      right="20px"
      width="350px"
      maxHeight="500px"
      overflowY="auto"
      bg={bgColor}
      borderRadius="lg"
      boxShadow="2xl"
      zIndex="1100"
      border={`1px solid ${borderColor}`}
      className="notification-container"
    >
      <Flex justify="space-between" align="center" p="4" borderBottom={`1px solid ${borderColor}`}>
        <Text fontSize="lg" fontWeight="bold" color={textColor}>
          Ofertas Especiales
        </Text>
        <CloseButton onClick={onClose} />
      </Flex>

      {saleItems.length === 0 ? (
        <Box p="6" textAlign="center">
          <Text color="gray.500">No hay ofertas disponibles</Text>
        </Box>
      ) : (
        <Box>
          {saleItems.map((item, index) => (
            <PseudoBox
              key={item.id}
              p="4"
              borderBottom={index < saleItems.length - 1 ? `1px solid ${borderColor}` : "none"}
              _hover={{ bg: colorMode === "light" ? "gray.50" : "gray.700" }}
              transition="all 0.2s"
              className={item.isNew ? "new-sale-item" : ""}
            >
              <Flex align="center">
                <Box position="relative" mr="3">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    w="50px"
                    h="50px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Badge
                    position="absolute"
                    bottom="-5px"
                    right="-5px"
                    colorScheme="red"
                    variant="solid"
                    borderRadius="full"
                    px="2"
                    bg="red.500"
                    color="white"
                  >
                    {item.discount}
                  </Badge>
                </Box>
                <Box flex="1">
                  <Flex align="center">
                    <Text fontWeight="medium" color={textColor}>
                      {item.name}
                    </Text>
                    {item.isNew && (
                      <Badge ml="2" colorScheme="green" variant="solid" bg="green.400">
                        Nuevo
                      </Badge>
                    )}
                  </Flex>
                  <Text fontSize="sm" color="gray.500">
                    ¡Oferta por tiempo limitado!
                  </Text>
                </Box>
              </Flex>
            </PseudoBox>
          ))}
        </Box>
      )}

      <style jsx global>{`
        .notification-container {
          transform-origin: top right;
          opacity: 0;
          transform: scale(0.95);
        }
        
        .notification-enter {
          animation: notificationEnter 0.3s forwards;
        }
        
        @keyframes notificationEnter {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .new-sale-item {
          animation: highlightNew 2s ease-in-out;
        }
        
        @keyframes highlightNew {
          0%, 100% {
            background-color: transparent;
          }
          50% {
            background-color: rgba(74, 222, 128, 0.2);
          }
        }
      `}</style>
    </Box>
  )
}

export default SaleNotification
