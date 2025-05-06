// This file patches problematic imports
// It should be imported at the very beginning of the application

// Patch for react-dom render
if (typeof window !== "undefined") {
  const ReactDOM = require("react-dom")
  const ReactDOMClient = require("react-dom/client")

  // Add render method if it doesn't exist (React 18)
  if (!ReactDOM.render && ReactDOMClient.createRoot) {
    ReactDOM.render = (element, container) => {
      // Clean up any existing root
      if (container._reactRootContainer) {
        const root = container._reactRootContainer
        root.unmount()
        delete container._reactRootContainer
      }

      // Create new root
      const root = ReactDOMClient.createRoot(container)
      container._reactRootContainer = root
      root.render(element)
      return null // React 17's render doesn't return anything
    }
  }
}

// Patch for @emotion/core
if (typeof require !== "undefined") {
  const originalRequire = require

  // Override require to redirect @emotion/core to @emotion/react
  global.require = function patchedRequire(path) {
    if (path === "@emotion/core") {
      return originalRequire("@emotion/react")
    }
    return originalRequire(path)
  }

  // Make sure our patched require has all the properties of the original
  Object.setPrototypeOf(global.require, Object.getPrototypeOf(originalRequire))
  for (const key in originalRequire) {
    if (Object.prototype.hasOwnProperty.call(originalRequire, key)) {
      global.require[key] = originalRequire[key]
    }
  }
}

console.log("Patches applied successfully")
