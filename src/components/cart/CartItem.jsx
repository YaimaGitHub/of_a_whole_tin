"use client"

import { Box, Flex, Image, Text, useColorMode, Icon, PseudoBox } from "@chakra-ui/core"
import { useSetRecoilState } from "recoil"
import { refreshCart } from "../../recoil/state"
import CounterBtn from "../others/CounterBtn"
import { BiTrash } from "react-icons/bi"

export default function CartItem({ item }) {
  const { title, title1, price, offerPrice, img, qty } = item
  const setCart = useSetRecoilState(refreshCart)
  const { colorMode } = useColorMode()

  // Theme colors
  const bgColor = colorMode === "light" ? "white" : "gray.700"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.600"
  const textColor = colorMode === "light" ? "gray.800" : "white"

  const itemTotal = (offerPrice ? offerPrice * qty : price * qty).toFixed(2)

  return (
    <Box className="cart-item-animation">
      <Flex
        w="100%"
        justify="flex-start"
        align="center"
        position="relative"
        borderWidth="1px"
        borderColor={borderColor}
        py="4"
        px="3"
        bg={bgColor}
        borderRadius="lg"
        mb="3"
        transition="all 0.3s"
        _hover={{
          boxShadow: "md",
          transform: "translateY(-2px)",
          borderColor: "bluex.400",
        }}
      >
        <Box w="80px" h="80px" mr="3" borderRadius="md" overflow="hidden" borderWidth="1px" borderColor={borderColor}>
          <Image
            size="100%"
            objectFit="cover"
            src={`/images/${img}`}
            fallbackSrc="/images/productosinimagen.jpg"
            alt={title}
          />
        </Box>

        <Box w="calc(100% - 120px)">
          <Text w="85%" fontSize="sm" fontWeight="bold" color={textColor} noOfLines={2}>
            {title}
          </Text>

          {title1 && (
            <Text fontSize="xs" color="gray.500" mt="1">
              {title1}
            </Text>
          )}

          <Flex justify="space-between" align="center" mt="1">
            <Text fontSize="sm" color="gray.500">
              Precio: {offerPrice || price} CUP
            </Text>
            <Text fontSize="md" fontWeight="bold" color="bluex.600">
              {itemTotal} CUP
            </Text>
          </Flex>

          <Flex justify="space-between" align="center" mt="2">
            <CounterBtn type="cart" item={item} />

            <PseudoBox
              as="button"
              aria-label="Remove item"
              className="scale-on-click"
              onClick={() => setCart({ item, n: 0 })}
            >
              <Icon as={BiTrash} color="red.500" size="20px" />
            </PseudoBox>
          </Flex>
        </Box>
      </Flex>

      <style jsx global>{`
        .cart-item-animation {
          animation: fadeInUp 0.3s ease-out;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .scale-on-click:active {
          transform: scale(0.9);
        }
      `}</style>
    </Box>
  )
}
