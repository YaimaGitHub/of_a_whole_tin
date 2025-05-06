// This file patches any imports of render from react-dom
import { render } from "./renderUtils"

// Override the default export of react-dom
const reactDom = {
  render,
  // Add other methods as needed
  createPortal: (children, container) => {
    // Import dynamically to avoid circular dependencies
    const reactDom = require("react-dom")
    return reactDom.createPortal(children, container)
  },
  // Add other methods that might be used
}

export default reactDom
