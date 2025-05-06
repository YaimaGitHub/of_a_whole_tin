"use client"

import { Menu, MenuButton, MenuList, MenuItem, Button, Flex, Text, Box, useColorMode } from "@chakra-ui/core"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { selectedCurrency, currencyRates, paymentCurrency } from "../../recoil/state"
import { BiDollar, BiEuro } from "react-icons/bi"
import { FaMoneyBillWave, FaDollarSign } from "react-icons/fa"

export default function CurrencySelector() {
  const [currency, setCurrency] = useRecoilState(selectedCurrency)
  const rates = useRecoilValue(currencyRates)
  const { colorMode } = useColorMode()
  const setPaymentMethod = useSetRecoilState(paymentCurrency)

  // Theme colors
  const menuBg = colorMode === "light" ? "white" : "gray.700"
  const menuBorder = colorMode === "light" ? "gray.200" : "gray.600"
  const hoverBg = colorMode === "light" ? "gray.100" : "gray.600"

  const currencies = [
    { code: "CUP", name: "Peso Cubano", icon: FaMoneyBillWave, rate: 1 },
    { code: "USD", name: "US Dollar", icon: BiDollar, rate: rates.USD },
    { code: "EUR", name: "Euro", icon: BiEuro, rate: rates.EUR },
    { code: "CAD", name: "Canadian Dollar", icon: FaDollarSign, rate: rates.CAD },
  ]

  const selectedCurrencyObj = currencies.find((c) => c.code === currency) || currencies[0]
  const CurrencyIcon = selectedCurrencyObj.icon

  return (
    <Menu closeOnSelect={true}>
      <MenuButton as={Button} variant="outline" size="md" mr={3} borderColor={menuBorder} _hover={{ bg: hoverBg }}>
        <Flex align="center">
          <Box as={CurrencyIcon} mr={2} />
          <Text>{currency}</Text>
        </Flex>
      </MenuButton>
      <MenuList bg={menuBg} borderColor={menuBorder} zIndex={1200}>
        {currencies.map((curr) => {
          const Icon = curr.icon
          return (
            <MenuItem
              key={curr.code}
              onClick={(e) => {
                e.preventDefault()
                setCurrency(curr.code)
                setPaymentMethod(curr.code)
              }}
              bg={currency === curr.code ? hoverBg : "transparent"}
              _hover={{ bg: hoverBg }}
            >
              <Flex align="center" width="100%">
                <Box as={Icon} mr={2} />
                <Text fontWeight={currency === curr.code ? "bold" : "normal"}>
                  {curr.name} ({curr.code})
                </Text>
                <Text ml="auto" fontSize="sm" color="gray.500">
                  {curr.rate !== 1 ? `1 ${curr.code} = ${curr.rate} CUP` : ""}
                </Text>
              </Flex>
            </MenuItem>
          )
        })}
      </MenuList>
    </Menu>
  )
}
