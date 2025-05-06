"use client"

import { Box, Flex, Heading, Text, useColorMode } from "@chakra-ui/core"
import CheckoutForm from "../components/checkout/CheckoutForm"
import Footer from "../components/commons/Footer"
import Header from "../components/commons/Header"
import OrderDetails from "../components/checkout/OrderDetails"
import Router from "next/router"
import { useRecoilValue } from "recoil"
import { cartTotal } from "../recoil/state"
import { useEffect } from "react"

const Checkout = () => {
  const total = useRecoilValue(cartTotal)
  const { colorMode } = useColorMode()
  const bgColor = colorMode === "light" ? "gray.50" : "gray.900"
  const headingColor = colorMode === "light" ? "bluex.600" : "white"
  const subTextColor = colorMode === "light" ? "gray.600" : "gray.400"

  useEffect(() => {
    if (typeof window !== "undefined" && !total) {
      Router.replace("/")
    }
  }, [total])

  if (typeof window !== "undefined" && !total) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  return (
    <>
      <Box bg={bgColor} minHeight="calc(100vh - 50px)">
        <Header />

        <Box as="main" py="12" px="4">
          <Flex direction="column" align="center" maxW="1200px" mx="auto" mb="8">
            <Heading as="h1" size="xl" textAlign="center" color={headingColor} mb="2">
              Finalizar Compra
            </Heading>
            <Text color={subTextColor} textAlign="center">
              Complete sus datos para procesar su pedido
            </Text>
          </Flex>

          <Flex w={["100%", "100%", "90%", "80%"]} mx="auto" justify="center" flexWrap="wrap" gap="4">
            <CheckoutForm />
            <OrderDetails />
          </Flex>
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default Checkout
