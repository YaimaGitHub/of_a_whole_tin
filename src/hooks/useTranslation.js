import { useRecoilValue } from "recoil"
import { selectedLanguage } from "../recoil/state"
import { translations } from "../translations"

const useTranslation = () => {
  const language = useRecoilValue(selectedLanguage)

  // Function to get translation
  const t = (key) => {
    const keys = key.split(".")
    let result = translations[language]

    for (const k of keys) {
      if (!result || !result[k]) return key // Return the key if translation not found
      result = result[k]
    }

    return result
  }

  // Function to translate with variables
  const tVar = (key, variables) => {
    let text = t(key)

    if (variables) {
      Object.entries(variables).forEach(([varKey, value]) => {
        text = text.replace(`{${varKey}}`, value)
      })
    }

    return text
  }

  return { t, tVar, language }
}

export default useTranslation
