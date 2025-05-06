// This file provides a shim for @emotion/core
import * as EmotionReact from "@emotion/react"

// Export everything from @emotion/react
export default EmotionReact
export const { jsx, css, Global, keyframes, ClassNames } = EmotionReact
