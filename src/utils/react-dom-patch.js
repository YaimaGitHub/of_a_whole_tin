// This file patches react-dom to use createRoot instead of render
import { createRoot } from "react-dom/client"

// Custom render function for React 18 compatibility
export function render(element, container) {
  const root = createRoot(container)
  root.render(element)
  return root
}

// Export other methods from react-dom
export * from "react-dom"
