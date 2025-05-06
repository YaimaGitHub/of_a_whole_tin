// This file provides a shim for react-dom
import * as ReactDOM from "react-dom"
import { createRoot } from "react-dom/client"

// Add render method if it doesn't exist (React 18)
if (!ReactDOM.render) {
  ReactDOM.render = (element, container) => {
    // Clean up any existing root
    if (container._reactRootContainer) {
      const root = container._reactRootContainer
      root.unmount()
      delete container._reactRootContainer
    }

    // Create new root
    const root = createRoot(container)
    container._reactRootContainer = root
    root.render(element)
    return null // React 17's render doesn't return anything
  }
}

export default ReactDOM
export const { render, hydrate, createPortal, findDOMNode, unmountComponentAtNode } = ReactDOM
