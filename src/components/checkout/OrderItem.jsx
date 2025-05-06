import { Flex, Text, Box, Image, useColorMode } from "@chakra-ui/core"

export default function OrderItem({ item }) {
  const { qty, title, title1, price, offerPrice, img } = item
  const itemTotal = (offerPrice ? offerPrice * qty : price * qty).toFixed(2)
  const { colorMode } = useColorMode()

  // Colors for modern UI
  const bgColor = colorMode === "light" ? "white" : "gray.700"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.600"
  const textColor = colorMode === "light" ? "gray.700" : "gray.300"
  const priceColor = colorMode === "light" ? "bluex.600" : "bluex.300"
  const grayColor = colorMode === "light" ? "gray.500" : "gray.400"

  return (
    <Flex w="100%" p="3" bg={bgColor} borderRadius="md" borderWidth="1px" borderColor={borderColor} boxShadow="sm">
      <Box mr="3" width="50px" height="50px" flexShrink={0}>
        <Image
          size="100%"
          objectFit="cover"
          borderRadius="md"
          src={`/images/${img}`}
          fallbackSrc="/images/productosinimagen.jpg"
          alt={title}
        />
      </Box>

      <Flex direction="column" flex="1">
        <Flex justify="space-between" align="center">
          <Text fontWeight="medium" fontSize="sm" color={textColor}>
            {title}{" "}
            {title1 && (
              <Text as="span" fontSize="xs">
                ({title1})
              </Text>
            )}
          </Text>
          <Text fontWeight="bold" fontSize="sm" color={priceColor}>
            ${itemTotal}
          </Text>
        </Flex>

        <Flex justify="space-between" align="center" mt="1">
          <Text fontSize="xs" color={grayColor}>
            {qty} x ${offerPrice || price}
          </Text>
          {offerPrice && (
            <Text fontSize="xs" as="s" color={grayColor}>
              ${price}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}
