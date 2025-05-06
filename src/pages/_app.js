import { ThemeProvider, CSSReset } from "@chakra-ui/core"
import Head from "next/head"
import { RecoilRoot } from "recoil"
import theme from "../theme"
import PageLoader from "../components/others/PageLoader"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <CSSReset />
          <PageLoader />
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </>
  )
}

export default MyApp
