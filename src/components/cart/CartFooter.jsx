"use client"

import { Box, Button, Text, useColorMode, Flex, Icon } from "@chakra-ui/core"
import { useRecoilValue } from "recoil"
import { cartTotal } from "../../recoil/state"
import { useRouter } from "next/router"
import { BiShoppingBag, BiRightArrowAlt } from "react-icons/bi"

function CartFooter() {
  const router = useRouter()
  const subTotal = useRecoilValue(cartTotal)
  const { colorMode } = useColorMode()

  // Theme colors
  const bgColor = colorMode === "light" ? "white" : "gray.800"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.700"
  const textColor = colorMode === "light" ? "gray.800" : "white"

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <Box
      w="100%"
      bg={bgColor}
      py="6"
      position="absolute"
      bottom="0"
      right="0"
      px="4"
      borderTop={`1px solid ${borderColor}`}
      className="slide-up-animation"
    >
      <Flex direction="column" gap="2" mb="4">
        <Flex justify="space-between" align="center">
          <Text fontSize="md" color={textColor}>
            Sub Total:
          </Text>
          <Text fontSize="md" fontWeight="bold" color={textColor}>
            {subTotal.toFixed(2)} CUP
          </Text>
        </Flex>

        <Flex justify="space-between" align="center">
          <Text fontSize="md" color={textColor}>
            Envío:
          </Text>
          <Text fontSize="md" color="gray.500">
            Calculado en el checkout
          </Text>
        </Flex>

        <Box h="1px" bg={borderColor} my="2" />

        <Flex justify="space-between" align="center">
          <Text fontSize="xl" fontWeight="bold" color="bluex.600">
            Total:
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="bluex.600">
            {subTotal.toFixed(2)} CUP
          </Text>
        </Flex>
      </Flex>

      <Box className="checkout-button-container">
        <Button
          onClick={handleCheckout}
          w="100%"
          h="60px"
          colorScheme="blue"
          size="lg"
          disabled={!subTotal}
          bg="bluex.500"
          _hover={{ bg: "bluex.600" }}
          boxShadow="lg"
          borderRadius="lg"
          position="relative"
          overflow="hidden"
          className={subTotal ? "shimmer-button" : ""}
        >
          <Flex align="center" justify="center" w="100%">
            <Icon as={BiShoppingBag} mr="2" size="24px" />
            {/* Mejorado para mayor contraste */}
            <Text
              fontSize="lg"
              fontWeight="extrabold"
              color="white"
              textShadow="0px 1px 2px rgba(0,0,0,0.3)"
              letterSpacing="0.5px"
            >
              Verificar Compra
            </Text>
            <Icon as={BiRightArrowAlt} ml="2" size="24px" />
          </Flex>
        </Button>
      </Box>

      <style jsx global>{`
        .slide-up-animation {
          animation: slideUp 0.5s forwards;
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .checkout-button-container {
          transition: transform 0.2s;
        }
        
        .checkout-button-container:hover {
          transform: scale(1.03);
        }
        
        .checkout-button-container:active {
          transform: scale(0.97);
        }
        
        .shimmer-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transform: translateX(-100%);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </Box>
  )
}

export default CartFooter
