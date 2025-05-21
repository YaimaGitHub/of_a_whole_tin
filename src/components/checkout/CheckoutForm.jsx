"use client"

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  PseudoBox,
  Select,
  Text,
  useColorMode,
  Alert,
  AlertIcon,
  RadioGroup,
  Stack,
} from "@chakra-ui/core"

import { BiCalendar, BiComment, BiMap, BiMapAlt, BiPhone, BiTime, BiUser } from "react-icons/bi"
import { useForm } from "react-hook-form"
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil"
import { formState, selectedLocation, selectedPaymentMethod, cart } from "../../recoil/state"
import ConfirmAlertModal from "../others/ConfirmAlertModal"
import { useState, useEffect } from "react"
import { getFormValidations, getLocationPrices } from "../../helpers"

function CheckoutForm() {
  const setForm = useSetRecoilState(formState)
  const [location, setLocation] = useRecoilState(selectedLocation)
  const [paymentMethod, setPaymentMethod] = useRecoilState(selectedPaymentMethod)
  const cartItemsValue = useRecoilValue(cart)
  const { register, errors, handleSubmit } = useForm({ mode: "onTouched" })
  const [showModal, setModal] = useState(false)
  const validations = getFormValidations()
  const locationPrices = getLocationPrices()
  const { colorMode } = useColorMode()
  const [bankTransferAllowed, setBankTransferAllowed] = useState(true)

  // Colors for modern UI
  const bgColor = colorMode === "light" ? "white" : "gray.800"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.700"
  const inputBgColor = colorMode === "light" ? "gray.50" : "gray.700"
  const headingColor = colorMode === "light" ? "bluex.600" : "white"

  // Check if all items in cart allow bank transfer
  useEffect(() => {
    if (cartItemsValue) {
      const allItemsAllowBankTransfer = Object.values(cartItemsValue).every((item) => item.allowBankTransfer !== false)
      setBankTransferAllowed(allItemsAllowBankTransfer)

      // If bank transfer is not allowed and it's currently selected, switch to cash
      if (!allItemsAllowBankTransfer && paymentMethod === "bank") {
        setPaymentMethod("cash")
      }
    }
  }, [cartItemsValue, paymentMethod, setPaymentMethod])

  const onSubmit = (formState) => {
    setForm(formState)
    setModal(true)
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value)
  }

  return (
    <>
      <Box
        w={["100%", "80%", "46%", "40%"]}
        height="max-content"
        bg={bgColor}
        p="6"
        mx="2"
        order={["1", "1", "0"]}
        mt={["6", "6", "0"]}
        borderRadius="lg"
        boxShadow="lg"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <Heading as="h3" size="md" textAlign="center" mb="6" color={headingColor}>
          Información de Entrega
        </Heading>

        {/* Add WhatsApp info alert */}
        <Alert status="info" mb="4" borderRadius="md" fontSize="sm">
          <AlertIcon />
          Al finalizar, recibirás un mensaje detallado de tu pedido vía WhatsApp
        </Alert>

        <Flex as="form" direction="column" onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.name} mb="4">
            <FormLabel htmlFor="name" fontSize="sm" fontWeight="medium">
              Nombre
            </FormLabel>
            <InputGroup>
              <InputLeftElement children={<PseudoBox as={BiUser} size="20px" color="bluex.400" />} />
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Su nombre completo"
                variant="filled"
                bg={inputBgColor}
                ref={register(validations.name)}
                borderRadius="md"
                focusBorderColor="bluex.400"
              />
            </InputGroup>
            {errors.name && (
              <Text as="span" fontSize="xs" color="red.500" mt="1">
                {errors.name.message}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={errors.phone} mb="4">
            <FormLabel htmlFor="phone" fontSize="sm" fontWeight="medium">
              Teléfono
            </FormLabel>
            <InputGroup>
              <InputLeftElement children={<PseudoBox as={BiPhone} size="20px" color="bluex.400" />} />
              <Input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Número de teléfono"
                variant="filled"
                bg={inputBgColor}
                ref={register(validations.phone)}
                borderRadius="md"
                focusBorderColor="bluex.400"
              />
            </InputGroup>
            {errors.phone && (
              <Text as="span" fontSize="xs" color="red.500" mt="1">
                {errors.phone.message}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={errors.address} mb="4">
            <FormLabel htmlFor="address" fontSize="sm" fontWeight="medium">
              Dirección
            </FormLabel>
            <InputGroup>
              <InputLeftElement children={<PseudoBox as={BiMap} size="20px" color="bluex.400" />} />
              <Input
                id="address"
                type="text"
                name="address"
                placeholder="Calle, número, apartamento, referencias..."
                variant="filled"
                bg={inputBgColor}
                ref={register(validations.address)}
                borderRadius="md"
                focusBorderColor="bluex.400"
              />
            </InputGroup>
            {errors.address && (
              <Text as="span" fontSize="xs" color="red.500" mt="1">
                {errors.address.message}
              </Text>
            )}
            <Text fontSize="xs" color="gray.500" mt="1">
              Incluya detalles como número de casa/apartamento y puntos de referencia
            </Text>
          </FormControl>

          <FormControl isInvalid={errors.city} mb="4">
            <FormLabel htmlFor="city" fontSize="sm" fontWeight="medium">
              Zona de Entrega
            </FormLabel>
            <InputGroup>
              <InputLeftElement children={<PseudoBox as={BiMapAlt} size="20px" color="bluex.400" />} />
              <Select
                id="city"
                variant="filled"
                placeholder="-- Seleccione zona de entrega --"
                pl="40px"
                name="city"
                ref={register(validations.city)}
                onChange={handleLocationChange}
                value={location}
                bg={inputBgColor}
                borderRadius="md"
                focusBorderColor="bluex.400"
              >
                {Object.entries(locationPrices)
                  .sort()
                  .map(([locationName, price]) => (
                    <option key={locationName} value={locationName}>
                      {locationName} - ${price} CUP
                    </option>
                  ))}
              </Select>
            </InputGroup>
            {errors.city && (
              <Text as="span" fontSize="xs" color="red.500" mt="1">
                {errors.city.message}
              </Text>
            )}
            <Text fontSize="xs" color="gray.500" mt="1">
              El costo de envío varía según la zona seleccionada
            </Text>
          </FormControl>

          {/* Add Payment Method Selection */}
          <FormControl mb="4">
            <FormLabel htmlFor="paymentMethod" fontSize="sm" fontWeight="medium">
              Método de Pago
            </FormLabel>

            {!bankTransferAllowed && (
              <PseudoBox
                as={Alert}
                status="warning"
                mb="3"
                borderRadius="md"
                boxShadow="0 0 10px rgba(255, 159, 0, 0.3)"
                position="relative"
                overflow="hidden"
                className="pulse-alert"
              >
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  bg="linear-gradient(45deg, rgba(255, 159, 0, 0.1) 0%, rgba(255, 159, 0, 0.2) 50%, rgba(255, 159, 0, 0.1) 100%)"
                  className="pulse-bg"
                  zIndex="0"
                />
                <AlertIcon />
                <Box fontSize="sm" position="relative" zIndex="1">
                  <Text fontWeight="medium">Algunos productos en su carrito solo aceptan pago en efectivo</Text>
                </Box>
              </PseudoBox>
            )}

            <RadioGroup id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange} spacing={4}>
              <Stack direction="column" spacing={3}>
                <Box
                  as="label"
                  p={3}
                  borderWidth="1px"
                  borderRadius="md"
                  borderColor={paymentMethod === "cash" ? "bluex.400" : borderColor}
                  bg={paymentMethod === "cash" ? "bluex.50" : inputBgColor}
                  cursor="pointer"
                  _hover={{ bg: "bluex.50" }}
                  transition="all 0.3s ease"
                >
                  <Flex align="center">
                    <Box
                      as="input"
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={handlePaymentMethodChange}
                      mr={3}
                    />
                    <Box>
                      <Text fontWeight="medium">Efectivo</Text>
                      <Text fontSize="xs" color="gray.500">
                        Pago en efectivo al momento de la entrega
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                <PseudoBox
                  as="label"
                  p={3}
                  borderWidth="1px"
                  borderRadius="md"
                  borderColor={paymentMethod === "bank" ? "bluex.400" : borderColor}
                  bg={paymentMethod === "bank" ? "bluex.50" : inputBgColor}
                  cursor={bankTransferAllowed ? "pointer" : "not-allowed"}
                  _hover={bankTransferAllowed ? { bg: "bluex.50" } : {}}
                  opacity={bankTransferAllowed ? 1 : 0.5}
                  pointerEvents={bankTransferAllowed ? "auto" : "none"}
                  position="relative"
                  transition="all 0.3s ease"
                >
                  {/* Candado animado para opción deshabilitada */}
                  {!bankTransferAllowed && (
                    <PseudoBox
                      position="absolute"
                      top="-10px"
                      right="-10px"
                      width="30px"
                      height="30px"
                      borderRadius="full"
                      bg="red.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="white"
                      fontSize="14px"
                      boxShadow="0 0 10px rgba(255, 59, 48, 0.7)"
                      className="float-lock"
                      zIndex="2"
                    >
                      <PseudoBox as="span" className="shake-icon">
                        🔒
                      </PseudoBox>
                    </PseudoBox>
                  )}

                  <Flex align="center">
                    <Box
                      as="input"
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={handlePaymentMethodChange}
                      mr={3}
                      disabled={!bankTransferAllowed}
                    />
                    <Box>
                      <Text fontWeight="medium">Transferencia Bancaria</Text>
                      <Text fontSize="xs" color="gray.500">
                        Transferencia a la tarjeta del propietario
                      </Text>
                    </Box>
                  </Flex>
                </PseudoBox>
              </Stack>
            </RadioGroup>

            {paymentMethod === "bank" && (
              <Alert status="warning" mt={3} borderRadius="md">
                <AlertIcon />
                <Box fontSize="sm">
                  <Text fontWeight="medium">Se aplicará un recargo del 15% al total de los productos</Text>
                  <Text mt={1}>Recibirá un código QR para realizar la transferencia vía WhatsApp</Text>
                </Box>
              </Alert>
            )}
          </FormControl>

          <FormControl isInvalid={errors.deliveryDate} mb="4">
            <FormLabel htmlFor="deliveryDate" fontSize="sm" fontWeight="medium">
              Fecha de Entrega
            </FormLabel>
            <InputGroup>
              <InputLeftElement children={<PseudoBox as={BiCalendar} size="20px" color="bluex.400" />} />
              <Input
                id="deliveryDate"
                type="date"
                name="deliveryDate"
                placeholder="Fecha de entrega"
                variant="filled"
                bg={inputBgColor}
                ref={register(validations.deliveryDate)}
                min={new Date().toISOString().split("T")[0]}
                borderRadius="md"
                focusBorderColor="bluex.400"
              />
            </InputGroup>
            {errors.deliveryDate && (
              <Text as="span" fontSize="xs" color="red.500" mt="1">
                {errors.deliveryDate.message}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={errors.schedule} mb="4">
            <FormLabel htmlFor="schedule" fontSize="sm" fontWeight="medium">
              Horario de Entrega
            </FormLabel>
            <InputGroup>
              <InputLeftElement children={<PseudoBox as={BiTime} size="20px" color="bluex.400" />} />
              <Select
                id="schedule"
                variant="filled"
                placeholder="-- Seleccione horario de entrega --"
                pl="40px"
                name="schedule"
                ref={register(validations.schedule)}
                bg={inputBgColor}
                borderRadius="md"
                focusBorderColor="bluex.400"
              >
                <option value="9:00AM a 12:00PM">9:00AM a 12:00PM</option>
                <option value="02:00PM a 05:00PM">02:00PM a 05:00PM</option>
              </Select>
            </InputGroup>
            {errors.schedule && (
              <Text as="span" fontSize="xs" color="red.500" mt="1">
                {errors.schedule.message}
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={errors.comment} mb="4">
            <FormLabel htmlFor="comment" fontSize="sm" fontWeight="medium">
              Comentarios Adicionales
            </FormLabel>
            <InputGroup>
              <InputLeftElement children={<PseudoBox as={BiComment} size="20px" color="bluex.400" />} />
              <Input
                id="comment"
                type="text"
                name="comment"
                placeholder="¿Alguna instrucción especial?"
                variant="filled"
                bg={inputBgColor}
                ref={register(validations.comment)}
                borderRadius="md"
                focusBorderColor="bluex.400"
              />
            </InputGroup>
            {errors.comment && (
              <Text as="span" fontSize="xs" color="red.500" mt="1">
                {errors.comment.message}
              </Text>
            )}
          </FormControl>

          <Button type="submit" w="100%" variantColor="green" size="lg" mt="6" borderRadius="md" boxShadow="md">
            CONFIRMAR PEDIDO
          </Button>
        </Flex>
      </Box>

      {showModal && <ConfirmAlertModal showModal={showModal} setModal={setModal} />}
    </>
  )
}

export default CheckoutForm
