"use client"

import { Box, CloseButton, Flex, Input, Button } from "@chakra-ui/core"
import { useState, useEffect } from "react"
import { BiSearch } from "react-icons/bi"
import { useRecoilState } from "recoil"
import { searchValue, selectedCategory } from "../../recoil/state"
import { useDebounce } from "../../hooks/useDebounce"

export default function SearchBar({ setShowSearch }) {
  const [search, setValue] = useState("")
  const [searchQuery, setSearchQuery] = useRecoilState(searchValue)
  const [category, setCategory] = useRecoilState(selectedCategory)
  const debouncedSearchValue = useDebounce(search, 300) // 300ms debounce delay

  useEffect(() => {
    setSearchQuery(debouncedSearchValue)
  }, [debouncedSearchValue, setSearchQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    // No need to set search query here as it's already being set by the useEffect
  }

  const handleChange = (e) => {
    const value = e.target.value
    setValue(value)

    if (value === "") {
      setSearchQuery("")
    }
    // We don't need the setTimeout anymore as we'll use the debounced value
  }

  const handleClose = () => {
    setSearchQuery("")
    setShowSearch(false)
  }

  return (
    <Box w="100%" bg="white" py="6" shadow="md" h="100px" position="fixed" top="0" left="0" zIndex="1102">
      <Flex w="96%" mx="auto" justify="space-between" align="center">
        <Box w="1px" h="1px" display={["none", "none", "none", "block"]} /> {/* pseudo offset */}
        <Flex as="form" onSubmit={handleSubmit} w={["85%", "85%", "60%", "60%"]} position="relative">
          <Input
            pl="4rem"
            type="search"
            placeholder="Buscar en la tienda ..."
            onChange={handleChange}
            value={search}
            size="lg"
            rounded="lg"
            border="2px solid black"
          />
          <Button
            type="submit"
            position="absolute"
            left="0"
            top="0"
            h="100%"
            w="4rem"
            bg="transparent"
            _hover={{ bg: "transparent" }}
          >
            <Box as={BiSearch} size="28px" />
          </Button>
        </Flex>
        <CloseButton size="lg" onClick={handleClose} />
      </Flex>
    </Box>
  )
}
