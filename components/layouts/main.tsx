import { Box, Container } from '@chakra-ui/react'
import Head from 'next/head'
import { ChatSelection } from './chatSelection'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Chat GPT Mongolia</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.md" mx="auto" pt={2}>
        {children}
      </Container>
    </Box>
  )
}

export default Main
