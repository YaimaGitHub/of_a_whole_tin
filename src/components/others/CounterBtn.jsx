"use client"

import { Button, Flex, IconButton, Text, PseudoBox } from "@chakra-ui/core"
import { useSetRecoilState } from "recoil"
import { refreshCart } from "../../recoil/state"
import { BiMinus, BiPlus } from "react-icons/bi"

export default function CounterBtn({ type = "default", counter = 0, item }) {
  const setCart = useSetRecoilState(refreshCart)

  //button for cart item (item provided for cart state)
  if (type === "cart") {
    return (
      <Flex
        w="110px"
        bg="gray.100"
        justify="space-between"
        align="center"
        rounded="md"
        overflow="hidden"
        borderWidth="1px"
        borderColor="gray.200"
      >
        <PseudoBox className="counter-button-animation">
          <IconButton
            icon={BiMinus}
            variant="ghost"
            size="sm"
            onClick={() => setCart({ item, n: item.qty - 1 })}
            color="bluex.600"
          />
        </PseudoBox>

        <Text fontSize="sm" fontWeight="bold" color="bluex.600" className="counter-value-animation" key={item.qty}>
          {item.qty}
        </Text>

        <PseudoBox className="counter-button-animation">
          <IconButton
            icon={BiPlus}
            variant="ghost"
            size="sm"
            onClick={() => setCart({ item, n: item.qty + 1 })}
            color="bluex.600"
          />
        </PseudoBox>
      </Flex>
    )
  }

  //buttons for main item card(item provided for items state)
  return (
    <>
      {counter < 1 ? (
        <PseudoBox className="add-button-animation" width="65%">
          <Button
            variantColor="teal"
            size="md"
            w="100%"
            onClick={() => setCart({ item, n: 1 })}
            boxShadow="sm"
            _hover={{ boxShadow: "md" }}
          >
            Añadir a la cesta
          </Button>
        </PseudoBox>
      ) : (
        <Flex
          w="65%"
          bg="gray.200"
          justify="space-between"
          align="center"
          rounded="md"
          overflow="hidden"
          boxShadow="sm"
        >
          <PseudoBox className="counter-button-animation">
            <IconButton
              icon={BiMinus}
              variant="ghost"
              onClick={() => setCart({ item, n: counter - 1 })}
              color="bluex.600"
            />
          </PseudoBox>

          <Text fontSize="md" fontWeight="bold" className="counter-value-animation" key={counter}>
            {counter}
          </Text>

          <PseudoBox className="counter-button-animation">
            <IconButton
              icon={BiPlus}
              variant="ghost"
              onClick={() => setCart({ item, n: counter + 1 })}
              color="bluex.600"
            />
          </PseudoBox>
        </Flex>
      )}

      <style jsx global>{`
        .counter-button-animation:active {
          transform: scale(0.9);
          transition: transform 0.1s;
        }
        
        .counter-value-animation {
          animation: popIn 0.3s ease-out;
        }
        
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(1.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .add-button-animation {
          transition: transform 0.2s;
        }
        
        .add-button-animation:hover {
          transform: scale(1.05);
        }
        
        .add-button-animation:active {
          transform: scale(0.95);
        }
      `}</style>
    </>
  )
}
