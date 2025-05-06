"use client"

import { useRecoilValue, useSetRecoilState } from "recoil"
import { stockNotifications, clearNotification } from "../recoil/state"
import { Box, Flex, Text, CloseButton, Icon } from "@chakra-ui/core"
import { BiErrorCircle, BiInfoCircle } from "react-icons/bi"
import { useEffect } from "react"

export default function StockNotifications() {
  const notifications = useRecoilValue(stockNotifications)
  const clearNotif = useSetRecoilState(clearNotification)

  // Auto-dismiss notifications after 5 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timers = notifications.map((notification) => {
        return setTimeout(() => {
          clearNotif(notification.id)
        }, 5000)
      })

      return () => {
        timers.forEach((timer) => clearTimeout(timer))
      }
    }
  }, [notifications, clearNotif])

  if (notifications.length === 0) return null

  return (
    <Box position="fixed" top="120px" right="20px" zIndex="1500" maxWidth="300px" className="stock-notifications">
      {notifications.map((notification) => (
        <Flex
          key={notification.id}
          bg={notification.type === "error" ? "red.50" : "orange.50"}
          color={notification.type === "error" ? "red.700" : "orange.700"}
          p="3"
          borderRadius="md"
          boxShadow="md"
          mb="3"
          align="flex-start"
          className="notification-item"
        >
          <Icon as={notification.type === "error" ? BiErrorCircle : BiInfoCircle} size="20px" mr="2" mt="1px" />
          <Text fontSize="sm" flex="1">
            {notification.message}
          </Text>
          <CloseButton size="sm" onClick={() => clearNotif(notification.id)} />
        </Flex>
      ))}

      <style jsx global>{`
        .stock-notifications {
          animation: slideIn 0.3s ease-out;
        }
        
        .notification-item {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
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
    </Box>
  )
}
