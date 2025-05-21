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
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useDisclosure,
  useToast,
  Badge,
  IconButton,
  useColorMode,
  InputGroup,
  InputLeftElement,
  Switch,
  FormHelperText,
} from "@chakra-ui/core"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { BiEdit, BiTrash, BiPlus, BiSearch } from "react-icons/bi"

export default function ProductManagement() {
  const [products, setProducts] = useState([])
  const [currentProduct, setCurrentProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
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

  const handleAddProduct = () => {
    setCurrentProduct({
      id: nanoid(8),
      title: "",
      title1: "",
      price: 0,
      offerPrice: null,
      stock: 0,
      img: "",
      additionalImages: [], // Add this new field
      category: "Electrodomésticos",
      allowBankTransfer: true, // Default to allowing bank transfer
    })
    onOpen()
  }

  const handleEditProduct = (product) => {
    setCurrentProduct({
      ...product,
      allowBankTransfer: product.allowBankTransfer !== false, // Default to true if not specified
    })
    onOpen()
  }

  const handleDeleteProduct = (id) => {
    // In a real app, this would be an API call
    setProducts(products.filter((p) => p.id !== id))
    toast({
      title: "Producto eliminado",
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }

  const handleSaveProduct = () => {
    // Validate form
    if (!currentProduct.title || !currentProduct.price || !currentProduct.category) {
      toast({
        title: "Error",
        description: "Por favor complete todos los campos requeridos",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    // In a real app, this would be an API call
    if (products.some((p) => p.id === currentProduct.id)) {
      // Update existing product
      setProducts(products.map((p) => (p.id === currentProduct.id ? currentProduct : p)))
      toast({
        title: "Producto actualizado",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    } else {
      // Add new product
      setProducts([...products, currentProduct])
      toast({
        title: "Producto añadido",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }

    onClose()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    })
  }

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target
    setCurrentProduct({
      ...currentProduct,
      [name]: checked,
    })
  }

  const handleNumberChange = (name, value) => {
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    })
  }

  // Filter products based on search term and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory ? product.category === filterCategory : true
    return matchesSearch && matchesCategory
  })

  return (
    <Box p="6" maxW="1200px" mx="auto">
      <Heading as="h1" size="xl" mb="6" color={textColor}>
        Gestión de Productos
      </Heading>

      <Flex mb="6" direction={{ base: "column", md: "row" }} gap="4">
        <Flex flex="1" align="center">
          <InputGroup>
            <InputLeftElement>
              <Box as={BiSearch} color={subTextColor} />
            </InputLeftElement>
            <Input
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              bg={bgColor}
              color={textColor}
              borderColor={borderColor}
            />
          </InputGroup>

          <Select
            ml="2"
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
        </Flex>

        <Button
          leftIcon={BiPlus}
          colorScheme="blue"
          onClick={handleAddProduct}
          bg="bluex.500"
          _hover={{ bg: "bluex.600" }}
        >
          Añadir Producto
        </Button>
      </Flex>

      <Box overflowX="auto" borderWidth="1px" borderColor={borderColor} borderRadius="lg" bg={bgColor} boxShadow="sm">
        <Table variant="simple">
          <Thead bg={colorMode === "light" ? "gray.50" : "gray.700"}>
            <Tr>
              <Th>ID</Th>
              <Th>Imagen</Th>
              <Th>Imágenes adicionales</Th>
              <Th>Nombre</Th>
              <Th>Categoría</Th>
              <Th>Precio (CUP)</Th>
              <Th>Oferta (CUP)</Th>
              <Th>Stock</Th>
              <Th>Transferencia</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredProducts.map((product) => (
              <Tr key={product.id}>
                <Td fontSize="sm">{product.id}</Td>
                <Td>
                  <Box
                    w="40px"
                    h="40px"
                    borderRadius="md"
                    overflow="hidden"
                    borderWidth="1px"
                    borderColor={borderColor}
                  >
                    <img
                      src={`/images/${product.img}`}
                      alt={product.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.src = "/images/productosinimagen.jpg"
                      }}
                    />
                  </Box>
                </Td>
                <Td>
                  <Badge colorScheme="purple">{product.additionalImages?.length || 0} imágenes</Badge>
                </Td>
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
                <Td>{product.price} CUP</Td>
                <Td>
                  {product.offerPrice ? (
                    <Text color="green.500">{product.offerPrice} CUP</Text>
                  ) : (
                    <Text color={subTextColor}>-</Text>
                  )}
                </Td>
                <Td>{product.stock}</Td>
                <Td>
                  <Badge colorScheme={product.allowBankTransfer !== false ? "green" : "red"}>
                    {product.allowBankTransfer !== false ? "Permitido" : "No permitido"}
                  </Badge>
                </Td>
                <Td>
                  <Flex>
                    <IconButton
                      icon={BiEdit}
                      variant="ghost"
                      colorScheme="blue"
                      aria-label="Edit product"
                      onClick={() => handleEditProduct(product)}
                      mr="2"
                    />
                    <IconButton
                      icon={BiTrash}
                      variant="ghost"
                      colorScheme="red"
                      aria-label="Delete product"
                      onClick={() => handleDeleteProduct(product.id)}
                    />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {filteredProducts.length === 0 && (
        <Flex justify="center" align="center" direction="column" p="10" bg={bgColor} borderRadius="md" mt="4">
          <Text fontSize="lg" color={subTextColor}>
            No se encontraron productos
          </Text>
          <Button mt="4" colorScheme="blue" onClick={handleAddProduct} bg="bluex.500">
            Añadir un producto
          </Button>
        </Flex>
      )}

      {/* Add/Edit Product Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={bgColor}>
          <ModalHeader color={textColor}>
            {currentProduct && currentProduct.id && products.some((p) => p.id === currentProduct.id)
              ? "Editar Producto"
              : "Añadir Producto"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column" gap="4">
              <FormControl isRequired>
                <FormLabel color={textColor}>Nombre del Producto</FormLabel>
                <Input
                  name="title"
                  value={currentProduct?.title || ""}
                  onChange={handleInputChange}
                  bg={bgColor}
                  color={textColor}
                  borderColor={borderColor}
                />
              </FormControl>

              <FormControl>
                <FormLabel color={textColor}>Descripción Adicional</FormLabel>
                <Input
                  name="title1"
                  value={currentProduct?.title1 || ""}
                  onChange={handleInputChange}
                  bg={bgColor}
                  color={textColor}
                  borderColor={borderColor}
                />
              </FormControl>

              <Flex gap="4">
                <FormControl isRequired>
                  <FormLabel color={textColor}>Precio (CUP)</FormLabel>
                  <NumberInput
                    min={0}
                    value={currentProduct?.price || 0}
                    onChange={(value) => handleNumberChange("price", Number.parseFloat(value))}
                  >
                    <NumberInputField bg={bgColor} color={textColor} borderColor={borderColor} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel color={textColor}>Precio de Oferta (CUP)</FormLabel>
                  <NumberInput
                    min={0}
                    value={currentProduct?.offerPrice || 0}
                    onChange={(value) => {
                      const numValue = Number.parseFloat(value)
                      handleNumberChange("offerPrice", numValue === 0 ? null : numValue)
                    }}
                  >
                    <NumberInputField bg={bgColor} color={textColor} borderColor={borderColor} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Flex>

              <Flex gap="4">
                <FormControl isRequired>
                  <FormLabel color={textColor}>Categoría</FormLabel>
                  <Select
                    name="category"
                    value={currentProduct?.category || ""}
                    onChange={handleInputChange}
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
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color={textColor}>Stock</FormLabel>
                  <NumberInput
                    min={0}
                    value={currentProduct?.stock || 0}
                    onChange={(value) => handleNumberChange("stock", Number.parseInt(value))}
                  >
                    <NumberInputField bg={bgColor} color={textColor} borderColor={borderColor} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </FormControl>
              </Flex>

              {/* Payment Method Control */}
              <FormControl>
                <FormLabel color={textColor}>Permitir pago por transferencia bancaria</FormLabel>
                <Switch
                  name="allowBankTransfer"
                  isChecked={currentProduct?.allowBankTransfer !== false}
                  onChange={handleSwitchChange}
                  colorScheme="green"
                  size="lg"
                />
                <FormHelperText>
                  {currentProduct?.allowBankTransfer !== false
                    ? "Los clientes podrán pagar este producto mediante transferencia bancaria"
                    : "Este producto solo podrá pagarse en efectivo"}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel color={textColor}>Ruta de Imagen</FormLabel>
                <Input
                  name="img"
                  value={currentProduct?.img || ""}
                  onChange={handleInputChange}
                  placeholder="ej: categoria/nombre-producto.jpg"
                  bg={bgColor}
                  color={textColor}
                  borderColor={borderColor}
                />
              </FormControl>
              <FormControl mt="4">
                <FormLabel color={textColor}>Imágenes adicionales</FormLabel>
                <Box borderWidth="1px" borderColor={borderColor} borderRadius="md" p="3">
                  <Flex direction="column" gap="2">
                    {currentProduct?.additionalImages?.map((imgPath, index) => (
                      <Flex key={index} align="center" justify="space-between">
                        <Input
                          value={imgPath}
                          onChange={(e) => {
                            const newImages = [...currentProduct.additionalImages]
                            newImages[index] = e.target.value
                            setCurrentProduct({
                              ...currentProduct,
                              additionalImages: newImages,
                            })
                          }}
                          placeholder="ej: categoria/imagen-adicional.jpg"
                          bg={bgColor}
                          color={textColor}
                          borderColor={borderColor}
                          mr="2"
                        />
                        <IconButton
                          icon={BiTrash}
                          variant="ghost"
                          colorScheme="red"
                          aria-label="Remove image"
                          onClick={() => {
                            const newImages = [...currentProduct.additionalImages]
                            newImages.splice(index, 1)
                            setCurrentProduct({
                              ...currentProduct,
                              additionalImages: newImages,
                            })
                          }}
                        />
                      </Flex>
                    ))}
                    <Button
                      leftIcon={BiPlus}
                      mt="2"
                      size="sm"
                      onClick={() => {
                        setCurrentProduct({
                          ...currentProduct,
                          additionalImages: [...(currentProduct.additionalImages || []), ""],
                        })
                      }}
                    >
                      Añadir imagen
                    </Button>
                  </Flex>
                </Box>
                <Text fontSize="xs" color={subTextColor} mt="1">
                  Añada imágenes adicionales para mostrar en la galería del producto
                </Text>
              </FormControl>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={handleSaveProduct} bg="bluex.500">
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
