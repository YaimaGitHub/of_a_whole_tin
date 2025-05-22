"use client"

import { Box, Flex, Text, useColorMode } from "@chakra-ui/core"
import { useRecoilState } from "recoil"
import { selectedCategory } from "../../recoil/state"
import {
  BiHomeAlt,
  BiFirstAid,
  BiDish,
  BiCake,
  BiDrink,
  BiShoppingBag,
  BiStore,
  BiLaptop,
  BiMobile,
  BiTv,
} from "react-icons/bi"
import { useEffect, useState } from "react"

export default function CategoryBanner() {
  const [category, setCategory] = useRecoilState(selectedCategory)
  const { colorMode } = useColorMode()
  const [mounted, setMounted] = useState(false)

  // Only run client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything on the server
  if (!mounted) {
    return null
  }

  // Theme colors
  const bgColor = colorMode === "light" ? "white" : "gray.800"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.700"
  const textColor = colorMode === "light" ? "gray.800" : "white"

  // Define categories with their icons and colors
  const categories = [
    {
      id: "all",
      name: "Todos",
      icon: BiStore,
      color: "#4A5568",
      hoverColor: "#2D3748",
    },
    {
      id: "Electrodomésticos",
      name: "Electrodomésticos",
      icon: BiHomeAlt,
      color: "#3182CE",
      hoverColor: "#2B6CB0",
    },
    {
      id: "Farmacia",
      name: "Farmacia",
      icon: BiFirstAid,
      color: "#E53E3E",
      hoverColor: "#C53030",
    },
    {
      id: "meat",
      name: "Pastas, granos y cereales",
      icon: BiDish,
      color: "#DD6B20",
      hoverColor: "#C05621",
    },
    {
      id: "bakery",
      name: "Panadería",
      icon: BiCake,
      color: "#D69E2E",
      hoverColor: "#B7791F",
    },
    {
      id: "drink",
      name: "Bebidas",
      icon: BiDrink,
      color: "#38A169",
      hoverColor: "#2F855A",
    },
    {
      id: "Ropa_calzado_accesorios",
      name: "Ropa y Calzado",
      icon: BiShoppingBag,
      color: "#805AD5",
      hoverColor: "#6B46C1",
    },
    {
      id: "Components",
      name: "Componentes PC",
      icon: BiLaptop,
      color: "#2C5282",
      hoverColor: "#2A4365",
    },
    {
      id: "Smartphones",
      name: "Smartphones",
      icon: BiMobile,
      color: "#319795",
      hoverColor: "#285E61",
    },
    {
      id: "TV_Audio",
      name: "TV y Audio",
      icon: BiTv,
      color: "#6B46C1",
      hoverColor: "#553C9A",
    },
  ]

  const handleCategoryClick = (categoryId) => {
    setCategory(categoryId)

    // Smooth scroll to products section
    if (typeof window !== "undefined") {
      const productsSection = document.querySelector(".products-section")
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <Box mb="6" p="4" bg={bgColor} borderRadius="lg" borderWidth="1px" borderColor={borderColor} boxShadow="sm">
      <Text fontSize="lg" fontWeight="bold" mb="4" color={textColor} textAlign="center">
        Categorías
      </Text>

      <Box
        overflowX="auto"
        css={{
          "&::-webkit-scrollbar": {
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: colorMode === "light" ? "#f1f1f1" : "#2D3748",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: colorMode === "light" ? "#CBD5E0" : "#4A5568",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: colorMode === "light" ? "#A0AEC0" : "#718096",
          },
        }}
      >
        <Flex minWidth="max-content" gap="4" pb="2">
          {categories.map((cat) => (
            <Flex
              key={cat.id}
              direction="column"
              align="center"
              justify="center"
              p="3"
              borderRadius="lg"
              bg={category === cat.id ? `${cat.color}15` : "transparent"}
              borderWidth="1px"
              borderColor={category === cat.id ? cat.color : borderColor}
              cursor="pointer"
              onClick={() => handleCategoryClick(cat.id)}
              transition="all 0.3s"
              minWidth="100px"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "md",
                borderColor: cat.hoverColor,
              }}
              role="group"
            >
              <Box
                as={cat.icon}
                size="30px"
                color={category === cat.id ? cat.color : textColor}
                mb="2"
                transition="all 0.3s"
                _groupHover={{
                  transform: "scale(1.1)",
                  color: cat.color,
                }}
              />
              <Text
                fontSize="sm"
                fontWeight={category === cat.id ? "bold" : "medium"}
                color={category === cat.id ? cat.color : textColor}
                textAlign="center"
                transition="all 0.3s"
                _groupHover={{
                  color: cat.color,
                }}
              >
                {cat.name}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}
