// This file provides a compatibility layer for react-dom render
import { createRoot } from "react-dom/client"

// Compatibility function to replace the deprecated render method
export function render(element, container) {
  // Check if the container already has a root
  if (container._reactRootContainer) {
    // If it does, use the existing root
    container._reactRootContainer.render(element)
    return
  }

  // Otherwise, create a new root
  const root = createRoot(container)
  // Store the root on the container for future renders
  container._reactRootContainer = root
  root.render(element)
  return root
}

// Export createRoot for direct usage
export { createRoot }
