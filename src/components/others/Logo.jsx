"use client"

import { useState } from "react"
import { Box, Image, useColorMode } from "@chakra-ui/core"
import { useRouter } from "next/router"
import NewProductsModal from "./NewProductsModal"

const Logo = ({ size = "40px", ...rest }) => {
  const { colorMode } = useColorMode()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLogoClick = (e) => {
    // Si estamos en la página principal, abrimos el modal
    if (router.pathname === "/") {
      e.preventDefault()
      setIsModalOpen(true)
    } else {
      // Si no, navegamos a la página principal
      router.push("/")
    }
  }

  return (
    <>
      <Box
        as="a"
        href="/"
        onClick={handleLogoClick}
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...rest}
      >
        <Image
          src={colorMode === "light" ? "/logo.png" : "/logo-dark.png"}
          fallbackSrc="/logo.svg"
          alt="Efectos Logo"
          width={size}
          height={size}
        />
      </Box>

      <NewProductsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Logo
