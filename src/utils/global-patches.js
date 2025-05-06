// This file contains global patches for compatibility
import { createRoot } from "react-dom/client"

// Patch react-dom.render
if (typeof window !== "undefined") {
  const originalReactDOM = require("react-dom")

  if (originalReactDOM && !originalReactDOM.createRoot) {
    originalReactDOM.createRoot = createRoot

    // Add a custom render method
    originalReactDOM.render = (element, container) => {
      const root = createRoot(container)
      root.render(element)
      return root
    }
  }
}

// Patch @emotion/core to @emotion/react
if (typeof require !== "undefined") {
  const Module = require("module")
  const originalRequire = Module.prototype.require

  Module.prototype.require = function (id) {
    if (id === "@emotion/core") {
      return originalRequire.call(this, "@emotion/react")
    }
    return originalRequire.call(this, id)
  }
}
