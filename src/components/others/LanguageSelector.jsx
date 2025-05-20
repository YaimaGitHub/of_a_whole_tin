"use client"

import { Menu, MenuButton, MenuList, MenuItem, Button, Flex, Text, Box, useColorMode } from "@chakra-ui/core"
import { useRecoilState } from "recoil"
import { selectedLanguage } from "../../recoil/state"
import { BiWorld } from "react-icons/bi"
import { FaLanguage } from "react-icons/fa"

export default function LanguageSelector() {
  const [language, setLanguage] = useRecoilState(selectedLanguage)
  const { colorMode } = useColorMode()

  // Theme colors
  const menuBg = colorMode === "light" ? "white" : "gray.700"
  const menuBorder = colorMode === "light" ? "gray.200" : "gray.600"
  const hoverBg = colorMode === "light" ? "gray.100" : "gray.600"

  const languages = [
    { code: "es", name: "Español", icon: BiWorld, flag: "🇪🇸" },
    { code: "en", name: "English", icon: BiWorld, flag: "🇺🇸" },
  ]

  const selectedLanguageObj = languages.find((l) => l.code === language) || languages[0]

  return (
    <Menu closeOnSelect={true}>
      <MenuButton as={Button} variant="outline" size="md" mr={3} borderColor={menuBorder} _hover={{ bg: hoverBg }}>
        <Flex align="center">
          <Box as={FaLanguage} mr={2} />
          <Text>
            {selectedLanguageObj.flag} {selectedLanguageObj.name}
          </Text>
        </Flex>
      </MenuButton>
      <MenuList bg={menuBg} borderColor={menuBorder} zIndex={1200}>
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            bg={language === lang.code ? hoverBg : "transparent"}
            _hover={{ bg: hoverBg }}
          >
            <Flex align="center">
              <Text mr={2}>{lang.flag}</Text>
              <Text fontWeight={language === lang.code ? "bold" : "normal"}>{lang.name}</Text>
            </Flex>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  )
}
