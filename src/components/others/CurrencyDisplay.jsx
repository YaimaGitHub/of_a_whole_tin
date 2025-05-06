"use client"

import { Box, Text, useColorMode, Badge } from "@chakra-ui/core"
import { useRecoilValue } from "recoil"
import { paymentCurrency } from "../../recoil/state"
import { getCurrencySymbol } from "../../helpers"
import { BiCreditCard } from "react-icons/bi"

export default function CurrencyDisplay() {
  const paymentMethod = useRecoilValue(paymentCurrency)
  const { colorMode } = useColorMode()

  // Theme colors
  const bgColor = colorMode === "light" ? "bluex.500" : "bluex.600"
  const textColor = "white"

  const currencySymbol = getCurrencySymbol(paymentMethod)

  return (
    <Badge
      colorScheme="blue"
      ml={2}
      mr={3}
      px={3}
      py={1}
      borderRadius="full"
      bg={bgColor}
      color={textColor}
      display="flex"
      alignItems="center"
      boxShadow="sm"
    >
      <Box as={BiCreditCard} size="16px" mr="2" />
      <Text fontWeight="medium" fontSize="sm">
        {currencySymbol} {paymentMethod}
      </Text>
    </Badge>
  )
}
