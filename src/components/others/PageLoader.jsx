"use client"

import { useEffect, useState, useRef } from "react"
import { Box, Flex, Text, useColorMode } from "@chakra-ui/core"
import Logo from "./Logo"

export default function PageLoader() {
  const { colorMode } = useColorMode()
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Iniciando")
  const [dots, setDots] = useState("")
  const [isVisible, setIsVisible] = useState(true)
  const canvasRef = useRef(null)

  // Theme colors
  const isDark = colorMode === "dark"
  const bgColor = isDark ? "rgba(13, 16, 23, 0.97)" : "rgba(255, 255, 255, 0.97)"
  const textColor = isDark ? "white" : "gray.800"
  const accentColor = "teal.500"
  const accentColorHex = isDark ? "#38B2AC" : "#319795"
  const secondaryColor = isDark ? "gray.700" : "gray.200"

  // Particle animation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const particles = []

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 5 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = isDark ? `rgba(255, 255, 255, ${Math.random() * 0.3})` : `rgba(0, 0, 0, ${Math.random() * 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const createParticles = () => {
      const particleCount = Math.min(window.innerWidth / 10, 100)
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    createParticles()

    // Animation loop
    const animate = () => {
      if (!isVisible) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Connect particles with lines
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect nearby particles with lines
    const connectParticles = () => {
      const maxDistance = 100

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${opacity * 0.15})` : `rgba(0, 0, 0, ${opacity * 0.1})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [isVisible, colorMode])

  // Update progress bar
  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        // Non-linear progress for more realistic loading
        const increment = Math.random() * 10 + (progress > 85 ? 1 : progress > 70 ? 2 : progress > 50 ? 3 : 5)
        setProgress((prev) => Math.min(prev + increment, 100))
      } else {
        // Hide loader when complete
        setTimeout(() => setIsVisible(false), 500)
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [progress])

  // Animate loading dots
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 400)

    return () => clearInterval(interval)
  }, [])

  // Update loading text based on progress
  useEffect(() => {
    if (progress < 40) {
      setLoadingText("Yero Shop")
    } else if (progress < 70) {
      setLoadingText("de todo un tin")
    } else if (progress < 95) {
      setLoadingText("Preparando interfaz")
    } else {
      setLoadingText("¡Bienvenido!")
    }
  }, [progress])

  if (!isVisible) return null

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      zIndex="9999"
      bg={bgColor}
      backdropFilter="blur(10px)"
      transition="opacity 0.8s ease-in-out"
      opacity={progress >= 100 ? 0 : 1}
      pointerEvents={progress >= 100 ? "none" : "auto"}
    >
      {/* Particle background */}
      <Box as="canvas" ref={canvasRef} position="absolute" top="0" left="0" width="100%" height="100%" zIndex="1" />

      {/* Glowing circle behind logo */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width={["200px", "240px", "280px"]}
        height={["200px", "240px", "280px"]}
        borderRadius="50%"
        background={`radial-gradient(circle, ${accentColorHex}33 0%, transparent 70%)`}
        animation="pulse 3s infinite ease-in-out"
        zIndex="2"
        sx={{
          "@keyframes pulse": {
            "0%, 100%": { opacity: 0.5, transform: "translate(-50%, -50%) scale(1)" },
            "50%": { opacity: 0.8, transform: "translate(-50%, -50%) scale(1.1)" },
          },
        }}
      />

      {/* Main content container */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        height="100%"
        width="100%"
        position="relative"
        zIndex="3"
      >
        {/* Logo container with animations */}
        <Box
          position="relative"
          mb="8"
          animation="float 4s infinite ease-in-out"
          sx={{
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-15px)" },
            },
          }}
        >
          {/* Rotating circles around logo */}
          {[1, 2, 3].map((i) => (
            <Box
              key={i}
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width={`${120 + i * 40}px`}
              height={`${120 + i * 40}px`}
              borderRadius="50%"
              border={`2px solid ${accentColorHex}`}
              opacity={0.2}
              animation={`spin ${8 + i * 4}s infinite linear ${i % 2 === 0 ? "reverse" : ""}`}
              sx={{
                "@keyframes spin": {
                  "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
                  "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
                },
              }}
            />
          ))}

          {/* Pulsing dots around logo */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            const radius = 90
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <Box
                key={`dot-${i}`}
                position="absolute"
                top="50%"
                left="50%"
                transform={`translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`}
                width={["6px", "8px", "10px"]}
                height={["6px", "8px", "10px"]}
                borderRadius="50%"
                bg={accentColor}
                animation={`pulseDot 2s infinite ease-in-out ${i * 0.25}s`}
                sx={{
                  "@keyframes pulseDot": {
                    "0%, 100%": {
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1)`,
                      opacity: 0.7,
                    },
                    "50%": {
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.5)`,
                      opacity: 0.3,
                    },
                  },
                }}
              />
            )
          })}

          {/* Logo with shine effect */}
          <Box
            position="relative"
            overflow="hidden"
            borderRadius="md"
            animation="logoScale 3s infinite ease-in-out"
            sx={{
              "@keyframes logoScale": {
                "0%, 100%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.05)" },
              },
            }}
          >
            <Logo size={["100px", "120px", "140px"]} />

            {/* Shine effect overlay */}
            <Box
              position="absolute"
              top="0"
              left="-100%"
              width="50%"
              height="100%"
              background="linear-gradient(to right, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)"
              transform="skewX(-25deg)"
              animation="shine 3s infinite"
              sx={{
                "@keyframes shine": {
                  "0%": { left: "-100%" },
                  "20%, 100%": { left: "200%" },
                },
              }}
            />
          </Box>
        </Box>

        {/* Loading text with animated dots */}
        <Text
          fontSize={["xl", "2xl", "3xl"]}
          fontWeight="bold"
          color={textColor}
          mb="6"
          textAlign="center"
          animation="fadeInUp 0.5s ease-out"
          sx={{
            "@keyframes fadeInUp": {
              "0%": { opacity: 0, transform: "translateY(10px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          {loadingText}
          <Text as="span" display="inline-block" width="30px">
            {dots}
          </Text>
        </Text>

        {/* Progress bar container */}
        <Box
          width={["280px", "350px", "450px"]}
          mb="4"
          animation="fadeIn 0.5s ease-out"
          sx={{
            "@keyframes fadeIn": {
              "0%": { opacity: 0 },
              "100%": { opacity: 1 },
            },
          }}
        >
          {/* Progress track */}
          <Box
            height="8px"
            width="100%"
            bg={secondaryColor}
            borderRadius="full"
            overflow="hidden"
            position="relative"
            boxShadow="inset 0 2px 4px rgba(0,0,0,0.1)"
          >
            {/* Progress fill */}
            <Box
              height="100%"
              width={`${progress}%`}
              bg={accentColor}
              borderRadius="full"
              transition="width 0.3s ease-out"
              position="relative"
            >
              {/* Shimmer effect */}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                background="linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
                animation="shimmer 1.5s infinite"
                sx={{
                  "@keyframes shimmer": {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(100%)" },
                  },
                }}
              />
            </Box>
          </Box>

          {/* Progress percentage */}
          <Flex justify="space-between" mt="2">
            <Text fontSize="sm" color={textColor} opacity="0.7">
              Cargando...
            </Text>
            <Text fontSize="sm" fontWeight="bold" color={textColor}>
              {Math.round(progress)}%
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
