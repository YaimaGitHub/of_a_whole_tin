"use client"

import { Badge, Box, Flex, Image, Text, useToast, useColorMode, PseudoBox } from "@chakra-ui/core"
import { useEffect, useState } from "react"
import useIsInCart from "../../hooks/useIsInCart"
import CounterBtn from "../others/CounterBtn"
import ItemModal from "../others/ItemModal"

export default function ItemCard({ item }) {
  const { title, title1, price, img, offerPrice, category, allowBankTransfer = true } = item

  //HOOKS
  const [showModal, setModal] = useState(false)
  const [isAdded, setAdded] = useState("initial")
  const counter = useIsInCart(item)
  const toast = useToast()
  const { colorMode } = useColorMode()

  //effect for handle toast
  useEffect(() => {
    if (counter === 1 && isAdded === "noAdded") {
      toast({
        position: "bottom-left",
        title: "Notificación:",
        description: `"${title}" agregado a la cesta de compra.`,
        status: "success",
        duration: 1500,
      })
      setAdded("added")
    } else if (counter === 0 && isAdded === "added") {
      toast({
        position: "bottom-left",
        title: "Notificación:",
        description: `"${title}" eliminado de la cesta de compra.`,
        status: "error",
        duration: 1500,
      })
      setAdded("noAdded")
    } else if (isAdded === "initial" && counter === 0) {
      setAdded("noAdded")
    } else if (isAdded === "initial" && counter > 0) {
      setAdded("added")
    }
  }, [counter, title, toast])

  // Card colors based on theme
  const cardBg = colorMode === "light" ? "white" : "gray.700"
  const cardHoverBg = colorMode === "light" ? "gray.50" : "gray.600"
  const textColor = colorMode === "light" ? "gray.800" : "white"
  const subTextColor = colorMode === "light" ? "gray.600" : "gray.300"

  return (
    <>
      <Flex
        w="100%"
        h={{ base: "300px", sm: "320px" }}
        bg={cardBg}
        direction="column"
        justify="center"
        align="center"
        position="relative"
        pb="2"
        shadow="lg"
        rounded="md"
        overflow="hidden"
        transition="all 0.3s ease"
        _hover={{
          transform: "translateY(-5px)",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        opacity="1"
        style={{
          animation: "fadeIn 0.3s ease-in-out",
        }}
      >
        {offerPrice && (
          <Badge
            variant="solid"
            variantColor="red"
            position="absolute"
            px="2"
            py="1"
            top="10px"
            right="10px"
            borderRadius="full"
            boxShadow="md"
            zIndex="1"
          >
            Promoción
          </Badge>
        )}

        <Badge
          variant="subtle"
          variantColor="blue"
          position="absolute"
          px="2"
          top="10px"
          left="10px"
          borderRadius="full"
          zIndex="1"
        >
          {category}
        </Badge>

        {/* Payment Method Badge - Mejorado para mayor contraste */}
        {!allowBankTransfer && (
          <PseudoBox
            position="absolute"
            px="3"
            py="1"
            top={offerPrice ? "40px" : "10px"}
            right="10px"
            borderRadius="full"
            zIndex="1"
            fontSize="xs"
            fontWeight="bold"
            bg="#FF3B30" // Rojo más brillante para mejor contraste
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 0 8px rgba(255, 59, 48, 0.6), 0 0 0 1px rgba(0, 0, 0, 0.1)"
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "0 0 12px rgba(255, 59, 48, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.2)",
            }}
            className="payment-restriction-badge"
            letterSpacing="0.5px"
          >
            <PseudoBox as="span" display="inline-block" mr="1" className="shake-icon" fontSize="10px">
              🔒
            </PseudoBox>
            <Text as="span" fontWeight="extrabold" textShadow="0px 1px 2px rgba(0,0,0,0.3)">
              Solo efectivo
            </Text>
          </PseudoBox>
        )}

        <Box
          w="100%"
          h={{ base: "45%", sm: "50%" }}
          onClick={() => setModal(true)}
          cursor="pointer"
          overflow="hidden"
          position="relative"
        >
          <Image
            size="100%"
            objectFit="cover"
            src={`/images/${img}`}
            fallbackSrc="/images/productosinimagen.jpg"
            alt={title}
            transition="transform 0.3s ease"
            _hover={{ transform: "scale(1.05)" }}
          />
          <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            bg="blackAlpha.300"
            color="white"
            textAlign="center"
            py="1"
            fontSize="xs"
            fontWeight="medium"
            opacity="0"
            transition="opacity 0.3s ease"
            _groupHover={{ opacity: 1 }}
          >
            Ver detalles
          </Box>
        </Box>

        <Box w="85%" my="3">
          <Flex align="flex-end">
            <Text fontSize="md" fontWeight="bold" color={textColor}>
              {offerPrice || price} CUP
            </Text>
            {offerPrice && (
              <Text ml="1" fontSize="sm" fontWeight="medium" as="del" color="gray.400">
                {price} CUP
              </Text>
            )}
          </Flex>

          <Text
            fontSize="sm"
            textTransform="capitalize"
            minHeight={{ base: "35px", sm: "40px" }}
            color={subTextColor}
            noOfLines={2}
            fontWeight="medium"
          >
            {title}
          </Text>
          {title1 && (
            <Text fontSize="xs" color="gray.500" mt="1" noOfLines={1}>
              {title1}
            </Text>
          )}
        </Box>

        <CounterBtn item={item} counter={counter} />
      </Flex>

      <ItemModal showModal={showModal} setModal={setModal} item={item} />
    </>
  )
}
