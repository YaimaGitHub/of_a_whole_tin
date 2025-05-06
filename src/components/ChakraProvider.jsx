import { ThemeProvider, CSSReset } from "@chakra-ui/core"
import theme from "../theme"

export function ChakraProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      {children}
    </ThemeProvider>
  )
}
