// This file provides a shim for @emotion/react
// It redirects imports from @emotion/react to @emotion/core

import * as emotionCore from "@emotion/core"

// Create a compatibility layer
const emotionReact = {
  ...emotionCore,
  jsx: emotionCore.jsx,
  css: emotionCore.css,
  Global: emotionCore.Global,
  keyframes: emotionCore.keyframes,
  ClassNames: emotionCore.ClassNames,
}

export const jsx = emotionCore.jsx
export const css = emotionCore.css
export const Global = emotionCore.Global
export const keyframes = emotionCore.keyframes
export const ClassNames = emotionCore.ClassNames

export default emotionReact
