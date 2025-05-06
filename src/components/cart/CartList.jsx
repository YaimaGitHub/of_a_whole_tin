"use client"

import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex } from "@chakra-ui/core"
import { useRecoilValue } from "recoil"
import { cart } from "../../recoil/state"
import CartItem from "./CartItem"

function CartList() {
  const cartItems = useRecoilValue(cart)
  const hasItems = Object.keys(cartItems).length > 0

  if (!hasItems) {
    return (
      <Alert
        status="info"
        variant="solid"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        height="200px"
        mt="8"
        borderRadius="lg"
        className="scale-in"
      >
        <AlertIcon size="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          No posees productos en la cesta de compra.
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Adiciona los productos de tu lista de deseos o continúa revisando los productos disponibles en la tienda.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Flex direction="column" align="center" w="100%" mt="4" overflowY="auto" h="calc(100% - 190px)" pb="4">
      {Object.values(cartItems).map((item) => (
        <CartItem item={item} key={item.id} />
      ))}

      <style jsx global>{`
        .scale-in {
          animation: scaleIn 0.3s ease-out;
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </Flex>
  )
}

export default CartList
