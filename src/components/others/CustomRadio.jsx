"use client"

import { Button, Flex } from "@chakra-ui/core"
import React from "react"

const CustomRadio = React.forwardRef((props, ref) => {
  const { title = "category", icon = "", isChecked, isDisabled, value, colorScheme = {}, ...rest } = props

  // Get gradient based on category
  const getGradient = () => {
    if (isChecked && colorScheme && colorScheme.gradient) {
      return colorScheme.gradient
    }
    return "none"
  }

  // Get accent color based on category
  const getAccentColor = () => {
    if (colorScheme && colorScheme.primary) {
      return colorScheme.primary
    }
    return "bluex.600"
  }

  return (
    <Button
      ref={ref}
      bg={isChecked ? "gray.200" : "white"}
      color={isChecked ? getAccentColor() : "gray.700"}
      aria-checked={isChecked}
      role="radio"
      isDisabled={isDisabled}
      border="none"
      _focus={{ outline: "none" }}
      rounded="none"
      py="6"
      w="100%"
      transition="all 0.3s ease"
      position="relative"
      overflow="hidden"
      _hover={{
        bg: isChecked ? "gray.200" : "gray.50",
        transform: "translateX(5px)",
      }}
      _before={{
        content: '""',
        position: "absolute",
        left: "0",
        top: "0",
        height: "100%",
        width: isChecked ? "4px" : "0",
        bg: getAccentColor(),
        transition: "all 0.3s ease",
      }}
      className={isChecked ? "radio-active" : "radio-inactive"}
      data-category={value}
      {...rest}
    >
      <Flex w="100%" align="center" className="radio-content">
        {icon}
        <span className="radio-text">{title}</span>
      </Flex>

      {isChecked && (
        <div
          className="radio-background-effect"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: getGradient(),
            opacity: 0.05,
            zIndex: 0,
          }}
        />
      )}

      <style jsx global>{`
        .radio-active {
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
        }
        
        .radio-active .radio-text {
          font-weight: bold;
          position: relative;
          z-index: 1;
        }
        
        .radio-inactive:hover {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
        }
        
        @keyframes slide-in-left {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .radio-content {
          animation: slide-in-left 0.3s ease-out;
          position: relative;
          z-index: 1;
        }
        
        .radio-background-effect {
          animation: fade-in 0.5s ease-out;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 0.05;
          }
        }
      `}</style>
    </Button>
  )
})

export default CustomRadio
