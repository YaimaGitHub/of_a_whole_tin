"use client"

import { Box, Flex, Text, useColorMode } from "@chakra-ui/core"
import Logo from "./Logo"
import { useEffect, useState } from "react"

export default function Loader({ message = "Cargando..." }) {
  const { colorMode } = useColorMode()
  const [loadingDots, setLoadingDots] = useState(".")

  // Colors based on theme
  const bgColor = colorMode === "light" ? "rgba(255, 255, 255, 0.9)" : "rgba(26, 32, 44, 0.9)"
  const textColor = colorMode === "light" ? "bluex.600" : "white"
  const accentColor = "bluex.500"

  // Animate the loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev.length >= 3 ? "." : prev + "."))
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      bg={bgColor}
      zIndex="9999"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      className="loader-container"
    >
      <Flex direction="column" align="center" justify="center" className="loader-content">
        {/* Logo container with pulsing effect */}
        <Box className="logo-container" position="relative" mb="6">
          {/* Animated circles around the logo */}
          <Box className="circle-1"></Box>
          <Box className="circle-2"></Box>
          <Box className="circle-3"></Box>

          {/* Store logo */}
          <Box position="relative" zIndex="2" transform="scale(1.5)" className="logo-pulse">
            <Logo width={120} />
          </Box>
        </Box>

        {/* Loading text */}
        <Text fontSize="xl" fontWeight="bold" color={textColor} className="loading-text">
          {message}
          <Box as="span" className="loading-dots">
            {loadingDots}
          </Box>
        </Text>

        {/* Loading bar */}
        <Box mt="4" w="200px" h="4px" bg="gray.200" borderRadius="full" overflow="hidden" position="relative">
          <Box className="loading-bar" h="100%" bg={accentColor} borderRadius="full"></Box>
        </Box>
      </Flex>

      <style jsx global>{`
        .loader-container {
          backdrop-filter: blur(5px);
        }
        
        .loader-content {
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .logo-container {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .logo-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1.5); }
          50% { transform: scale(1.6); }
        }
        
        .circle-1, .circle-2, .circle-3 {
          position: absolute;
          border-radius: 50%;
          border: 2px solid #2d4052;
          opacity: 0.3;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .circle-1 {
          width: 100px;
          height: 100px;
          animation: ripple 2s linear infinite;
        }
        
        .circle-2 {
          width: 140px;
          height: 140px;
          animation: ripple 2s linear infinite 0.5s;
        }
        
        .circle-3 {
          width: 180px;
          height: 180px;
          animation: ripple 2s linear infinite 1s;
        }
        
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
        
        .loading-text {
          animation: fadeInUp 0.5s ease-out;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .loading-dots {
          display: inline-block;
          min-width: 20px;
          text-align: left;
        }
        
        .loading-bar {
          width: 30%;
          animation: loadingBar 1.5s ease infinite;
        }
        
        @keyframes loadingBar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .circle-1 {
            width: 80px;
            height: 80px;
          }
          
          .circle-2 {
            width: 120px;
            height: 120px;
          }
          
          .circle-3 {
            width: 160px;
            height: 160px;
          }
          
          .logo-pulse {
            transform: scale(1.2);
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1.2); }
            50% { transform: scale(1.3); }
          }
        }
        
        @media (max-width: 480px) {
          .circle-1 {
            width: 60px;
            height: 60px;
          }
          
          .circle-2 {
            width: 100px;
            height: 100px;
          }
          
          .circle-3 {
            width: 140px;
            height: 140px;
          }
          
          .logo-pulse {
            transform: scale(1);
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          
          .loading-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </Box>
  )
}
