"use client"

import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Box,
  Icon,
  Text,
} from "@chakra-ui/core"
import CartFooter from "./CartFooter"
import CartList from "./CartList"
import { BiShoppingBag } from "react-icons/bi"
import { useRecoilValue } from "recoil"
import { cartLength } from "../../recoil/state"

const Cart = ({ showCart = false, setCart }) => {
  const itemsCount = useRecoilValue(cartLength)

  return (
    <Drawer isOpen={showCart} onClose={() => setCart(false)} placement="right" size="md">
      <DrawerOverlay />
      <DrawerContent p="4" className={showCart ? "slide-in-right" : ""}>
        <Flex justify="space-between" align="center" w="100%" mb="4">
          <Heading as="h2" size="xl" color="bluex.600">
            Tu Cesta
          </Heading>
          <DrawerCloseButton size="lg" position="static" />
        </Flex>

        {itemsCount > 0 ? (
          <Box position="relative" h="calc(100% - 60px)">
            <CartList />
            <CartFooter />
          </Box>
        ) : (
          <Flex direction="column" align="center" justify="center" h="80%" className="fade-in">
            <Box className="pulse-animation" mb="6">
              <Icon as={BiShoppingBag} size="80px" color="gray.300" />
            </Box>
            <Text fontSize="xl" fontWeight="medium" color="gray.500" textAlign="center">
              Tu cesta está vacía
            </Text>
            <Text fontSize="md" color="gray.400" textAlign="center" mt="2">
              Agrega productos para comenzar tu compra
            </Text>
          </Flex>
        )}
      </DrawerContent>

      <style jsx global>{`
        .slide-in-right {
          animation: slideInRight 0.5s forwards;
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </Drawer>
  )
}

export default Cart
