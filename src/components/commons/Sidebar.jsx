"use client"

import { Box, RadioButtonGroup } from "@chakra-ui/core"
import { BiCake, BiDish, BiDrink, BiFirstAid, BiHomeAlt, BiShoppingBag, BiStore, BiLaptop, BiDesktop, BiDevices, BiPhotoAlbum, BiCamera, BiCameraHome, BiCameraMovie, BiCameraOff } from "react-icons/bi"
import CustomRadio from "../others/CustomRadio"
import { useRecoilState } from "recoil"
import { selectedCategory } from "../../recoil/state"
import { useEffect } from "react"
import useIsDesktop from "../../hooks/useIsDesktop"

// Define category color schemes
const categoryColors = {
  all: { primary: "#4A5568", secondary: "#718096", gradient: "linear-gradient(135deg, #4A5568 0%, #718096 100%)" },
  Electrodomésticos: {
    primary: "#3182CE",
    secondary: "#63B3ED",
    gradient: "linear-gradient(135deg, #3182CE 0%, #63B3ED 100%)",
  },
  Farmacia: { primary: "#E53E3E", secondary: "#FC8181", gradient: "linear-gradient(135deg, #E53E3E 0%, #FC8181 100%)" },
  meat: { primary: "#DD6B20", secondary: "#F6AD55", gradient: "linear-gradient(135deg, #DD6B20 0%, #F6AD55 100%)" },
  bakery: { primary: "#D69E2E", secondary: "#F6E05E", gradient: "linear-gradient(135deg, #D69E2E 0%, #F6E05E 100%)" },
  drink: { primary: "#38A169", secondary: "#68D391", gradient: "linear-gradient(135deg, #38A169 0%, #68D391 100%)" },
  Ropa_calzado_accesorios: {
    primary: "#805AD5",
    secondary: "#B794F4",
    gradient: "linear-gradient(135deg, #805AD5 0%, #B794F4 100%)",
  },
  Components: {
    primary: "#2C5282",
    secondary: "#4299E1",
    gradient: "linear-gradient(135deg, #2C5282 0%, #4299E1 100%)",
  },
}

export default function Sidebar({ showSidebar, setSidebar }) {
  const [category, setCategory] = useRecoilState(selectedCategory)
  const isDesktop = useIsDesktop()

  //close sidebar on select when is mobile
  useEffect(() => {
    if (!isDesktop) {
      setSidebar(false)
    }
  }, [category])

  return (
    <Box
      w={["100%", "100%", "280px"]}
      h="calc(100vh - 100px)"
      bg="white"
      position="fixed"
      transform={!showSidebar ? ["translateX(-100%)", "translateX(-100%)", "translateX(-280px)"] : "translateX(0)"}
      transition="transform .3s ease"
      left="0"
      top="100px"
      py="5"
      zIndex="1100"
      boxShadow={showSidebar ? "lg" : "none"}
      className={showSidebar ? "sidebar-active" : "sidebar-inactive"}
    >
      <RadioButtonGroup defaultValue="all" value={category} onChange={(val) => setCategory(val)} isInline>
        <CustomRadio
          value="all"
          title="Todos los Productos"
          icon={<Box as={BiStore} size="24px" mr="10" className="sidebar-icon category-all" data-category="all" />}
          colorScheme={categoryColors.all}
        />
        <CustomRadio
          value="Electrodomésticos"
          title="Electrodomésticos"
          icon={
            <Box
              as={BiHomeAlt}
              size="24px"
              mr="10"
              className="sidebar-icon category-appliances"
              data-category="Electrodomésticos"
            />
          }
          colorScheme={categoryColors.Electrodomésticos}
        />
        <CustomRadio
          value="Farmacia"
          title="Farmacia F+"
          icon={
            <Box
              as={BiFirstAid}
              size="24px"
              mr="10"
              className="sidebar-icon category-pharmacy"
              data-category="Farmacia"
            />
          }
          colorScheme={categoryColors.Farmacia}
        />
        <CustomRadio
          value="meat"
          title="Pastas, granos y cereales"
          icon={<Box as={BiDish} size="24px" mr="10" className="sidebar-icon category-meat" data-category="meat" />}
          colorScheme={categoryColors.meat}
        />
        <CustomRadio
          value="bakery"
          title="Panadería y Dulcería"
          icon={<Box as={BiCake} size="24px" mr="10" className="sidebar-icon category-bakery" data-category="bakery" />}
          colorScheme={categoryColors.bakery}
        />
        <CustomRadio
          value="drink"
          title="Bebidas"
          icon={<Box as={BiDrink} size="24px" mr="10" className="sidebar-icon category-drinks" data-category="drink" />}
          colorScheme={categoryColors.drink}
        />
        <CustomRadio
          value="Ropa_calzado_accesorios"
          title="Ropa, calzado"
          icon={
            <Box
              as={BiShoppingBag}
              size="24px"
              mr="10"
              className="sidebar-icon category-clothing"
              data-category="Ropa_calzado_accesorios"
            />
          }
          colorScheme={categoryColors.Ropa_calzado_accesorios}


// agregado recientemente Ordenadores
        />
        <CustomRadio
          value="Computers"
          title="Ordenadores"
          icon={
            <Box
              as={BiLaptop}
              size="24px"
              mr="10"
              className="sidebar-icon category-Computers"
              data-category="Ordenadores"
            />
          }
          colorScheme={categoryColors.Computers}


// agregado recientemente Componentes de PC
        />
        <CustomRadio
          value="Components"
          title="Componentes de PC"
          icon={
            <Box
              as={BiDevices}
              size="24px"
              mr="10"
              className="sidebar-icon category-components"
              data-category="Components"
            />
          }
          colorScheme={categoryColors.Components}



// agregado recientemente Fotografía y Accesorios
/>
        <CustomRadio
          value="Photography"
          title="Fotografía y Accesorios"
          icon={
            <Box
              as={BiCamera}
              size="24px"
              mr="10"
              className="sidebar-icon category-Computers"
              data-category="Photography"
            />
          }
          colorScheme={categoryColors.Photography}




        />
      </RadioButtonGroup>

      <style jsx global>{`
        .sidebar-icon {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }
        
        button:hover .sidebar-icon {
          transform: scale(1.2) rotate(5deg);
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }
        
        [aria-checked="true"] .sidebar-icon {
          transform: scale(1.2);
          filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.4));
        }
        
        /* Category-specific styling */
        [aria-checked="true"] .category-all {
          color: #4A5568;
          filter: drop-shadow(0 0 5px rgba(74, 85, 104, 0.5));
          animation: pulse-all 2s infinite;
        }
        
        [aria-checked="true"] .category-appliances {
          color: #3182CE;
          filter: drop-shadow(0 0 5px rgba(49, 130, 206, 0.5));
          animation: pulse-appliances 2s infinite;
        }
        
        [aria-checked="true"] .category-pharmacy {
          color: #E53E3E;
          filter: drop-shadow(0 0 5px rgba(229, 62, 62, 0.5));
          animation: pulse-pharmacy 2s infinite;
        }
        
        [aria-checked="true"] .category-meat {
          color: #DD6B20;
          filter: drop-shadow(0 0 5px rgba(221, 107, 32, 0.5));
          animation: pulse-meat 2s infinite;
        }
        
        [aria-checked="true"] .category-bakery {
          color: #D69E2E;
          filter: drop-shadow(0 0 5px rgba(214, 158, 46, 0.5));
          animation: pulse-bakery 2s infinite;
        }
        
        [aria-checked="true"] .category-drinks {
          color: #38A169;
          filter: drop-shadow(0 0 5px rgba(56, 161, 105, 0.5));
          animation: pulse-drinks 2s infinite;
        }
        
        [aria-checked="true"] .category-clothing {
          color: #805AD5;
          filter: drop-shadow(0 0 5px rgba(128, 90, 213, 0.5));
          animation: pulse-clothing 2s infinite;
        }
        
        [aria-checked="true"] .category-components {
          color: #2C5282;
          filter: drop-shadow(0 0 5px rgba(44, 82, 130, 0.5));
          animation: pulse-components 2s infinite;
        }
        
        /* Hover effects for each category */
        button:hover .category-all {
          color: #4A5568;
        }
        
        button:hover .category-appliances {
          color: #3182CE;
        }
        
        button:hover .category-pharmacy {
          color: #E53E3E;
        }
        
        button:hover .category-meat {
          color: #DD6B20;
        }
        
        button:hover .category-bakery {
          color: #D69E2E;
        }
        
        button:hover .category-drinks {
          color: #38A169;
        }
        
        button:hover .category-clothing {
          color: #805AD5;
        }
        
        button:hover .category-components {
          color: #2C5282;
        }
        
        /* Animations */
        @keyframes pulse-all {
          0% {
            filter: drop-shadow(0 0 2px rgba(74, 85, 104, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 5px rgba(74, 85, 104, 0.7));
          }
          100% {
            filter: drop-shadow(0 0 2px rgba(74, 85, 104, 0.4));
          }
        }
        
        @keyframes pulse-appliances {
          0% {
            filter: drop-shadow(0 0 2px rgba(49, 130, 206, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 5px rgba(49, 130, 206, 0.7));
          }
          100% {
            filter: drop-shadow(0 0 2px rgba(49, 130, 206, 0.4));
          }
        }
        
        @keyframes pulse-pharmacy {
          0% {
            filter: drop-shadow(0 0 2px rgba(229, 62, 62, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 5px rgba(229, 62, 62, 0.7));
          }
          100% {
            filter: drop-shadow(0 0 2px rgba(229, 62, 62, 0.4));
          }
        }
        
        @keyframes pulse-meat {
          0% {
            filter: drop-shadow(0 0 2px rgba(221, 107, 32, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 5px rgba(221, 107, 32, 0.7));
          }
          100% {
            filter: drop-shadow(0 0 2px rgba(221, 107, 32, 0.4));
          }
        }
        
        @keyframes pulse-bakery {
          0% {
            filter: drop-shadow(0 0 2px rgba(214, 158, 46, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 5px rgba(214, 158, 46, 0.7));
          }
          100% {
            filter: drop-shadow(0 0 2px rgba(214, 158, 46, 0.4));
          }
        }
        
        @keyframes pulse-drinks {
          0% {
            filter: drop-shadow(0 0 2px rgba(56, 161, 105, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 5px rgba(56, 161, 105, 0.7));
          }
          100% {
            filter: drop-shadow(0 0 2px rgba(56, 161, 105, 0.4));
          }
        }
        
        @keyframes pulse-clothing {
          0% {
            filter: drop-shadow(0 0 2px rgba(128, 90, 213, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 5px rgba(128, 90, 213, 0.7));
          }
          100% {
            filter: drop-shadow(0 0 2px rgba(128, 90, 213, 0.4));
          }
        }
        
        @keyframes pulse-components {
          0% {
            filter: drop-shadow(0 0 2px rgba(44, 82, 130, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 5px rgba(44, 82, 130, 0.7));
          }
          100% {
            filter: drop-shadow(0 0 2px rgba(44, 82, 130, 0.4));
          }
        }
        
        .sidebar-active {
          animation: slide-in 0.3s ease-out forwards;
        }
        
        @keyframes slide-in {
          from {
            transform: translateX(-280px);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </Box>
  )
}
