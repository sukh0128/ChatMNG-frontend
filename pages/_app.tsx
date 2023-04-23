import {
  Box,
  Center,
  ChakraProvider,
  Flex,
  HStack,
  VStack
} from '@chakra-ui/react'
import { Logo } from '../components/layouts/logo'
import Layout from '../components/layouts/main'
import theme from '../lib/theme'
import Fonts from '../components/layouts/fonts'
import { ChatSelection } from '../components/layouts/chatSelection'
import { ChatProvider } from '../components/layouts/chatContext'

const Website = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Flex w="full">
        <ChatProvider id={router.query.id as string}>
          <Box w="15%">
            <ChatSelection />
          </Box>
          <Box w="85%">
            <Layout router={router}>
              <Center>
                <VStack>
                  <HStack spacing={6} mb={4} mt={4}>
                    <Logo
                      fontWeight={'semibold'}
                      w={{ base: '8' }}
                      h={8}
                      cursor="pointer"
                    />
                    <Box fontSize={'2xl'} letterSpacing={'tighter'}>
                      Chat-MNG
                    </Box>
                  </HStack>
                  <Component {...pageProps} key={router.route} />
                </VStack>
              </Center>
            </Layout>
          </Box>
        </ChatProvider>
      </Flex>
    </ChakraProvider>
  )
}

export default Website
