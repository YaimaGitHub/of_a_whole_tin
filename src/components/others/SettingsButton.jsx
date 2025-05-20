"use client"

import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  Flex,
  useColorMode,
  Icon,
  Text,
} from "@chakra-ui/core"
import { FaBell } from "react-icons/fa"
import LanguageSelector from "./LanguageSelector"
import CurrencySelector from "./CurrencySelector"
import useTranslation from "../../hooks/useTranslation"

export default function SettingsButton() {
  const { colorMode } = useColorMode()
  const { t } = useTranslation()

  // Theme colors
  const bgColor = colorMode === "light" ? "white" : "gray.700"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.600"
  const iconColor = colorMode === "light" ? "bluex.500" : "bluex.300"
  const textColor = colorMode === "light" ? "gray.700" : "white"

  return (
    <Box position="relative" zIndex={1000} mt={4} mb={4} textAlign="center">
      <Popover placement="bottom" closeOnBlur={true}>
        <PopoverTrigger>
          <Box
            as="button"
            aria-label="Settings"
            className="settings-bell"
            position="relative"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            width="50px"
            height="50px"
            borderRadius="full"
            bg={bgColor}
            boxShadow="md"
            border="1px solid"
            borderColor={borderColor}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.1)",
              boxShadow: "lg",
            }}
          >
            <Icon as={FaBell} size="24px" color={iconColor} className="bell-icon" />
          </Box>
        </PopoverTrigger>
        <PopoverContent
          width="250px"
          bg={bgColor}
          borderColor={borderColor}
          borderRadius="md"
          boxShadow="xl"
          _focus={{ outline: "none" }}
          className="settings-popover"
        >
          <PopoverBody p={4}>
            <Flex direction="column" align="stretch">
              <Text fontWeight="bold" mb={3} color={textColor}>
                {t("settings.title")}
              </Text>

              <Box mb={4}>
                <Text fontSize="sm" mb={2} color={textColor}>
                  {t("settings.language")}
                </Text>
                <LanguageSelector />
              </Box>

              <Box>
                <Text fontSize="sm" mb={2} color={textColor}>
                  {t("settings.currency")}
                </Text>
                <CurrencySelector />
              </Box>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <style jsx global>{`
        .settings-bell {
          cursor: pointer;
        }
        
        .bell-icon {
          animation: bell-swing 2s infinite;
          transform-origin: top center;
        }
        
        @keyframes bell-swing {
          0%, 100% { transform: rotate(0); }
          20% { transform: rotate(15deg); }
          40% { transform: rotate(-10deg); }
          60% { transform: rotate(5deg); }
          80% { transform: rotate(-5deg); }
        }
        
        .settings-popover {
          animation: fade-in-up 0.3s ease-out;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
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
