"use client"

import { Box, Flex, Text, Badge, useColorMode } from "@chakra-ui/core"

export default function StockLegend() {
  const { colorMode } = useColorMode()

  // Theme colors
  const bgColor = colorMode === "light" ? "white" : "gray.700"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.600"
  const textColor = colorMode === "light" ? "gray.800" : "white"

  return (
    <Box
      w="100%"
      mb="4"
      p="3"
      borderRadius="lg"
      overflow="hidden"
      borderWidth="1px"
      borderColor={borderColor}
      bg={bgColor}
      boxShadow="sm"
      className="fade-in"
    >
      <Text fontWeight="medium" mb="2" color={textColor}>
        Estado de Inventario:
      </Text>
      <Flex gap="4" flexWrap="wrap">
        <Flex align="center">
          <Badge variantColor="green" mr="2">
            En Stock
          </Badge>
          <Text fontSize="sm">Productos disponibles</Text>
        </Flex>

        <Flex align="center">
          <Badge variantColor="orange" mr="2" className="pulse-badge">
            Stock Bajo
          </Badge>
          <Text fontSize="sm">Menos de 5 unidades</Text>
        </Flex>

        <Flex align="center">
          <Badge variantColor="red" mr="2">
            Sin Stock
          </Badge>
          <Text fontSize="sm">Producto agotado</Text>
        </Flex>
      </Flex>

      <style jsx global>{`
        .pulse-badge {
          animation: pulseBadge 2s infinite;
        }
        
        @keyframes pulseBadge {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </Box>
  )
}
