"use client"

import { Box, Flex, Text, Badge, useColorMode, Icon, PseudoBox } from "@chakra-ui/core"
import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { selectedCategory, selectedSubcategory, availableSubcategories } from "../../recoil/state"
import { BiFilterAlt, BiChevronDown, BiChevronUp } from "react-icons/bi"
import { categoryHierarchy } from "../../data/categories"
import { useState } from "react"
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
} from "react-icons/bi"

export default function SubcategoryMenu() {
  const [category, setCategory] = useRecoilState(selectedCategory)
  const [subcategory, setSubcategory] = useRecoilState(selectedSubcategory)
  const subcategories = useRecoilValue(availableSubcategories)
  const { colorMode } = useColorMode()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null)
  const isDark = colorMode === "dark"

  // Reset subcategory when category changes
  useEffect(() => {
    setSubcategory("all")
  }, [category, setSubcategory])

  // Theme colors
  const bgColor = colorMode === "light" ? "white" : "gray.700"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.600"
  const textColor = colorMode === "light" ? "gray.800" : "white"
  const hoverBgColor = colorMode === "light" ? "gray.50" : "gray.600"

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

  // Toggle collapse state
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  if (category === "all" || !subcategories.length) {
    return null
  }

  // Get current category structure
  const currentCategory = categoryHierarchy[category] || { subcategories: [] }

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
        borderBottomWidth={!isCollapsed ? "1px" : "0"}
        borderColor={borderColor}
        onClick={toggleCollapse}
        cursor="pointer"
        _hover={{ bg: hoverBgColor }}
        className="header-hover"
      >
        <Flex align="center">
          <Text fontWeight="medium" color={textColor}>
            Subcategorías de {category}
          </Text>
          <Badge ml="2" colorScheme="blue" borderRadius="full">
            {subcategories.length}
          </Badge>
        </Flex>
        <Icon as={isCollapsed ? BiChevronDown : BiChevronUp} size="24px" color="bluex.500" className="chevron-icon" />
      </Flex>

      {!isCollapsed && (
        <Box className="subcategory-container">
          <Flex
            p={{ base: "2", md: "3" }}
            wrap="wrap"
            gap={{ base: "1", md: "2" }}
            justifyContent={{ base: "center", sm: "flex-start" }}
          >
            <PseudoBox
              as="button"
              px={{ base: "2", md: "3" }}
              py={{ base: "1", md: "2" }}
              borderRadius="md"
              bg={subcategory === "all" ? "bluex.500" : "gray.100"}
              color={subcategory === "all" ? "white" : textColor}
              _hover={{ bg: subcategory === "all" ? "bluex.600" : "gray.200" }}
              onClick={() => handleSubcategorySelect("all")}
              className={`subcategory-item ${subcategory === "all" ? "active" : ""}`}
              minWidth={{ base: "45%", sm: "auto" }}
              maxWidth={{ base: "45%", sm: "none" }}
              mb={{ base: "2", sm: "0" }}
              onMouseEnter={() => setHoveredItem("all")}
              onMouseLeave={() => setHoveredItem(null)}
              position="relative"
              overflow="hidden"
            >
              <Flex
                align="center"
                justify={{ base: "center", sm: "flex-start" }}
                flexDirection={{ base: "column", sm: "row" }}
                position="relative"
                zIndex="2"
              >
                <Box
                  as={BiFilterAlt}
                  size={{ base: "20px", md: "16px" }}
                  mb={{ base: "1", sm: "0" }}
                  mr={{ base: "0", sm: "1" }}
                  className={`icon-animation ${subcategory === "all" ? "active-icon" : ""} ${hoveredItem === "all" ? "hovered-icon" : ""}`}
                  color={subcategory === "all" ? "white" : "gray.500"}
                />
                <Text fontSize={{ base: "xs", md: "sm" }}>Todas</Text>
              </Flex>
              {(subcategory === "all" || hoveredItem === "all") && (
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  className="glow-effect"
                  opacity={subcategory === "all" ? 0.8 : 0.4}
                />
              )}
            </PseudoBox>

            {subcategories.map((subcat) => {
              // Get icon for this subcategory
              const subcatObj = currentCategory.subcategories.find(
                (s) => (typeof s === "object" ? s.name : s) === subcat,
              )
              const iconName = typeof subcatObj === "object" ? subcatObj.icon : "tag"
              const IconComponent = getIconComponent(iconName)
              const isActive = subcategory === subcat
              const isHovered = hoveredItem === subcat

              // Get color scheme for this subcategory
              const colorScheme = getSubcategoryColorScheme(subcat)
              const iconColor = isActive ? "white" : isDark ? colorScheme.secondary : colorScheme.primary

              return (
                <PseudoBox
                  key={subcat}
                  as="button"
                  px={{ base: "2", md: "3" }}
                  py={{ base: "1", md: "2" }}
                  borderRadius="md"
                  bg={isActive ? colorScheme.primary : "gray.100"}
                  color={isActive ? "white" : textColor}
                  _hover={{ bg: isActive ? colorScheme.primary : "gray.200" }}
                  onClick={() => handleSubcategorySelect(subcat)}
                  className={`subcategory-item ${isActive ? "active" : ""}`}
                  minWidth={{ base: "45%", sm: "auto" }}
                  maxWidth={{ base: "45%", sm: "none" }}
                  mb={{ base: "2", sm: "0" }}
                  onMouseEnter={() => setHoveredItem(subcat)}
                  onMouseLeave={() => setHoveredItem(null)}
                  position="relative"
                  overflow="hidden"
                  data-subcategory={subcat}
                >
                  <Flex
                    align="center"
                    justify={{ base: "center", sm: "flex-start" }}
                    flexDirection={{ base: "column", sm: "row" }}
                    position="relative"
                    zIndex="2"
                  >
                    <Box
                      as={IconComponent}
                      size={{ base: "20px", md: "16px" }}
                      mb={{ base: "1", sm: "0" }}
                      mr={{ base: "0", sm: "1" }}
                      className={`icon-animation ${isActive ? "active-icon" : ""} ${isHovered ? "hovered-icon" : ""}`}
                      color={iconColor}
                    />
                    <Text fontSize={{ base: "xs", md: "sm" }}>{subcat}</Text>
                  </Flex>
                  {(isActive || isHovered) && (
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      className="glow-effect"
                      opacity={isActive ? 0.8 : 0.4}
                      style={{
                        background: isActive
                          ? colorScheme.gradient
                          : `linear-gradient(135deg, ${colorScheme.primary}20 0%, ${colorScheme.secondary}20 100%)`,
                      }}
                    />
                  )}
                </PseudoBox>
              )
            })}
          </Flex>
        </Box>
      )}

      <style jsx global>{`
        .subcategory-container {
          animation: fadeIn 0.3s ease-out;
        }
        
        .subcategory-item {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-origin: center;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }
        
        .subcategory-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .subcategory-item.active {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .icon-animation {
          transition: all 0.3s ease;
        }
        
        .active-icon {
          transform: scale(1.2);
          filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
        }
        
        .hovered-icon {
          transform: scale(1.15) rotate(5deg);
        }
        
        .glow-effect {
          transition: all 0.3s ease;
        }
        
        @keyframes pulse-glow {
          0% { opacity: 0.4; }
          50% { opacity: 0.7; }
          100% { opacity: 0.4; }
        }
        
        .header-hover:hover .chevron-icon {
          transform: translateY(3px);
          color: #4299E1;
        }
        
        .chevron-icon {
          transition: transform 0.3s ease, color 0.3s ease;
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

        @media (max-width: 480px) {
          .subcategory-item {
            margin-bottom: 8px;
          }
        }
      `}</style>
    </Box>
  )
}
