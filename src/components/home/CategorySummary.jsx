"use client"

import { Box, Flex, Text, Grid, Badge, Heading, Icon, useColorMode } from "@chakra-ui/core"
import { useRecoilValue } from "recoil"
import { productCountsByCategory } from "../../recoil/state"
import { categoryStructure } from "../../data"
import { BiPackage, BiChevronRight } from "react-icons/bi"

export default function CategorySummary() {
  const productCounts = useRecoilValue(productCountsByCategory)
  const { colorMode } = useColorMode()

  // Colors based on theme
  const cardBg = colorMode === "light" ? "white" : "gray.700"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.600"
  const headingColor = colorMode === "light" ? "bluex.600" : "white"
  const textColor = colorMode === "light" ? "gray.700" : "gray.300"

  return (
    <Box mt="8" mb="6">
      <Heading as="h2" size="lg" mb="4" color={headingColor}>
        Resumen de Categorías
      </Heading>

      <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap="4">
        {Object.keys(categoryStructure)
          .filter((key) => key !== "all")
          .map((categoryKey) => {
            const categoryInfo = categoryStructure[categoryKey]
            const categoryCount = productCounts[categoryKey]?.total || 0
            const subcategoryCounts = productCounts[categoryKey]?.subcategories || {}

            return (
              <Box
                key={categoryKey}
                bg={cardBg}
                borderRadius="lg"
                borderWidth="1px"
                borderColor={borderColor}
                overflow="hidden"
                boxShadow="sm"
                transition="all 0.2s"
                _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
              >
                <Box p="4" borderBottomWidth="1px" borderColor={borderColor} bg="bluex.50">
                  <Flex justify="space-between" align="center">
                    <Flex align="center">
                      <Icon as={BiPackage} size="24px" color="bluex.500" mr="2" />
                      <Text fontWeight="bold" fontSize="lg" color="bluex.600">
                        {categoryInfo.name}
                      </Text>
                    </Flex>
                    <Badge colorScheme="blue" borderRadius="full" px="2" py="1">
                      {categoryCount} productos
                    </Badge>
                  </Flex>
                </Box>

                <Box p="4">
                  {categoryInfo.subcategories.length > 0 ? (
                    <Box>
                      {categoryInfo.subcategories.map((subcat) => {
                        const count = subcategoryCounts[subcat] || 0
                        return (
                          <Flex
                            key={subcat}
                            justify="space-between"
                            align="center"
                            py="2"
                            borderBottomWidth="1px"
                            borderColor={borderColor}
                            _last={{ borderBottomWidth: 0 }}
                          >
                            <Flex align="center">
                              <Icon as={BiChevronRight} size="18px" color="gray.500" mr="2" />
                              <Text fontSize="md" color={textColor}>
                                {subcat}
                              </Text>
                            </Flex>
                            <Badge colorScheme="gray" borderRadius="full" px="2">
                              {count}
                            </Badge>
                          </Flex>
                        )
                      })}
                    </Box>
                  ) : (
                    <Text color="gray.500" fontSize="sm">
                      No hay subcategorías disponibles
                    </Text>
                  )}
                </Box>
              </Box>
            )
          })}
      </Grid>
    </Box>
  )
}
