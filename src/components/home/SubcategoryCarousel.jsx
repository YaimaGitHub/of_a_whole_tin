"use client"

import { Box, Flex, Text, useColorMode, IconButton } from "@chakra-ui/core"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedCategory, selectedSubcategory, availableSubcategories } from "../../recoil/state"
import { categoryHierarchy } from "../../data/categories"
import { useRef, useState } from "react"
import { getSubcategoryColorScheme } from "../../utils/iconColorMap"
import {
  BiMicrochip,
  BiHdd,
  BiMobile,
  BiTv,
  BiRestaurant,
  BiWind,
  BiSprayCan,
  BiTShirt,
  BiCoffee,
  BiDrink,
  BiDish,
  BiFish,
  BiCake,
  BiCookie,
  BiTablet,
  BiPulse,
  BiTag,
  BiPowerOff,
  BiWatch,
  BiMemoryCard,
  BiChip,
  BiServer,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi"

export default function SubcategoryCarousel() {
  const [category, setCategory] = useRecoilState(selectedCategory)
  const [subcategory, setSubcategory] = useRecoilState(selectedSubcategory)
  const subcategories = useRecoilValue(availableSubcategories)
  const { colorMode } = useColorMode()
  const scrollRef = useRef(null)
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const isDark = colorMode === "dark"

  // Theme colors
  const bgColor = colorMode === "light" ? "white" : "gray.700"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.600"
  const textColor = colorMode === "light" ? "gray.800" : "white"

  // Get icon component for a subcategory
  const getIconComponent = (iconName) => {
    const iconMap = {
      cpu: BiMicrochip,
      "hard-drive": BiHdd,
      smartphone: BiMobile,
      tv: BiTv,
      utensils: BiRestaurant,
      refrigerator: BiWind,
      "spray-can": BiSprayCan,
      shirt: BiTShirt,
      coffee: BiCoffee,
      "glass-water": BiDrink,
      beef: BiDish,
      fish: BiFish,
      cake: BiCake,
      cookie: BiCookie,
      bread: BiCake, // Using BiCake as fallback
      toast: BiCookie, // Using BiCookie as fallback
      pill: BiTablet,
      thermometer: BiPulse,
      vitamin: BiTablet, // Using BiTablet as fallback
      stethoscope: BiPulse, // Using BiPulse as fallback
      drumstick: BiDish, // Using BiDish as fallback
      bacon: BiDish, // Using BiDish as fallback
      boot: BiTShirt,
      watch: BiWatch,
      power: BiPowerOff,
      component: BiChip,
      "memory-stick": BiMemoryCard,
      motherboard: BiServer,
      "gpu-card": BiChip,
      tag: BiTag,
    }

    const IconComp = iconMap[iconName] || BiTag
    return IconComp
  }

  // Handle subcategory selection
  const handleSubcategorySelect = (subcat) => {
    setSubcategory(subcat)
  }

  // Scroll functions
  const scrollLeft = () => {
    if (scrollRef.current) {
      setIsScrolling(true)
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" })
      setTimeout(() => setIsScrolling(false), 500)
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      setIsScrolling(true)
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" })
      setTimeout(() => setIsScrolling(false), 500)
    }
  }

  if (category === "all" || !subcategories.length) {
    return null
  }

  // Get current category structure
  const currentCategory = categoryHierarchy[category] || { subcategories: [] }

  // Default color scheme
  const defaultColorScheme = {
    primary: "#4A5568",
    secondary: "#718096",
    gradient: "linear-gradient(135deg, #4A5568 0%, #718096 100%)",
  }

  return (
    <Box
      w="100%"
      mb="4"
      position="relative"
      className="fade-in"
      display={{ base: "block", md: "none" }} // Only show on mobile/tablet
    >
      <Flex justify="space-between" align="center" mb="2">
        <Text fontWeight="medium" fontSize="sm" color={textColor}>
          Subcategorías
        </Text>
        <Flex>
          <IconButton
            icon={BiChevronLeft}
            size="sm"
            variant="ghost"
            onClick={scrollLeft}
            aria-label="Scroll left"
            className={`scroll-button left ${isScrolling ? "scrolling" : ""}`}
            color={isDark ? "gray.300" : "gray.600"}
            _hover={{ color: isDark ? "blue.300" : "blue.600" }}
          />
          <IconButton
            icon={BiChevronRight}
            size="sm"
            variant="ghost"
            onClick={scrollRight}
            aria-label="Scroll right"
            className={`scroll-button right ${isScrolling ? "scrolling" : ""}`}
            color={isDark ? "gray.300" : "gray.600"}
            _hover={{ color: isDark ? "blue.300" : "blue.600" }}
          />
        </Flex>
      </Flex>

      <Box
        ref={scrollRef}
        overflowX="auto"
        className="subcategory-scroll"
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Flex gap="2" pb="2">
          <Box
            onClick={() => handleSubcategorySelect("all")}
            borderRadius="lg"
            bg={subcategory === "all" ? "bluex.500" : bgColor}
            borderWidth="1px"
            borderColor={subcategory === "all" ? "bluex.600" : borderColor}
            p="3"
            minWidth="80px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            _hover={{ transform: "translateY(-2px)" }}
            className={`carousel-item ${subcategory === "all" ? "active" : ""}`}
            onMouseEnter={() => setHoveredItem("all")}
            onMouseLeave={() => setHoveredItem(null)}
            position="relative"
            overflow="hidden"
            boxShadow={subcategory === "all" ? "0 5px 15px rgba(45, 64, 82, 0.2)" : "0 2px 5px rgba(0, 0, 0, 0.05)"}
          >
            <Box
              as={BiTag}
              size="24px"
              color={subcategory === "all" ? "white" : textColor}
              mb="2"
              className={`carousel-icon ${subcategory === "all" ? "active-icon" : ""} ${hoveredItem === "all" ? "hover-icon" : ""}`}
            />
            <Text
              fontSize="xs"
              fontWeight={subcategory === "all" ? "bold" : "normal"}
              color={subcategory === "all" ? "white" : textColor}
              textAlign="center"
              className="carousel-text"
            >
              Todas
            </Text>
            {subcategory === "all" && (
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                className="glow-effect"
                style={{
                  background: "linear-gradient(135deg, #2d4052 0%, #415972 100%)",
                  opacity: 0.2,
                }}
              />
            )}
          </Box>

          {subcategories.map((subcat) => {
            // Get icon for this subcategory
            const subcatObj = currentCategory.subcategories.find((s) => (typeof s === "object" ? s.name : s) === subcat)
            const iconName = typeof subcatObj === "object" ? subcatObj.icon : "tag"
            const IconComponent = getIconComponent(iconName)
            const isActive = subcategory === subcat
            const isHovered = hoveredItem === subcat

            // Get color scheme for this subcategory
            const colorScheme = getSubcategoryColorScheme(subcat)
            const iconColor = isActive ? "white" : isDark ? colorScheme.secondary : colorScheme.primary

            return (
              <Box
                key={subcat}
                onClick={() => handleSubcategorySelect(subcat)}
                borderRadius="lg"
                bg={isActive ? colorScheme.primary : bgColor}
                borderWidth="1px"
                borderColor={isActive ? colorScheme.secondary : borderColor}
                p="3"
                minWidth="80px"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                _hover={{ transform: "translateY(-2px)" }}
                className={`carousel-item ${isActive ? "active" : ""}`}
                onMouseEnter={() => setHoveredItem(subcat)}
                onMouseLeave={() => setHoveredItem(null)}
                position="relative"
                overflow="hidden"
                boxShadow={isActive ? `0 5px 15px ${colorScheme.primary}40` : "0 2px 5px rgba(0, 0, 0, 0.05)"}
                data-subcategory={subcat}
              >
                <Box
                  as={IconComponent}
                  size="24px"
                  color={isActive ? "white" : iconColor}
                  mb="2"
                  className={`carousel-icon ${isActive ? "active-icon" : ""} ${isHovered ? "hover-icon" : ""}`}
                />
                <Text
                  fontSize="xs"
                  fontWeight={isActive ? "bold" : "normal"}
                  color={isActive ? "white" : textColor}
                  textAlign="center"
                  className="carousel-text"
                >
                  {subcat}
                </Text>
                {isActive && (
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    className="glow-effect"
                    style={{
                      background: colorScheme.gradient,
                      opacity: 0.2,
                    }}
                  />
                )}
              </Box>
            )
          })}
        </Flex>
      </Box>

      <style jsx global>{`
        .subcategory-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
          padding: 5px 0;
        }
        
        .subcategory-scroll::-webkit-scrollbar {
          display: none;
        }
        
        .carousel-item {
          transform-origin: center;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .carousel-item:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }
        
        .carousel-item.active {
          box-shadow: 0 5px 15px rgba(45, 64, 82, 0.2);
        }
        
        .carousel-icon {
          transition: all 0.3s ease;
        }
        
        .carousel-icon.active-icon {
          transform: scale(1.2);
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
          animation: float 3s ease-in-out infinite;
        }
        
        .carousel-icon.hover-icon {
          transform: scale(1.15) rotate(5deg);
        }
        
        .carousel-text {
          transition: all 0.3s ease;
        }
        
        .glow-effect {
          transition: all 0.3s ease;
          animation: pulse-glow 2s infinite;
        }
        
        .scroll-button {
          transition: all 0.3s ease;
        }
        
        .scroll-button:hover {
          transform: scale(1.2);
        }
        
        .scroll-button.scrolling {
          animation: pulse-button 0.5s ease;
        }
        
        .scroll-button.left:hover {
          transform: scale(1.2) translateX(-2px);
        }
        
        .scroll-button.right:hover {
          transform: scale(1.2) translateX(2px);
        }
        
        @keyframes pulse-glow {
          0% { opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { opacity: 0.1; }
        }
        
        @keyframes float {
          0%, 100% { transform: scale(1.2) translateY(0); }
          50% { transform: scale(1.2) translateY(-3px); }
        }
        
        @keyframes pulse-button {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
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
