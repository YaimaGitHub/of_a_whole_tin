"use client"

import { Box, Flex, Text, Badge, useColorMode, Icon, PseudoBox, Collapse } from "@chakra-ui/core"
import { useState, useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedCategory, selectedSubcategory, subcategories } from "../../recoil/state"
import { BiChevronDown, BiChevronUp, BiCategory, BiFilterAlt } from "react-icons/bi"

export default function SubcategoryNav() {
  const [category, setCategory] = useRecoilState(selectedCategory)
  const [subcategory, setSubcategory] = useRecoilState(selectedSubcategory)
  const availableSubcategories = useRecoilValue(subcategories)
  const [isOpen, setIsOpen] = useState(true)
  const { colorMode } = useColorMode()

  // Reset subcategory when category changes
  useEffect(() => {
    setSubcategory("all")
  }, [category, setSubcategory])

  // Theme colors
  const bgColor = colorMode === "light" ? "white" : "gray.700"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.600"
  const textColor = colorMode === "light" ? "gray.800" : "white"
  const hoverBgColor = colorMode === "light" ? "gray.50" : "gray.600"

  // Get category icon
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "Electrodomésticos":
        return "🔌"
      case "Farmacia":
        return "💊"
      case "meat":
        return "🥩"
      case "bakery":
        return "🍞"
      case "drink":
        return "🥤"
      case "Ropa_calzado_accesorios":
        return "👕"
      default:
        return "📦"
    }
  }

  // Get subcategory count
  const getSubcategoryCount = () => {
    return availableSubcategories.length
  }

  // Handle subcategory selection
  const handleSubcategorySelect = (subcat) => {
    setSubcategory(subcat)
  }

  // Toggle subcategories visibility
  const toggleSubcategories = () => {
    setIsOpen(!isOpen)
  }

  if (category === "all" || availableSubcategories.length === 0) {
    return null
  }

  return (
    <Box
      w="100%"
      mb="4"
      borderRadius="lg"
      overflow="hidden"
      borderWidth="1px"
      borderColor={borderColor}
      bg={bgColor}
      boxShadow="sm"
      className="fade-in"
    >
      <Flex
        p="3"
        justify="space-between"
        align="center"
        borderBottomWidth={isOpen ? "1px" : "0"}
        borderColor={borderColor}
        onClick={toggleSubcategories}
        cursor="pointer"
        _hover={{ bg: hoverBgColor }}
        transition="background 0.2s"
      >
        <Flex align="center">
          <Box as="span" fontSize="xl" mr="2" className="category-icon">
            {getCategoryIcon(category)}
          </Box>
          <Text fontWeight="medium" color={textColor}>
            Subcategorías de {category}
          </Text>
          <Badge ml="2" colorScheme="blue" borderRadius="full">
            {getSubcategoryCount()}
          </Badge>
        </Flex>
        <Icon as={isOpen ? BiChevronUp : BiChevronDown} size="24px" color="bluex.500" className="toggle-icon" />
      </Flex>

      <Collapse isOpen={isOpen}>
        <Flex p="2" wrap="wrap" gap="2" className="subcategory-container">
          <PseudoBox
            as="button"
            px="3"
            py="2"
            borderRadius="md"
            bg={subcategory === "all" ? "bluex.500" : "gray.100"}
            color={subcategory === "all" ? "white" : textColor}
            _hover={{ bg: subcategory === "all" ? "bluex.600" : "gray.200" }}
            onClick={() => handleSubcategorySelect("all")}
            className="subcategory-item"
          >
            <Flex align="center">
              <Icon as={BiFilterAlt} size="16px" mr="1" />
              Todas
            </Flex>
          </PseudoBox>

          {availableSubcategories.map((subcat) => (
            <PseudoBox
              key={subcat}
              as="button"
              px="3"
              py="2"
              borderRadius="md"
              bg={subcategory === subcat ? "bluex.500" : "gray.100"}
              color={subcategory === subcat ? "white" : textColor}
              _hover={{ bg: subcategory === subcat ? "bluex.600" : "gray.200" }}
              onClick={() => handleSubcategorySelect(subcat)}
              className="subcategory-item"
            >
              <Flex align="center">
                <Icon as={BiCategory} size="16px" mr="1" />
                {subcat}
              </Flex>
            </PseudoBox>
          ))}
        </Flex>
      </Collapse>

      <style jsx global>{`
        .category-icon {
          transition: transform 0.3s ease;
        }
        
        .subcategory-container {
          animation: fadeIn 0.3s ease-out;
        }
        
        .subcategory-item {
          transition: all 0.2s ease;
          transform-origin: center;
        }
        
        .subcategory-item:hover {
          transform: translateY(-2px);
        }
        
        .toggle-icon {
          transition: transform 0.3s ease;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  )
}
