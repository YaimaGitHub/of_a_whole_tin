"use client"

import { Box, Text, Flex } from "@chakra-ui/core"
import RecentProductsModal from "./RecentProductsModal"

const EnhancedLogo = ({ className = "" }) => {
  return (
    <RecentProductsModal>
      <Box
        className={className}
        cursor="pointer"
        _hover={{
          transform: "scale(1.05)",
        }}
        transition="transform 0.2s ease"
        role="button"
        aria-label="Ver productos recientes"
      >
        <Flex align="center" spacing={2}>
          <Box position="relative" mr={2}>
            <Box
              w={{ base: "40px", sm: "48px" }}
              h={{ base: "40px", sm: "48px" }}
              bg="blue.500"
              borderRadius="lg"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="lg"
              _hover={{ boxShadow: "xl" }}
              transition="box-shadow 0.3s ease"
            >
              <Text color="white" fontWeight="bold" fontSize={{ base: "lg", sm: "xl" }}>
                E
              </Text>
            </Box>
            <Box
              position="absolute"
              top="-4px"
              right="-4px"
              w="12px"
              h="12px"
              bg="red.500"
              borderRadius="full"
              animation="pulse 2s infinite"
            />
          </Box>
          <Box display={{ base: "none", sm: "block" }}>
            <Box>
              <Text fontSize={{ base: "xl", sm: "2xl" }} fontWeight="bold" color="blue.600" lineHeight="1">
                Efectos
              </Text>
              <Text fontSize="xs" color="gray.500" mt="-2px">
                Tienda Online
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </RecentProductsModal>
  )
}

export default EnhancedLogo
