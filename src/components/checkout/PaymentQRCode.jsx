"use client"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  Image,
  Flex,
  Alert,
  AlertIcon,
  useColorMode,
  Link,
} from "@chakra-ui/core"
import { BiDownload, BiShare } from "react-icons/bi"

export default function PaymentQRCode({ isOpen, onClose, total }) {
  const { colorMode } = useColorMode()

  // Colors for modern UI
  const bgColor = colorMode === "light" ? "white" : "gray.800"
  const textColor = colorMode === "light" ? "gray.800" : "white"
  const subTextColor = colorMode === "light" ? "gray.600" : "gray.300"

  // This would be a placeholder QR code image
  // In a real implementation, this could be dynamically generated or stored
  const qrCodeImage = "/images/productosinimagen.jpg" // Placeholder image

  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement("a")
    link.href = qrCodeImage
    link.download = "codigo-qr-pago.jpg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Código QR para pago",
        text: `Código QR para realizar transferencia bancaria por ${total} CUP`,
        url: window.location.href,
      })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent bg={bgColor} borderRadius="lg">
        <ModalHeader color={textColor}>Código QR para Transferencia</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" align="center" gap="4">
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <Text fontSize="sm">
                Escanee este código QR para realizar la transferencia de <strong>{total} CUP</strong>
              </Text>
            </Alert>

            <Box
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="md"
              p="4"
              bg="white"
              boxShadow="md"
              maxW="250px"
              mx="auto"
            >
              <Image
                src={qrCodeImage || "/placeholder.svg"}
                alt="Código QR para transferencia bancaria"
                borderRadius="md"
              />
            </Box>

            <Text fontSize="sm" color={subTextColor} textAlign="center">
              Después de realizar la transferencia, envíe una captura de pantalla del comprobante de pago al mismo
              número de WhatsApp.
            </Text>

            <Flex gap="3" mt="2">
              <Button leftIcon={BiDownload} variant="outline" size="sm" onClick={handleDownload}>
                Descargar QR
              </Button>
              {navigator.share && (
                <Button leftIcon={BiShare} variant="outline" size="sm" onClick={handleShare}>
                  Compartir
                </Button>
              )}
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Link href="https://api.whatsapp.com/send/?phone=5555555555" isExternal>
            <Button colorScheme="green" size="md">
              Enviar Comprobante
            </Button>
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
