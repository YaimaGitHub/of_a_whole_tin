import { Box, useColorMode } from "@chakra-ui/core"
import {
  BiStore,
  BiHomeAlt,
  BiFirstAid,
  BiDish,
  BiBread,
  BiDrink,
  BiTShirt,
  BiLaptop,
  BiMicrochip,
} from "react-icons/bi"

// Define category color schemes
const categoryColors = {
  all: { primary: "#4A5568", secondary: "#718096", gradient: "linear-gradient(135deg, #4A5568 0%, #718096 100%)" },
  appliances: {
    primary: "#3182CE",
    secondary: "#63B3ED",
    gradient: "linear-gradient(135deg, #3182CE 0%, #63B3ED 100%)",
  },
  pharmacy: { primary: "#E53E3E", secondary: "#FC8181", gradient: "linear-gradient(135deg, #E53E3E 0%, #FC8181 100%)" },
  meat: { primary: "#DD6B20", secondary: "#F6AD55", gradient: "linear-gradient(135deg, #DD6B20 0%, #F6AD55 100%)" },
  bakery: { primary: "#D69E2E", secondary: "#F6E05E", gradient: "linear-gradient(135deg, #D69E2E 0%, #F6E05E 100%)" },
  drinks: { primary: "#38A169", secondary: "#68D391", gradient: "linear-gradient(135deg, #38A169 0%, #68D391 100%)" },
  clothing: { primary: "#805AD5", secondary: "#B794F4", gradient: "linear-gradient(135deg, #805AD5 0%, #B794F4 100%)" },
  electronics: {
    primary: "#2B6CB0",
    secondary: "#4299E1",
    gradient: "linear-gradient(135deg, #2B6CB0 0%, #4299E1 100%)",
  },
  components: {
    primary: "#2C5282",
    secondary: "#4299E1",
    gradient: "linear-gradient(135deg, #2C5282 0%, #4299E1 100%)",
  },
}

const CategoryIcon = ({ icon, active = false }) => {
  const { colorMode } = useColorMode()
  const isDark = colorMode === "dark"

  const getIcon = () => {
    switch (icon) {
      case "all":
        return BiStore
      case "appliances":
        return BiHomeAlt
      case "pharmacy":
        return BiFirstAid
      case "meat":
        return BiDish
      case "bakery":
        return BiBread
      case "drinks":
        return BiDrink
      case "clothing":
        return BiTShirt
      case "electronics":
        return BiLaptop
      case "components":
        return BiMicrochip
      default:
        return BiStore
    }
  }

  const IconComponent = getIcon()
  const colorScheme = categoryColors[icon] || categoryColors.all

  // Base styles for all icons
  const baseStyles = {
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    transform: active ? "scale(1.2)" : "scale(1)",
  }

  // Active icon styles
  const activeStyles = active
    ? {
        color: isDark ? colorScheme.secondary : colorScheme.primary,
        filter: `drop-shadow(0 0 4px ${isDark ? colorScheme.secondary + "80" : colorScheme.primary + "80"})`,
      }
    : {
        color: isDark ? "gray.400" : "gray.500",
      }

  return (
    <Box
      as={IconComponent}
      size="24px"
      {...baseStyles}
      {...activeStyles}
      className={`category-icon ${active ? "icon-active" : "icon-inactive"} icon-${icon}`}
      data-category={icon}
    />
  )
}

export default CategoryIcon

// Add this global style at the end of the file
const style = document.createElement("style")
style.innerHTML = `
  .category-icon {
    position: relative;
    z-index: 1;
  }
  
  .icon-active {
    animation: pulse-category 2s infinite;
  }
  
  .icon-inactive:hover {
    transform: scale(1.15) rotate(5deg);
  }
  
  /* Category-specific animations */
  .icon-all.icon-active {
    animation: pulse-all 2s infinite;
  }
  
  .icon-appliances.icon-active {
    animation: pulse-appliances 2s infinite;
  }
  
  .icon-pharmacy.icon-active {
    animation: pulse-pharmacy 2s infinite;
  }
  
  .icon-meat.icon-active {
    animation: pulse-meat 2s infinite;
  }
  
  .icon-bakery.icon-active {
    animation: pulse-bakery 2s infinite;
  }
  
  .icon-drinks.icon-active {
    animation: pulse-drinks 2s infinite;
  }
  
  .icon-clothing.icon-active {
    animation: pulse-clothing 2s infinite;
  }
  
  .icon-components.icon-active {
    animation: pulse-components 2s infinite;
  }
  
  @keyframes pulse-category {
    0% {
      filter: drop-shadow(0 0 2px rgba(66, 153, 225, 0.4));
    }
    50% {
      filter: drop-shadow(0 0 5px rgba(66, 153, 225, 0.7));
    }
    100% {
      filter: drop-shadow(0 0 2px rgba(66, 153, 225, 0.4));
    }
  }
  
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
`
document.head.appendChild(style)
