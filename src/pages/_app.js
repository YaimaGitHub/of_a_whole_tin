import { ThemeProvider, CSSReset } from "@chakra-ui/core"
import Head from "next/head"
import { RecoilRoot } from "recoil"
import theme from "../theme"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </>
  )
}

export default MyApp
