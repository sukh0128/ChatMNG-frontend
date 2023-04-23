import { ColorModeScript } from '@chakra-ui/react'
import NextDocuments, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../lib/theme'

export default class Document extends NextDocuments {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript
            initialColorMode={theme.config.initialColorMode}
          ></ColorModeScript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
