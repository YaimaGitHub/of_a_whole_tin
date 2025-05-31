"use client"

import { useState } from "react"
import { Box, IconButton, useColorMode } from "@chakra-ui/react"
import { BiShoppingBag } from "react-icons/bi"

const ClickableFavicon = ({ onOpenNewProducts }) => {
  const [isHovered, setIsHovered] = useState(false)
  const { colorMode } = useColorMode()

  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex="1000"
      cursor="pointer"
      onClick={onOpenNewProducts}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transform={isHovered ? "scale(1.1)" : "scale(1)"}
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.1)",
        boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
      }}
    >
      <IconButton
        aria-label="Ver productos nuevos"
        icon={<BiShoppingBag />}
        size="lg"
        colorScheme="blue"
        variant="solid"
        borderRadius="full"
        boxShadow="0 4px 15px rgba(0,0,0,0.2)"
        bg={colorMode === "light" ? "blue.500" : "blue.600"}
        color="white"
        _hover={{
          bg: colorMode === "light" ? "blue.600" : "blue.700",
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
        }}
        _active={{
          transform: "scale(0.95)",
        }}
        fontSize="24px"
        width="60px"
        height="60px"
      />

      {/* Pulse animation ring */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="60px"
        height="60px"
        borderRadius="full"
        border="2px solid"
        borderColor={colorMode === "light" ? "blue.400" : "blue.500"}
        opacity={isHovered ? 0.6 : 0.3}
        animation={isHovered ? "pulse 1.5s infinite" : "none"}
        pointerEvents="none"
      />

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          70% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0;
          }
        }
      `}</style>
    </Box>
  )
}

export default ClickableFavicon
