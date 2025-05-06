"use client"

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Badge,
  IconButton,
  useColorMode,
  useToast,
  Progress,
  Select,
} from "@chakra-ui/core"
import { useState, useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { cart, productStock } from "../../recoil/state"

export default function StockManagement() {
  const [stockData, setStockData] = useRecoilState(productStock)
  const currentCart = useRecoilValue(cart)
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterStock, setFilterStock] = useState("all")
  const toast = useToast()
  const { colorMode } = useColorMode()

  // Theme colors
  const bgColor = colorMode === "light" ? "white" : "gray.800"
  const borderColor = colorMode === "light" ? "gray.200" : "gray.700"
  const textColor = colorMode === "light" ? "gray.800" : "white"
  const subTextColor = colorMode === "light" ? "gray.600" : "gray.300"

  // Available categories
  const categories = ["Electrodomésticos", "Farmacia", "meat", "bakery", "drink", "Ropa_calzado_accesorios"]

  // Load products from data.js on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    import("../../data").then((module) => {
      setProducts(module.default)
    })
  }, [])

  const handleUpdateStock = (productId, newStock) => {
    setStockData((prev) => ({
      ...prev,
      [productId]: Number.parseInt(newStock),
    }))

    toast({
      title: "Stock actualizado",
      description: `El stock del producto ha sido actualizado a ${newStock} unidades`,
      status: "success",
      duration: 2000,
      isClosable: true,
    })
  }

  const handleRefreshAllStock = () => {
    // Reset stock to original values from product data
    const newStockData = {}
    products.forEach((product) => {
      newStockData[product.id] = product.stock
    })

    setStockData(newStockData)

    toast({
      title: "Stock reiniciado",
      description: "El stock de todos los productos ha sido reiniciado a sus valores originales",
      status: "info",
      duration: 3000,
      isClosable: true,
    })
  }

  const exportStockReport = () => {
    // Create CSV content
    let csvContent = "ID,Producto,Categoría,Stock Original,Stock Disponible,En Carrito\n"

    products.forEach((product) => {
      const originalStock = product.stock
      const currentStock = stockData[product.id] !== undefined ? stockData[product.id] : originalStock
      const inCartQty = currentCart[product.id] ? currentCart[product.id].qty : 0

      csvContent += `${product.id},"${product.title}",${product.category},${originalStock},${currentStock},${inCartQty}\n`
    })

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `stock_report_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Reporte exportado",
      description: "El reporte de stock ha sido exportado correctamente",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  // Filter products based on search term, category and stock level
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory ? product.category === filterCategory : true

    // Stock level filtering
    let matchesStockLevel = true
    if (filterStock !== "all") {
      const currentStock = stockData[product.id] !== undefined ? stockData[product.id] : product.stock
      const inCartQty = currentCart[product.id] ? currentCart[product.id].qty : 0
      const availableStock = currentStock - inCartQty

      switch (filterStock) {
        case "out":
          matchesStockLevel = availableStock <= 0
          break
        case "low":
          matchesStockLevel = availableStock > 0 && availableStock <= 5
          break
        case "normal":
          matchesStockLevel = availableStock > 5
          break
      }
    }

    return matchesSearch && matchesCategory && matchesStockLevel
  })

  return (
    <Box p="6" maxW="1200px" mx="auto">
      <Heading as="h1" size="xl" mb="6" color={textColor}>
        Gestión de Inventario
      </Heading>

      <Flex mb="6" direction={{ base: "column", md: "row" }} gap="4" justify="space-between">
        <Flex flex="1" align="center" wrap="wrap" gap="2">
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg={bgColor}
            color={textColor}
            borderColor={borderColor}
            maxW="250px"
          />

          <Select
            placeholder="Todas las categorías"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            maxW="200px"
            bg={bgColor}
            color={textColor}
            borderColor={borderColor}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Nivel de stock"
            value={filterStock}
            onChange={(e) => setFilterStock(e.target.value)}
            maxW="150px"
            bg={bgColor}
            color={textColor}
            borderColor={borderColor}
          >
            <option value="all">Todos</option>
            <option value="out">Sin stock</option>
            <option value="low">Stock bajo</option>
            <option value="normal">Stock normal</option>
          </Select>
        </Flex>

        <Flex gap="2">
          <Button
            leftIcon="repeat"
            variant="outline"
            onClick={handleRefreshAllStock}
            borderColor={borderColor}
            color={textColor}
          >
            Reiniciar Stock
          </Button>

          <Button
            leftIcon="download"
            colorScheme="blue"
            onClick={exportStockReport}
            bg="bluex.500"
            _hover={{ bg: "bluex.600" }}
          >
            Exportar Reporte
          </Button>
        </Flex>
      </Flex>

      <Box overflowX="auto" borderWidth="1px" borderColor={borderColor} borderRadius="lg" bg={bgColor} boxShadow="sm">
        <Table variant="simple">
          <Thead bg={colorMode === "light" ? "gray.50" : "gray.700"}>
            <Tr>
              <Th>ID</Th>
              <Th>Producto</Th>
              <Th>Categoría</Th>
              <Th>Stock Original</Th>
              <Th>Stock Disponible</Th>
              <Th>En Carrito</Th>
              <Th>Estado</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredProducts.map((product) => {
              const originalStock = product.stock
              const currentStock = stockData[product.id] !== undefined ? stockData[product.id] : originalStock
              const inCartQty = currentCart[product.id] ? currentCart[product.id].qty : 0
              const availableStock = currentStock - inCartQty

              // Stock status
              let stockStatus = "normal"
              let stockColor = "green"

              if (availableStock <= 0) {
                stockStatus = "sin stock"
                stockColor = "red"
              } else if (availableStock <= 5) {
                stockStatus = "bajo"
                stockColor = "orange"
              }

              // Stock percentage for progress bar
              const stockPercentage = originalStock > 0 ? (availableStock / originalStock) * 100 : 0

              return (
                <Tr key={product.id}>
                  <Td fontSize="sm">{product.id}</Td>
                  <Td>
                    <Text fontWeight="medium" color={textColor}>
                      {product.title}
                    </Text>
                    {product.title1 && (
                      <Text fontSize="xs" color={subTextColor}>
                        {product.title1}
                      </Text>
                    )}
                  </Td>
                  <Td>
                    <Badge colorScheme="blue">{product.category}</Badge>
                  </Td>
                  <Td>{originalStock}</Td>
                  <Td>
                    <Text fontWeight="medium" color={`${stockColor}.500`}>
                      {availableStock}
                    </Text>
                  </Td>
                  <Td>{inCartQty > 0 ? <Badge colorScheme="purple">{inCartQty}</Badge> : "-"}</Td>
                  <Td>
                    <Flex direction="column" gap="1">
                      <Badge colorScheme={stockColor}>{stockStatus}</Badge>
                      <Progress value={stockPercentage} size="xs" colorScheme={stockColor} borderRadius="full" />
                    </Flex>
                  </Td>
                  <Td>
                    <Flex align="center">
                      <NumberInput
                        min={0}
                        max={999}
                        value={currentStock}
                        onChange={(value) => handleUpdateStock(product.id, value)}
                        size="sm"
                        maxW="80px"
                      >
                        <NumberInputField bg={bgColor} color={textColor} borderColor={borderColor} />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>

                      <IconButton
                        icon="repeat"
                        variant="ghost"
                        colorScheme="blue"
                        aria-label="Reset stock"
                        onClick={() => handleUpdateStock(product.id, originalStock)}
                        ml="2"
                        size="sm"
                      />
                    </Flex>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>

      {filteredProducts.length === 0 && (
        <Flex justify="center" align="center" direction="column" p="10" bg={bgColor} borderRadius="md" mt="4">
          <Text fontSize="lg" color={subTextColor}>
            No se encontraron productos
          </Text>
        </Flex>
      )}
    </Box>
  )
}
