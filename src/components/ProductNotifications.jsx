"use client"

import { useRecoilValue, useSetRecoilState } from "recoil"
import { productNotificationsState, clearProductNotification, markProductNotificationAsRead } from "../recoil/state"
import { Box, Flex, Text, CloseButton, Icon, Badge, Image, Heading, Divider, Button } from "@chakra-ui/core"
import { BiPackage, BiCategory, BiBell } from "react-icons/bi"
import { useEffect, useState } from "react"
import { categoryDisplayNames } from "../data/categories"

export default function ProductNotifications() {
  const notifications = useRecoilValue(productNotificationsState)
  const clearNotif = useSetRecoilState(clearProductNotification)
  const markAsRead = useSetRecoilState(markProductNotificationAsRead)
  const [isOpen, setIsOpen] = useState(false)

  // Auto-dismiss notifications after 15 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timers = notifications
        .map((notification) => {
          if (!notification.read) {
            return setTimeout(() => {
              markAsRead(notification.id)
            }, 15000)
          }
          return null
        })
        .filter(Boolean)

      return () => {
        timers.forEach((timer) => clearTimeout(timer))
      }
    }
  }, [notifications, markAsRead])

  const unreadCount = notifications.filter((n) => !n.read).length

  const toggleNotifications = () => {
    setIsOpen(!isOpen)
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* Notification Bell Icon */}
      <Box position="fixed" top="80px" right="20px" zIndex="1600" onClick={toggleNotifications} cursor="pointer">
        <Flex
          bg="white"
          boxShadow="md"
          borderRadius="full"
          p="3"
          position="relative"
          _hover={{ transform: "scale(1.05)" }}
          transition="transform 0.2s"
        >
          <Icon as={BiBell} size="24px" color="blue.500" />
          {unreadCount > 0 && (
            <Badge
              position="absolute"
              top="-5px"
              right="-5px"
              borderRadius="full"
              bg="red.500"
              color="white"
              fontSize="xs"
              minW="18px"
              h="18px"
              textAlign="center"
              p="1px"
            >
              {unreadCount}
            </Badge>
          )}
        </Flex>
      </Box>

      {/* Notification Panel */}
      {isOpen && (
        <Box
          position="fixed"
          top="130px"
          right="20px"
          zIndex="1500"
          width="350px"
          maxHeight="80vh"
          overflowY="auto"
          bg="white"
          borderRadius="lg"
          boxShadow="xl"
          className="product-notifications-panel"
          p="4"
        >
          <Flex justify="space-between" align="center" mb="3">
            <Heading size="md">Notificaciones de Productos</Heading>
            <CloseButton onClick={() => setIsOpen(false)} />
          </Flex>

          <Divider mb="3" />

          {notifications.length === 0 ? (
            <Flex direction="column" align="center" justify="center" p="6" color="gray.500">
              <Icon as={BiPackage} size="40px" mb="2" />
              <Text>No hay notificaciones de nuevos productos</Text>
            </Flex>
          ) : (
            notifications.map((notification) => (
              <Box
                key={notification.id}
                mb="3"
                p="3"
                borderRadius="md"
                borderWidth="1px"
                borderColor={notification.read ? "gray.200" : "blue.200"}
                bg={notification.read ? "white" : "blue.50"}
                position="relative"
                className="notification-item"
                transition="all 0.3s"
                _hover={{ boxShadow: "sm" }}
              >
                <Flex>
                  <Box
                    mr="3"
                    borderRadius="md"
                    overflow="hidden"
                    width="60px"
                    height="60px"
                    borderWidth="1px"
                    borderColor="gray.200"
                  >
                    <Image
                      src={`/images/${notification.product.img}`}
                      alt={notification.product.title}
                      fallbackSrc="/images/productosinimagen.jpg"
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  </Box>

                  <Box flex="1">
                    <Flex justify="space-between" align="start">
                      <Text fontWeight="bold" fontSize="sm" noOfLines={1}>
                        {notification.product.title}
                      </Text>
                      <Text fontSize="xs" color="gray.500">
                        {formatTimestamp(notification.timestamp)}
                      </Text>
                    </Flex>

                    <Flex mt="1" wrap="wrap" gap="1">
                      <Badge colorScheme="blue">
                        <Flex align="center">
                          <Icon as={BiCategory} size="12px" mr="1" />
                          {categoryDisplayNames[notification.product.category] || notification.product.category}
                        </Flex>
                      </Badge>

                      {notification.product.subcategory && (
                        <Badge colorScheme="purple">{notification.product.subcategory}</Badge>
                      )}

                      <Badge colorScheme="green">{notification.product.price} CUP</Badge>
                    </Flex>
                  </Box>

                  <CloseButton
                    size="sm"
                    position="absolute"
                    top="5px"
                    right="5px"
                    onClick={(e) => {
                      e.stopPropagation()
                      clearNotif(notification.id)
                    }}
                  />
                </Flex>
              </Box>
            ))
          )}

          {notifications.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              width="100%"
              mt="2"
              onClick={() => {
                notifications.forEach((n) => clearNotif(n.id))
              }}
            >
              Limpiar todas
            </Button>
          )}
        </Box>
      )}

      <style jsx global>{`
        .product-notifications-panel {
          animation: slideInRight 0.3s ease-out;
        }
        
        .notification-item {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
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
      `}</style>
    </>
  )
}
