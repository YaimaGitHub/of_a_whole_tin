"use client"

import { Box, Flex, Text, Button, useColorMode } from "@chakra-ui/core"
import { useRecoilValue } from "recoil"
import { itemsList } from "../../recoil/state"
import { useState, useEffect, useRef } from "react"
import ItemCard from "./ItemCard"
import { BiChevronLeft, BiChevronRight } from "react-icons/bi"

export default function FeaturedProducts() {
  const allProducts = useRecoilValue(itemsList)
  const [featuredProducts, setFeaturedProducts] = useState([])
  const { colorMode } = useColorMode()
  const scrollRef = useRef(null)

  useEffect(() => {
    // Filter featured products
    const featured = allProducts.filter((product) => product.featured)
    setFeaturedProducts(featured.slice(0, 8)) // Limit to 8 products
  }, [allProducts])

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  if (featuredProducts.length === 0) return null

  return (
    <Box mt="8" className="featured-section">
      <Flex justify="space-between" align="center" mb="4">
        <Text fontSize="xl" fontWeight="bold" color={colorMode === "light" ? "bluex.600" : "bluex.300"}>
          Productos Destacados
        </Text>

        <Flex>
          <Button
            variant="ghost"
            mr="2"
            onClick={scrollLeft}
            display={["none", "none", "flex"]}
            className="scroll-button"
          >
            <Box as={BiChevronLeft} size="24px" />
          </Button>
          <Button variant="ghost" onClick={scrollRight} display={["none", "none", "flex"]} className="scroll-button">
            <Box as={BiChevronRight} size="24px" />
          </Button>
        </Flex>
      </Flex>

      <Box
        ref={scrollRef}
        overflowX="auto"
        pb="4"
        className="featured-scroll custom-scrollbar"
        css={{
          "&::-webkit-scrollbar": {
            height: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: colorMode === "light" ? "#f1f1f1" : "#2D3748",
          },
          "&::-webkit-scrollbar-thumb": {
            background: colorMode === "light" ? "#ccc" : "#4A5568",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: colorMode === "light" ? "#999" : "#718096",
          },
        }}
      >
        <Flex gap="4">
          {featuredProducts.map((product) => (
            <Box key={product.id} minW="250px" maxW="250px" className="featured-item">
              <ItemCard item={product} />
            </Box>
          ))}
        </Flex>
      </Box>

      <style jsx global>{`
        .featured-section {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .featured-item {
          animation: fadeInRight 0.5s ease-in-out;
        }
        
        .scroll-button {
          transition: all 0.2s ease;
        }
        
        .scroll-button:hover {
          transform: scale(1.1);
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @media (max-width: 768px) {
          .featured-scroll {
            padding-bottom: 16px;
            margin-bottom: -12px;
          }
        }
      `}</style>
    </Box>
  )
}
