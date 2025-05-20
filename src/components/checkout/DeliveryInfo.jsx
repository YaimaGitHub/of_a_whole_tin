"use client"

import { useState, useEffect } from "react"
import { Box, Flex, Heading, Text, Badge, useColorMode, Alert, AlertIcon, Collapse } from "@chakra-ui/core"
import { useRecoilValue } from "recoil"
import { formState, selectedLocation } from "../../recoil/state"
import { BiMap, BiCalendar, BiTime, BiInfoCircle } from "react-icons/bi"

const DeliveryInfo = () => {
  const formData = useRecoilValue(formState)
  const location = useRecoilValue(selectedLocation)
  const { colorMode } = useColorMode()
  const [showInfo, setShowInfo] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)

  // Colors for modern UI
  const bgColor = colorMode === "light" ? "white" : "gray.800"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.700"
  const headingColor = colorMode === "light" ? "bluex.600" : "white"
  const textColor = colorMode === "light" ? "gray.700" : "gray.300"
  const accentColor = "bluex.400"
  const gray50 = colorMode === "light" ? "gray.50" : "gray.700"

  useEffect(() => {
    // Trigger animation after component mounts
    setAnimateIn(true)

    // Show delivery info if form has data
    if (formData && Object.keys(formData).length > 0) {
      setShowInfo(true)
    }
  }, [formData])

  // If no form data yet, don't show this component
  if (!formData || Object.keys(formData).length === 0) {
    return null
  }

  return (
    <Box
      mt="4"
      p="4"
      bg={bgColor}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="md"
      className={`delivery-info-container ${animateIn ? "animate-in" : ""}`}
      role="region"
      aria-label="Información de entrega"
    >
      <Flex justify="space-between" align="center" mb="3" onClick={() => setShowInfo(!showInfo)} cursor="pointer">
        <Heading as="h4" size="sm" color={headingColor} className="delivery-heading">
          Información de Entrega
        </Heading>
        <Box
          transform={showInfo ? "rotate(180deg)" : "rotate(0deg)"}
          transition="transform 0.2s"
          className="arrow-icon"
        >
          ▼
        </Box>
      </Flex>

      <Collapse in={showInfo} animateOpacity>
        <Box p="3" bg={gray50} borderRadius="md" mb="3">
          <Flex align="center" mb="2">
            <Box as={BiMap} size="18px" color={accentColor} mr="2" />
            <Text fontSize="sm" fontWeight="medium" color={textColor}>
              Dirección de Entrega:
            </Text>
          </Flex>
          <Text fontSize="sm" ml="6" mb="2">
            {formData.address || "No especificada"}
          </Text>

          <Flex align="center" mb="1">
            <Box as={BiInfoCircle} size="18px" color={accentColor} mr="2" />
            <Text fontSize="sm" fontWeight="medium" color={textColor}>
              Zona:
            </Text>
            <Badge ml="2" variantColor="blue" borderRadius="full">
              {location || "No seleccionada"}
            </Badge>
          </Flex>

          <Flex justify="space-between" mt="3">
            <Flex align="center">
              <Box as={BiCalendar} size="18px" color={accentColor} mr="2" />
              <Text fontSize="sm">
                {formData.deliveryDate
                  ? new Date(formData.deliveryDate).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Fecha no seleccionada"}
              </Text>
            </Flex>

            <Flex align="center">
              <Box as={BiTime} size="18px" color={accentColor} mr="2" />
              <Text fontSize="sm">{formData.schedule || "Horario no seleccionado"}</Text>
            </Flex>
          </Flex>
        </Box>

        {formData.comment && (
          <Alert status="info" borderRadius="md" fontSize="xs" mb="2">
            <AlertIcon />
            <Text>
              <Text as="span" fontWeight="medium">
                Comentario:{" "}
              </Text>
              {formData.comment}
            </Text>
          </Alert>
        )}
      </Collapse>

      <style jsx global>{`
        .delivery-info-container {
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          will-change: transform, opacity;
        }
        
        .delivery-info-container.animate-in {
          transform: translateY(0);
          opacity: 1;
        }
        
        .delivery-heading {
          position: relative;
          display: inline-block;
        }
        
        .delivery-heading::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 2px;
          background-color: var(--chakra-colors-bluex-400);
        }
        
        .arrow-icon {
          will-change: transform;
        }
      `}</style>
    </Box>
  )
}

export default DeliveryInfo
