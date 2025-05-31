"use client"

import { useState, useEffect } from "react"
import { Box } from "@chakra-ui/core"
import RecentProductsModal from "./RecentProductsModal"

const RecentProductsWrapper = ({ children }) => {
  const [recentCount, setRecentCount] = useState(0)
  const [showNewIndicator, setShowNewIndicator] = useState(false)

  // Simular productos recientes (en producción esto vendría del estado global)
  useEffect(() => {
    // Simular la adición de productos recientes
    const interval = setInterval(() => {
      setRecentCount((prev) => {
        const newCount = Math.min(prev + 1, 5) // Máximo 5 productos
        if (newCount > prev) {
          setShowNewIndicator(true)
          setTimeout(() => setShowNewIndicator(false), 3000) // Ocultar después de 3 segundos
        }
        return newCount
      })
    }, 10000) // Agregar un producto cada 10 segundos para demo

    // Inicializar con algunos productos
    setRecentCount(3)

    return () => clearInterval(interval)
  }, [])

  return (
    <RecentProductsModal recentCount={recentCount}>
      <Box position="relative" display="inline-block">
        {/* Logo original */}
        <Box
          cursor="pointer"
          transition="all 0.3s ease"
          _hover={{
            transform: "scale(1.05)",
          }}
          className={showNewIndicator ? "pulse-glow" : ""}
        >
          {children}
        </Box>

        {/* Indicador de productos recientes */}
        {recentCount > 0 && (
          <Box
            position="absolute"
            top="-8px"
            right="-8px"
            background="linear-gradient(45deg, #ff6b6b, #ee5a24)"
            color="white"
            borderRadius="50%"
            minWidth="24px"
            height="24px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="xs"
            fontWeight="bold"
            boxShadow="0 4px 12px rgba(238, 90, 36, 0.4)"
            border="2px solid white"
            zIndex={1}
            className={showNewIndicator ? "bounce-in shimmer" : "shimmer"}
          >
            <Box position="relative" zIndex={2}>
              {recentCount > 9 ? "9+" : recentCount}
            </Box>
          </Box>
        )}

        {/* Indicador de "nuevo" */}
        {showNewIndicator && (
          <Box
            position="absolute"
            top="-12px"
            left="50%"
            transform="translateX(-50%)"
            backgroundColor="#48bb78"
            color="white"
            paddingX={2}
            paddingY={1}
            borderRadius="md"
            fontSize="xs"
            fontWeight="bold"
            boxShadow="0 2px 8px rgba(72, 187, 120, 0.4)"
            className="bounce-in"
          >
            ¡Nuevo!
            <Box
              position="absolute"
              top="100%"
              left="50%"
              transform="translateX(-50%)"
              width={0}
              height={0}
              borderLeft="4px solid transparent"
              borderRight="4px solid transparent"
              borderTop="4px solid #48bb78"
            />
          </Box>
        )}

        {/* Efecto de ondas cuando hay actividad */}
        {showNewIndicator && (
          <>
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="60px"
              height="60px"
              border="2px solid #63b3ed"
              borderRadius="50%"
              opacity={0.6}
              className="pulse-wave"
              pointerEvents="none"
            />
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="80px"
              height="80px"
              border="1px solid #90cdf4"
              borderRadius="50%"
              opacity={0.4}
              className="pulse-wave-delayed"
              pointerEvents="none"
            />
          </>
        )}

        {/* Estilos CSS para animaciones */}
        <style jsx>{`
          .pulse-glow {
            animation: pulse-glow 2s ease-in-out infinite;
          }

          .bounce-in {
            animation: bounce-in 0.6s ease-out;
          }

          .shimmer {
            position: relative;
            overflow: hidden;
          }

          .shimmer::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: inherit;
            background: linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }

          .pulse-wave {
            animation: pulse-wave 1.5s ease-out infinite;
          }

          .pulse-wave-delayed {
            animation: pulse-wave 1.5s ease-out infinite 0.3s;
          }

          @keyframes pulse-glow {
            0% { 
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
              transform: scale(1);
            }
            50% { 
              box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
              transform: scale(1.05);
            }
            100% { 
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
              transform: scale(1);
            }
          }

          @keyframes bounce-in {
            0% { 
              transform: scale(0.3) rotate(0deg);
              opacity: 0;
            }
            50% { 
              transform: scale(1.1) rotate(180deg);
              opacity: 1;
            }
            100% { 
              transform: scale(1) rotate(360deg);
              opacity: 1;
            }
          }

          @keyframes shimmer {
            0% { 
              background-position: -200% 0;
            }
            100% { 
              background-position: 200% 0;
            }
          }

          @keyframes pulse-wave {
            0% { 
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
              transform: translate(-50%, -50%) scale(1);
            }
            50% { 
              box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
              transform: translate(-50%, -50%) scale(1.05);
            }
            100% { 
              box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
              transform: translate(-50%, -50%) scale(1);
            }
          }
        `}</style>
      </Box>
    </RecentProductsModal>
  )
}

export default RecentProductsWrapper
