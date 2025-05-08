"use client"

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  Text,
  Icon,
  List,
  ListItem,
  ListIcon,
  useColorMode,
  Box,
} from "@chakra-ui/core"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { getWspUrl } from "../../helpers"
import { orderDetails, resetState, completePurchase } from "../../recoil/state"
import { useRef } from "react"
import { BiCheck, BiMessageDetail } from "react-icons/bi"

function ConfirmAlertModal({ showModal, setModal }) {
  const orderData = useRecoilValue(orderDetails)
  const reset = useSetRecoilState(resetState)
  const finalizePurchase = useSetRecoilState(completePurchase)
  const cancelRef = useRef()
  const { colorMode } = useColorMode()

  // Colors for modern UI
  const headerBg = "bluex.500"
  const headerColor = "white"
  const bodyBg = colorMode === "light" ? "white" : "gray.800"
  const textColor = colorMode === "light" ? "gray.700" : "gray.300"

  const onClose = () => {
    setModal(false)
  }

  const onConfirm = () => {
    const WSP_URL = getWspUrl(orderData)
    window.open(WSP_URL, "_blank")

    // Complete the purchase - this will update actual stock levels
    finalizePurchase()

    setModal(false)
    reset()
  }

  return (
    <>
      <AlertDialog onClose={onClose} isOpen={showModal} leastDestructiveRef={cancelRef} isCentered size="lg">
        <AlertDialogOverlay />
        <AlertDialogContent borderRadius="lg" overflow="hidden" boxShadow="xl">
          <AlertDialogHeader bg={headerBg} color={headerColor} py="4">
            <Flex align="center">
              <Icon name="check-circle" mr="2" />
              Confirmar Pedido
            </Flex>
          </AlertDialogHeader>
          <AlertDialogCloseButton color={headerColor} />
          <AlertDialogBody bg={bodyBg} py="6">
            <Flex direction="column" gap="4">
              <Flex align="center" gap="3">
                <Icon as={BiMessageDetail} size="24px" color="bluex.500" />
                <Text fontSize="lg" fontWeight="medium">
                  Estás a punto de finalizar tu pedido
                </Text>
              </Flex>

              <Text fontSize="md" color={textColor}>
                Al hacer clic en "Confirmar", serás redirigido a WhatsApp para enviar un mensaje con los detalles
                completos de tu pedido.
              </Text>

              {/* Add payment method information */}
              <Box
                p="3"
                borderRadius="md"
                bg={orderData.paymentMethod === "bank" ? "orange.50" : "green.50"}
                borderWidth="1px"
                borderColor={orderData.paymentMethod === "bank" ? "orange.200" : "green.200"}
              >
                <Flex align="center" mb="2">
                  <Icon
                    name={orderData.paymentMethod === "bank" ? "info-outline" : "check-circle"}
                    color={orderData.paymentMethod === "bank" ? "orange.500" : "green.500"}
                    mr="2"
                  />
                  <Text fontWeight="medium">
                    Método de pago: {orderData.paymentMethod === "cash" ? "Efectivo" : "Transferencia Bancaria"}
                  </Text>
                </Flex>

                {orderData.paymentMethod === "bank" ? (
                  <>
                    <Text fontSize="sm" color={textColor}>
                      Se aplicará un recargo del 15% al total de los productos.
                    </Text>
                    <Text fontSize="sm" color={textColor} mt="1">
                      Recibirás un código QR para realizar la transferencia vía WhatsApp.
                    </Text>
                  </>
                ) : (
                  <Text fontSize="sm" color={textColor}>
                    Pago en efectivo al momento de la entrega.
                  </Text>
                )}
              </Box>

              <List spacing={2} mt="2">
                <ListItem display="flex" alignItems="center">
                  <ListIcon as={BiCheck} color="green.500" />
                  <Text fontSize="sm" color={textColor}>
                    Se incluirá un resumen detallado de los productos seleccionados
                  </Text>
                </ListItem>
                <ListItem display="flex" alignItems="center">
                  <ListIcon as={BiCheck} color="green.500" />
                  <Text fontSize="sm" color={textColor}>
                    La información de entrega y tus datos de contacto
                  </Text>
                </ListItem>
                <ListItem display="flex" alignItems="center">
                  <ListIcon as={BiCheck} color="green.500" />
                  <Text fontSize="sm" color={textColor}>
                    El costo total incluyendo la tarifa de entrega{" "}
                    {orderData.paymentMethod === "bank" && "y el recargo por transferencia"}
                  </Text>
                </ListItem>
                <ListItem display="flex" alignItems="center">
                  <ListIcon as={BiCheck} color="green.500" />
                  <Text fontSize="sm" color={textColor}>
                    Un número de referencia único para tu pedido
                  </Text>
                </ListItem>
              </List>

              <Box p="3" borderRadius="md" bg="blue.50" borderWidth="1px" borderColor="blue.200">
                <Flex align="center" mb="2">
                  <Icon name="info-outline" color="blue.500" mr="2" />
                  <Text fontWeight="medium" color="blue.700">
                    Información de stock
                  </Text>
                </Flex>
                <Text fontSize="sm" color="blue.700">
                  Al confirmar tu pedido, los productos serán descontados del inventario. Los productos en tu cesta
                  están reservados temporalmente.
                </Text>
              </Box>

              <Text fontSize="sm" mt="4" color="gray.500">
                Por favor, revisa que todos los datos sean correctos antes de confirmar. Puedes editar el mensaje en
                WhatsApp si necesitas hacer algún cambio adicional.
              </Text>
            </Flex>
          </AlertDialogBody>
          <AlertDialogFooter bg={bodyBg}>
            <Button ref={cancelRef} onClick={onClose} variant="outline" mr={3}>
              Cancelar
            </Button>
            <Button colorScheme="green" onClick={onConfirm} boxShadow="md">
              Confirmar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ConfirmAlertModal
